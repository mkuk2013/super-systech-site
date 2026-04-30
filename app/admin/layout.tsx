"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Toolbar, Typography, Button, Avatar, Divider, useMediaQuery, useTheme
} from "@mui/material";
import {
  Menu as MenuIcon, Dashboard, Home, Info, Book, Group, Photo, Star,
  School, Settings, Logout, ViewQuilt, ViewModule
} from "@mui/icons-material";
import ThemeProviderRegistry from "./ThemeProviderRegistry";

const drawerWidth = 260;

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: <Dashboard /> },
  { href: "/admin/layout-settings", label: "Layout & Navbar", icon: <ViewQuilt /> },
  { href: "/admin/homepage", label: "Homepage Sections", icon: <ViewModule /> },
  { href: "/admin/hero", label: "Hero Section", icon: <Home /> },
  { href: "/admin/pages", label: "Page Headers", icon: <ViewQuilt /> },
  { href: "/admin/about", label: "About / Principal", icon: <Info /> },
  { href: "/admin/courses", label: "Courses", icon: <Book /> },
  { href: "/admin/team", label: "Faculty / Team", icon: <Group /> },
  { href: "/admin/gallery", label: "Gallery", icon: <Photo /> },
  { href: "/admin/testimonials", label: "Testimonials", icon: <Star /> },
  { href: "/admin/admissions", label: "Admissions", icon: <School /> },
  { href: "/admin/settings", label: "Site Settings", icon: <Settings /> },
];

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar sx={{ px: 3, pt: 2, pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40, borderRadius: '8px' }}>
            <School />
          </Avatar>
          <Box>
            <Typography variant="h6" color="text.primary" sx={{ fontSize: "1.1rem" }}>STC Admin</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>CONTROL PANEL</Typography>
          </Box>
        </Box>
      </Toolbar>
      
      <Box sx={{ overflow: 'auto', px: 2, mt: 2, flex: 1 }}>
        <List>
          {sidebarLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <ListItem key={link.href} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={Link}
                  href={link.href}
                  onClick={() => isMobile && setMobileOpen(false)}
                  sx={{
                    borderRadius: '8px',
                    bgcolor: active ? 'primary.main' : 'transparent',
                    color: active ? '#fff' : 'text.secondary',
                    '&:hover': {
                      bgcolor: active ? 'primary.dark' : 'primary.light',
                      color: active ? '#fff' : 'primary.main',
                      '& .MuiListItemIcon-root': { color: active ? '#fff' : 'primary.main' }
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: active ? '#fff' : 'inherit' }}>
                    {link.icon}
                  </ListItemIcon>
                  <ListItemText primary={link.label} slotProps={{ primary: { sx: { fontSize: '0.875rem', fontWeight: 600 } } }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <Button 
          fullWidth 
          variant="outlined" 
          color="error" 
          startIcon={<Logout />} 
          onClick={handleLogout}
          sx={{ mb: 1 }}
        >
          Logout
        </Button>
        <Button 
          component={Link} 
          href="/" 
          fullWidth 
          variant="text" 
          sx={{ color: 'text.secondary' }}
        >
          View Website
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: 'none' }, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" color="text.primary" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            Super Systech Computers — Admin Panel
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'block', sm: 'none' } }} />
          <Avatar sx={{ bgcolor: 'secondary.light', color: 'secondary.main', width: 36, height: 36 }}>A</Avatar>
        </Toolbar>
      </AppBar>
      
      <Box component="nav" sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none', boxShadow: '2px 0 20px rgba(0,0,0,0.05)' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid #EAEFF4' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { lg: `calc(100% - ${drawerWidth}px)` }, mt: '64px' }}>
        {children}
      </Box>
    </Box>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProviderRegistry>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </ThemeProviderRegistry>
  );
}
