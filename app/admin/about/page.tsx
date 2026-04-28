"use client";

import { useState, useEffect } from "react";
import {
  Box, Typography, Button, Grid, Card, CardContent, TextField,
  IconButton, CircularProgress, Snackbar, Alert, Paper, Avatar,
  Divider, Tooltip
} from "@mui/material";
import {
  Save, Plus, Delete, CheckCircle, Upload, Person
} from "@mui/icons-material";

export default function AdminAboutPage() {
  const [about, setAbout] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" as any });

  useEffect(() => {
    fetch("/api/content?section=about")
      .then((r) => r.json())
      .then(setAbout);
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "about", data: about }),
      });
      if (res.ok) {
        setToast({ open: true, message: "About section saved successfully!", severity: "success" });
      } else {
        throw new Error("Failed to save");
      }
    } catch (err) {
      setToast({ open: true, message: "Error saving changes", severity: "error" });
    }
    setSaving(false);
  };

  const updateField = (field: string, value: any) => {
    setAbout((prev: any) => ({ ...prev, [field]: value }));
  };

  const addAchievement = () => {
    updateField("achievements", [...about.achievements, "New Achievement"]);
  };

  const updateAchievement = (index: number, value: string) => {
    const arr = [...about.achievements];
    arr[index] = value;
    updateField("achievements", arr);
  };

  const removeAchievement = (index: number) => {
    updateField("achievements", about.achievements.filter((_: any, i: number) => i !== index));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      if (response.ok) {
        const blob = await response.json();
        updateField("principalImage", blob.url);
        setToast({ open: true, message: "Photo uploaded!", severity: "success" });
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      setToast({ open: true, message: "Upload failed.", severity: "error" });
    }
    setUploading(false);
  };

  if (!about) {
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
          <Typography variant="h4" color="text.primary" gutterBottom>About / Principal</Typography>
          <Typography variant="body2" color="text.secondary">Edit the institution&apos;s story and leadership information.</Typography>
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
        {/* About Info */}
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }} color="primary.main">Story & Mission</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField fullWidth multiline rows={4} label="Description" value={about.description} onChange={(e) => updateField("description", e.target.value)} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth multiline rows={3} label="Mission" value={about.mission} onChange={(e) => updateField("mission", e.target.value)} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth multiline rows={3} label="Vision" value={about.vision} onChange={(e) => updateField("vision", e.target.value)} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Principal Info */}
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }} color="primary.main">Principal Information</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
              <Avatar src={about.principalImage} sx={{ width: 100, height: 100, bgcolor: 'grey.100' }}>
                <Person sx={{ fontSize: 60, color: 'grey.300' }} />
              </Avatar>
              <Button
                variant="outlined"
                component="label"
                startIcon={uploading ? <CircularProgress size={20} /> : <Upload />}
                disabled={uploading}
              >
                Upload Photo
                <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
              </Button>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Principal Name" value={about.principalName} onChange={(e) => updateField("principalName", e.target.value)} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Title / Qualification" value={about.principalTitle} onChange={(e) => updateField("principalTitle", e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Photo URL (Optional)" value={about.principalImage} onChange={(e) => updateField("principalImage", e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth multiline rows={5} label="Principal's Message" value={about.principalMessage} onChange={(e) => updateField("principalMessage", e.target.value)} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" color="primary.main">Key Achievements</Typography>
              <Button variant="outlined" size="small" startIcon={<Plus />} onClick={addAchievement}>Add Achievement</Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {about.achievements.map((a: string, i: number) => (
                <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField size="small" fullWidth value={a} onChange={(e) => updateAchievement(i, e.target.value)} />
                  <IconButton color="error" onClick={() => removeAchievement(i)}>
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
