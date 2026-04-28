"use client";

import { useState, useEffect } from "react";
import {
  Box, Typography, Button, Grid, Card, CardContent, TextField,
  IconButton, CircularProgress, Snackbar, Alert, Paper, Divider
} from "@mui/material";
import {
  Save, Plus, Delete, CheckCircle, Warning
} from "@mui/icons-material";

export default function AdminHeroPage() {
  const [hero, setHero] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" as any });

  useEffect(() => {
    fetch("/api/content?section=hero")
      .then((r) => r.json())
      .then(setHero);
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "hero", data: hero }),
      });
      if (res.ok) {
        setToast({ open: true, message: "Hero section saved successfully!", severity: "success" });
      } else {
        throw new Error("Failed to save");
      }
    } catch (err) {
      setToast({ open: true, message: "Error saving changes", severity: "error" });
    }
    setSaving(false);
  };

  const updateField = (field: string, value: any) => {
    setHero((prev: any) => ({ ...prev, [field]: value }));
  };

  const updateStat = (index: number, field: string, value: string) => {
    const stats = [...hero.stats];
    stats[index] = { ...stats[index], [field]: value };
    updateField("stats", stats);
  };

  const addStat = () => {
    updateField("stats", [...hero.stats, { value: "0", label: "New Stat" }]);
  };

  const removeStat = (index: number) => {
    updateField("stats", hero.stats.filter((_: any, i: number) => i !== index));
  };

  if (!hero) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" color="text.primary" gutterBottom>Hero Section</Typography>
          <Typography variant="body2" color="text.secondary">Edit the main banner and introduction of your website.</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={save}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Badge & Title */}
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }} color="primary.main">Header Content</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField fullWidth label="Badge Text" value={hero.badge} onChange={(e) => updateField("badge", e.target.value)} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Title Start" value={hero.title} onChange={(e) => updateField("title", e.target.value)} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Highlighted Text" value={hero.titleHighlight} onChange={(e) => updateField("titleHighlight", e.target.value)} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Title End" value={hero.titleEnd} onChange={(e) => updateField("titleEnd", e.target.value)} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Subtitle & Background */}
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }} color="primary.main">Description & Visuals</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField fullWidth multiline rows={3} label="Subtitle" value={hero.subtitle} onChange={(e) => updateField("subtitle", e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Background Image URL" value={hero.backgroundImage} onChange={(e) => updateField("backgroundImage", e.target.value)} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* CTA Buttons */}
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }} color="primary.main">Call to Action Buttons</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Primary Button Text" value={hero.ctaPrimary} onChange={(e) => updateField("ctaPrimary", e.target.value)} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Secondary Button Text" value={hero.ctaSecondary} onChange={(e) => updateField("ctaSecondary", e.target.value)} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" color="primary.main">Counter Statistics</Typography>
              <Button variant="outlined" size="small" startIcon={<Plus />} onClick={addStat}>Add Stat</Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {hero.stats.map((stat: any, i: number) => (
                <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField size="small" sx={{ flexGrow: 1 }} label="Value" value={stat.value} onChange={(e) => updateStat(i, "value", e.target.value)} />
                  <TextField size="small" sx={{ flexGrow: 2 }} label="Label" value={stat.label} onChange={(e) => updateStat(i, "label", e.target.value)} />
                  <IconButton color="error" onClick={() => removeStat(i)}>
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert severity={toast.severity} sx={{ width: '100%' }} variant="filled">
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
