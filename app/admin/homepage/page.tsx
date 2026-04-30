"use client";

import { useState, useEffect } from "react";
import {
  Box, Typography, Card, CardContent, Button, IconButton,
  Divider, CircularProgress, Alert, Snackbar, Switch, FormControlLabel, Stack, Paper
} from "@mui/material";
import { Save, KeyboardArrowUp, KeyboardArrowDown, Visibility, VisibilityOff } from "@mui/icons-material";

export default function HomepageManagementPage() {
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
        body: JSON.stringify({ section: "homepage", data: data.homepage }),
      });
      if (res.ok) {
        setToast({ open: true, message: "Homepage structure saved successfully!", severity: "success" });
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

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const sections = [...data.homepage.sections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= sections.length) return;
    
    const temp = sections[index];
    sections[index] = sections[newIndex];
    sections[newIndex] = temp;
    
    setData({ ...data, homepage: { ...data.homepage, sections } });
  };

  const toggleSection = (index: number) => {
    const sections = [...data.homepage.sections];
    sections[index] = { ...sections[index], enabled: !sections[index].enabled };
    setData({ ...data, homepage: { ...data.homepage, sections } });
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
          <Typography variant="h4" color="text.primary" gutterBottom>Homepage Sections</Typography>
          <Typography variant="body2" color="text.secondary">Control the visibility and order of sections on your homepage.</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Save />}
          onClick={save}
          disabled={saving}
          sx={{ px: 3, py: 1.5 }}
        >
          {saving ? "Saving..." : "Save Layout"}
        </Button>
      </Box>

      <Card>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }} color="primary.main">Section Manager</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Use the arrows to reorder sections. Use the visibility switch to show or hide a section from the homepage.
          </Typography>

          <Stack spacing={2}>
            {data.homepage.sections.map((section: any, i: number) => (
              <Paper 
                key={section.id} 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  border: '1px solid', 
                  borderColor: 'divider', 
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  bgcolor: section.enabled ? 'background.paper' : 'rgba(0,0,0,0.02)',
                  opacity: section.enabled ? 1 : 0.7
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <IconButton size="small" onClick={() => moveSection(i, 'up')} disabled={i === 0}><KeyboardArrowUp /></IconButton>
                    <IconButton size="small" onClick={() => moveSection(i, 'down')} disabled={i === data.homepage.sections.length - 1}><KeyboardArrowDown /></IconButton>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: section.enabled ? 'text.primary' : 'text.disabled' }}>
                      {section.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">ID: {section.id}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={section.enabled} 
                        onChange={() => toggleSection(i)} 
                        icon={<VisibilityOff sx={{ fontSize: 18 }} />}
                        checkedIcon={<Visibility sx={{ fontSize: 18 }} />}
                      />
                    }
                    label={section.enabled ? "Visible" : "Hidden"}
                  />
                </Box>
              </Paper>
            ))}
          </Stack>
        </CardContent>
      </Card>

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
