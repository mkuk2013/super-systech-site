"use client";

import { useState, useEffect } from "react";
import {
  Box, Typography, Grid, Card, CardContent, TextField, Button, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, CircularProgress, Paper, InputAdornment, ToggleButton, ToggleButtonGroup,
  Tooltip
} from "@mui/material";
import {
  Trash2, CheckCircle, XCircle, Clock, Search, Delete, Check, Close
} from "@mui/icons-material";

export default function AdminAdmissionsPage() {
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const load = () => {
    fetch("/api/admissions").then((r) => r.json()).then(setAdmissions).catch(console.error);
  };
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admissions", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  };

  const deleteAdmission = async (id: string) => {
    if (!confirm("Delete this application?")) return;
    await fetch("/api/admissions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  };

  const filtered = admissions
    .filter((a: any) => filter === "All" || a.status === filter)
    .filter((a: any) =>
      search === "" ||
      a.studentName?.toLowerCase().includes(search.toLowerCase()) ||
      a.phone?.includes(search) ||
      a.cnic?.includes(search)
    );

  const stats = {
    total: admissions.length,
    pending: admissions.filter((a: any) => a.status === "Pending").length,
    approved: admissions.filter((a: any) => a.status === "Approved").length,
    rejected: admissions.filter((a: any) => a.status === "Rejected").length,
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" color="text.primary" gutterBottom>Admissions</Typography>
          <Typography variant="body2" color="text.secondary">Review and manage student applications.</Typography>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        {[
          { label: "Total", value: stats.total, color: "primary.main", bg: "primary.light" },
          { label: "Pending", value: stats.pending, color: "warning.main", bg: "warning.light" },
          { label: "Approved", value: stats.approved, color: "success.main", bg: "success.light" },
          { label: "Rejected", value: stats.rejected, color: "error.main", bg: "error.light" },
        ].map((s, i) => (
          <Box key={i}>
            <Card sx={{ textAlign: 'center', borderTop: '4px solid', borderTopColor: s.color }}>
              <CardContent>
                <Typography variant="h4" fontWeight={700} color="text.primary">{s.value}</Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: 'uppercase' }}>
                  {s.label}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Search & Filter */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}>
            <TextField
              sx={{ flexGrow: 1, minWidth: 250 }}
              placeholder="Search by name, phone, CNIC..."
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" color="disabled" />
                  </InputAdornment>
                ),
              }}
            />
            <ToggleButtonGroup
              size="small"
              value={filter}
              exclusive
              onChange={(_, val) => val && setFilter(val)}
              color="primary"
            >
              <ToggleButton value="All">All</ToggleButton>
              <ToggleButton value="Pending">Pending</ToggleButton>
              <ToggleButton value="Approved">Approved</ToggleButton>
              <ToggleButton value="Rejected">Rejected</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead sx={{ bgcolor: 'grey.50' }}>
            <TableRow>
              <TableCell><Typography variant="caption" fontWeight={700} color="text.secondary">STUDENT</Typography></TableCell>
              <TableCell><Typography variant="caption" fontWeight={700} color="text.secondary">COURSE</Typography></TableCell>
              <TableCell><Typography variant="caption" fontWeight={700} color="text.secondary">PHONE / CNIC</Typography></TableCell>
              <TableCell><Typography variant="caption" fontWeight={700} color="text.secondary">STATUS</Typography></TableCell>
              <TableCell align="right"><Typography variant="caption" fontWeight={700} color="text.secondary">ACTIONS</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((a: any) => (
              <TableRow key={a.id} hover>
                <TableCell>
                  <Typography variant="body2" fontWeight={700}>{a.studentName}</Typography>
                  <Typography variant="caption" color="text.secondary">S/O {a.fatherName}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{a.course}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{a.phone}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>{a.cnic}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    icon={a.status === "Approved" ? <CheckCircle /> : a.status === "Rejected" ? <XCircle /> : <Clock />}
                    label={a.status}
                    color={a.status === "Approved" ? "success" : a.status === "Rejected" ? "error" : "warning"}
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}>
                    {a.status !== "Approved" && (
                      <Tooltip title="Approve">
                        <IconButton size="small" color="success" onClick={() => updateStatus(a.id, "Approved")}>
                          <Check fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {a.status !== "Rejected" && (
                      <Tooltip title="Reject">
                        <IconButton size="small" color="error" onClick={() => updateStatus(a.id, "Rejected")}>
                          <Close fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Delete">
                      <IconButton size="small" color="inherit" onClick={() => deleteAdmission(a.id)} sx={{ color: 'grey.400' }}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">No applications found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
