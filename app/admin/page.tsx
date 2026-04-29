"use client";

import { useEffect, useState } from "react";
import {
  Box, Typography, Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, CircularProgress
} from "@mui/material";
import { Users, BookOpen, Image as ImageIcon, GraduationCap, Star, Clock, CheckCircle, XCircle } from "lucide-react";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then(setData)
      .catch((err) => console.error("Failed to fetch dashboard data:", err));
  }, []);

  if (!data) return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
      <CircularProgress />
    </Box>
  );

  const stats = [
    { label: "Courses", value: data.courses?.length || 0, icon: <BookOpen />, color: "primary.main", bg: "primary.light" },
    { label: "Team Members", value: data.team?.length || 0, icon: <Users />, color: "secondary.main", bg: "secondary.light" },
    { label: "Gallery Photos", value: data.gallery?.length || 0, icon: <ImageIcon />, color: "success.main", bg: "success.light" },
    { label: "Testimonials", value: data.testimonials?.length || 0, icon: <Star />, color: "warning.main", bg: "warning.light" },
    { label: "Total Applications", value: data.admissions?.length || 0, icon: <GraduationCap />, color: "info.main", bg: "info.light" },
    {
      label: "Pending Applications",
      value: data.admissions?.filter((a: any) => a.status === "Pending").length || 0,
      icon: <Clock />,
      color: "error.main", bg: "error.light"
    },
  ];

  const recentAdmissions = (data.admissions || []).slice(-5).reverse();

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" color="text.primary" gutterBottom>Dashboard</Typography>
        <Typography variant="body2" color="text.secondary">Welcome to STC Umerkot Admin Panel</Typography>
      </Box>

      {/* Stats Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
        {stats.map((stat, i) => (
          <Card key={i} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase" }}>
                  {stat.label}
                </Typography>
                <Box sx={{ bgcolor: stat.bg, color: stat.color, p: 1, borderRadius: '8px', display: 'flex' }}>
                  {stat.icon}
                </Box>
              </Box>
              <Typography variant="h4" color="text.primary" sx={{ fontWeight: 700 }}>
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Recent Admissions */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" color="primary.main" sx={{ mb: 3 }}>Recent Applications</Typography>
          {recentAdmissions.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>No applications yet.</Typography>
          ) : (
            <TableContainer>
              <Table sx={{ minWidth: 600 }}>
                <TableHead>
                  <TableRow>
                    <TableCell><Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>Name</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>Course</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>Phone</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>Status</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentAdmissions.map((a: any) => (
                    <TableRow key={a.id} hover>
                      <TableCell><Typography variant="body2" sx={{ fontWeight: 600 }}>{a.studentName}</Typography></TableCell>
                      <TableCell><Typography variant="body2" color="text.secondary">{a.course}</Typography></TableCell>
                      <TableCell><Typography variant="body2" color="text.secondary">{a.phone}</Typography></TableCell>
                      <TableCell>
                        <Chip
                          icon={a.status === "Approved" ? <CheckCircle size={16} /> : a.status === "Rejected" ? <XCircle size={16} /> : <Clock size={16} />}
                          label={a.status}
                          size="small"
                          color={a.status === "Approved" ? "success" : a.status === "Rejected" ? "error" : "warning"}
                          variant="outlined"
                          sx={{ fontWeight: 600 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
