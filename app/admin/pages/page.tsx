"use client";

import { useState, useEffect } from "react";
import {
  Box, Typography, Button, Grid, Card, CardContent, TextField,
  CircularProgress, Snackbar, Alert, Paper, Stack, Divider,
  InputAdornment
} from "@mui/material";
import {
  Save, Pageview, Label, Title, Subtitles
} from "@mui/icons-material";

const PAGES = [
  { id: "about", label: "About Page" },
  { id: "courses", label: "Courses Page" },
  { id: "gallery", label: "Gallery Page" },
  { id: "team", label: "Team Page" },
  { id: "admissions", label: "Admissions Page" },
  { id: "contact", label: "Contact Page" },
];

export default function AdminPagesHeroPage() {
  const [heroes, setHeroes] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" as any });

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((data) => {
        setHeroes(data.pageHeroes || {});
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load page heroes:", err);
        setLoading(false);
      });
  }, []);

  const updateHero = (pageId: string, field: string, value: string) => {
    setHeroes((prev: any) => ({
      ...prev,
      [pageId]: {
        ...prev[pageId],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "pageHeroes", data: heroes }),
      });

      if (res.ok) {
        setToast({ open: true, message: "Page heroes updated successfully!", severity: "success" });
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save");
      }
    } catch (err: any) {
      setToast({ open: true, message: err.message || "Error saving heroes", severity: "error" });
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" color="text.primary" gutterBottom sx={{ fontWeight: 800 }}>
            Page Hero Sections
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Customize the title and subtitle for each page's header section.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleSave}
          disabled={saving}
          sx={{ borderRadius: 2, px: 4 }}
        >
          {saving ? "Saving..." : "Save All Changes"}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {PAGES.map((page) => (
          <Grid item xs={12} md={6} key={page.id}>
            <Card variant="outlined" sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <Pageview color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{page.label}</Typography>
                </Box>
                
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Badge / Top Label"
                    value={heroes[page.id]?.badge || ""}
                    onChange={(e) => updateHero(page.id, "badge", e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Label fontSize="small" sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Main Title"
                    value={heroes[page.id]?.title || ""}
                    onChange={(e) => updateHero(page.id, "title", e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Title fontSize="small" sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Subtitle / Description"
                    value={heroes[page.id]?.subtitle || ""}
                    onChange={(e) => updateHero(page.id, "subtitle", e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Subtitles fontSize="small" sx={{ color: 'text.secondary', mt: 1, alignSelf: 'flex-start' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

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
