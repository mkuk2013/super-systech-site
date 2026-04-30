"use client";

import { useState, useEffect } from "react";
import {
  Box, Typography, Card, CardContent, TextField, Button, IconButton,
  Divider, CircularProgress, Alert, Snackbar, Switch, FormControlLabel, Stack
} from "@mui/material";
import { Save, Add, Delete } from "@mui/icons-material";

export default function LayoutSettingsPage() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then(setData)
      .catch((err) => {
        console.error("Failed to fetch content:", err);
        setToast({ open: true, message: "Failed to load content", severity: "error" });
      });
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "layout", data: data.layout }),
      });
      if (res.ok) {
        setToast({ open: true, message: "Layout settings saved successfully!", severity: "success" });
      } else {
        throw new Error("Failed to save");
      }
    } catch (error: any) {
      console.error("Save Error:", error);
      const msg = error.details || error.message || "Unknown error";
      setToast({ open: true, message: `Error saving structure: ${msg}`, severity: "error" });
    }
    setSaving(false);
  };

  const updateNavbar = (field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      layout: {
        ...prev.layout,
        navbar: { ...prev.layout.navbar, [field]: value }
      }
    }));
  };

  const updateFooter = (field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      layout: {
        ...prev.layout,
        footer: { ...prev.layout.footer, [field]: value }
      }
    }));
  };

  const addNavLink = () => {
    const links = [...(data.layout.navbar.links || []), { label: "New Link", href: "/" }];
    updateNavbar("links", links);
  };

  const removeNavLink = (index: number) => {
    const links = data.layout.navbar.links.filter((_: any, i: number) => i !== index);
    updateNavbar("links", links);
  };

  const updateNavLink = (index: number, field: string, value: string) => {
    const links = [...data.layout.navbar.links];
    links[index] = { ...links[index], [field]: value };
    updateNavbar("links", links);
  };

  if (!data) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" color="text.primary" gutterBottom>Layout & Navbar</Typography>
          <Typography variant="body2" color="text.secondary">Customize your website's header, footer, and navigation menu.</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Save />}
          onClick={save}
          disabled={saving}
          sx={{ px: 3, py: 1.5 }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Navbar Settings */}
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }} color="primary.main">Navbar Configuration</Typography>
            <Stack spacing={3}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                <TextField fullWidth label="Logo Main Text" variant="outlined" value={data.layout.navbar.logoText || ""} onChange={(e) => updateNavbar("logoText", e.target.value)} />
                <TextField fullWidth label="Logo Sub Text" variant="outlined" value={data.layout.navbar.logoSubText || ""} onChange={(e) => updateNavbar("logoSubText", e.target.value)} />
                <TextField fullWidth label="CTA Button Label" variant="outlined" value={data.layout.navbar.ctaLabel || ""} onChange={(e) => updateNavbar("ctaLabel", e.target.value)} />
                <TextField fullWidth label="CTA Button Link" variant="outlined" value={data.layout.navbar.ctaHref || ""} onChange={(e) => updateNavbar("ctaHref", e.target.value)} />
              </Box>
              <FormControlLabel
                control={<Switch checked={data.layout.navbar.showTopBar} onChange={(e) => updateNavbar("showTopBar", e.target.checked)} />}
                label="Show Top Info Bar (Phone/Email/Address)"
              />
            </Stack>

            <Divider sx={{ my: 4 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Navigation Links</Typography>
              <Button variant="outlined" startIcon={<Add />} onClick={addNavLink} size="small">Add Link</Button>
            </Box>
            
            <Stack spacing={2}>
              {(data.layout.navbar.links || []).map((link: any, i: number) => (
                <Box key={i} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <TextField label="Label" variant="outlined" size="small" value={link.label} onChange={(e) => updateNavLink(i, "label", e.target.value)} sx={{ flex: 1 }} />
                  <TextField label="Href (URL)" variant="outlined" size="small" value={link.href} onChange={(e) => updateNavLink(i, "href", e.target.value)} sx={{ flex: 2 }} />
                  <IconButton color="error" onClick={() => removeNavLink(i)}><Delete /></IconButton>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Footer Settings */}
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }} color="primary.main">Footer Configuration</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <TextField fullWidth multiline rows={3} label="About Text (Footer Column 1)" variant="outlined" value={data.layout.footer.aboutText || ""} onChange={(e) => updateFooter("aboutText", e.target.value)} sx={{ gridColumn: '1 / -1' }} />
              <TextField fullWidth label="Quick Links Title" variant="outlined" value={data.layout.footer.quickLinksTitle || ""} onChange={(e) => updateFooter("quickLinksTitle", e.target.value)} />
              <TextField fullWidth label="Programs Title" variant="outlined" value={data.layout.footer.programsTitle || ""} onChange={(e) => updateFooter("programsTitle", e.target.value)} />
              <TextField fullWidth label="Contact Title" variant="outlined" value={data.layout.footer.contactTitle || ""} onChange={(e) => updateFooter("contactTitle", e.target.value)} />
              <TextField fullWidth label="Copyright Info Text" variant="outlined" value={data.layout.footer.copyrightText || ""} onChange={(e) => updateFooter("copyrightText", e.target.value)} />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Snackbar 
        open={toast.open} 
        autoHideDuration={4000} 
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={toast.severity} variant="filled" sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
