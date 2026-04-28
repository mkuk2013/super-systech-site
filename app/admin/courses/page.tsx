"use client";

import { useState, useEffect } from "react";
import {
  Box, Typography, Button, Grid, Card, CardContent, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  MenuItem, FormControlLabel, Checkbox, CircularProgress, Snackbar, Alert,
  Chip, List, ListItem, ListItemText, Paper, Divider
} from "@mui/material";
import {
  Add, Delete, Edit, Save, Close, School, CheckCircle, Warning
} from "@mui/icons-material";

const ICONS = ["GraduationCap", "ShieldCheck", "BookOpen", "Award", "Code", "Palette"];

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" as any });

  const load = () => {
    fetch("/api/content?section=courses")
      .then((r) => r.json())
      .then(setCourses);
  };

  useEffect(() => { load(); }, []);

  const saveItem = async () => {
    setSaving(true);
    try {
      const url = "/api/items";
      const method = editing.id ? "PUT" : "POST";
      const body = editing.id 
        ? { section: "courses", id: editing.id, updates: editing }
        : { section: "courses", item: editing };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setToast({ open: true, message: "Course saved successfully!", severity: "success" });
        setEditing(null);
        load();
      } else {
        throw new Error("Failed to save");
      }
    } catch (err) {
      setToast({ open: true, message: "Error saving course", severity: "error" });
    }
    setSaving(false);
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await fetch("/api/items", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "courses", id }),
      });
      setToast({ open: true, message: "Course deleted", severity: "info" });
      load();
    } catch (err) {
      setToast({ open: true, message: "Error deleting course", severity: "error" });
    }
  };

  const newCourse = () => {
    setEditing({
      title: "", board: "", duration: "", description: "", icon: "BookOpen", featured: false,
    });
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" color="text.primary" gutterBottom>Manage Courses</Typography>
          <Typography variant="body2" color="text.secondary">Add, edit, or remove institute courses.</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={newCourse}
        >
          Add Course
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {courses.map((course) => (
          <Card key={course.id} variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                    <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                      {course.title}
                    </Typography>
                    {course.featured && (
                      <Chip label="FEATURED" size="small" color="secondary" sx={{ height: 20, fontSize: '0.625rem', fontWeight: 700 }} />
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {course.board} • {course.duration}
                  </Typography>
                </Box>
                <Box>
                  <IconButton color="primary" onClick={() => setEditing({ ...course })}>
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton color="error" onClick={() => deleteItem(course.id)}>
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
        {courses.length === 0 && (
          <Paper sx={{ py: 10, textAlign: 'center', bgcolor: 'transparent', boxShadow: 'none' }}>
            <School sx={{ fontSize: 60, color: 'grey.300', mb: 2 }} />
            <Typography color="text.secondary">No courses found.</Typography>
          </Paper>
        )}
      </Box>

      {/* Edit Dialog */}
      <Dialog open={Boolean(editing)} onClose={() => setEditing(null)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{editing?.id ? "Edit Course" : "Add New Course"}</Typography>
          <IconButton onClick={() => setEditing(null)}><Close /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 1 }}>
            <TextField
              fullWidth
              label="Course Title"
              value={editing?.title || ""}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                fullWidth
                label="Board / Authority"
                value={editing?.board || ""}
                onChange={(e) => setEditing({ ...editing, board: e.target.value })}
              />
              <TextField
                fullWidth
                label="Duration"
                value={editing?.duration || ""}
                onChange={(e) => setEditing({ ...editing, duration: e.target.value })}
              />
            </Box>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={editing?.description || ""}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, alignItems: 'center' }}>
              <TextField
                select
                fullWidth
                label="Icon"
                value={editing?.icon || "BookOpen"}
                onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
              >
                {ICONS.map((i) => (
                  <MenuItem key={i} value={i}>{i}</MenuItem>
                ))}
              </TextField>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={editing?.featured || false}
                    onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                  />
                }
                label={<Typography variant="body2" fontWeight={700}>Featured on Home</Typography>}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setEditing(null)} color="inherit">Cancel</Button>
          <Button variant="contained" startIcon={<Save />} onClick={saveItem} disabled={saving}>
            {saving ? "Saving..." : "Save Course"}
          </Button>
        </DialogActions>
      </Dialog>

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
