"use client";

import { useState, useEffect } from "react";
import {
  Box, Typography, Button, Grid, Card, CardContent, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Rating, CircularProgress, Snackbar, Alert, Paper, Divider
} from "@mui/material";
import {
  Add, Delete, Edit, Save, Close, FormatQuote, Star
} from "@mui/icons-material";

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" as any });

  const load = () => {
    fetch("/api/content?section=testimonials").then((r) => r.json()).then(setItems);
  };
  useEffect(() => { load(); }, []);

  const saveItem = async () => {
    setSaving(true);
    try {
      const url = "/api/items";
      const method = editing.id ? "PUT" : "POST";
      const body = editing.id 
        ? { section: "testimonials", id: editing.id, updates: editing }
        : { section: "testimonials", item: editing };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setToast({ open: true, message: "Testimonial saved!", severity: "success" });
        setEditing(null);
        load();
      } else {
        throw new Error("Failed to save");
      }
    } catch (err) {
      setToast({ open: true, message: "Error saving testimonial", severity: "error" });
    }
    setSaving(false);
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await fetch("/api/items", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "testimonials", id }),
      });
      setToast({ open: true, message: "Testimonial deleted", severity: "info" });
      load();
    } catch (err) {
      setToast({ open: true, message: "Error deleting", severity: "error" });
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" color="text.primary" gutterBottom>Testimonials</Typography>
          <Typography variant="body2" color="text.secondary">What students say about Super Systech Computers.</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setEditing({ name: "", course: "", message: "", rating: 5 })}
        >
          Add Testimonial
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((item) => (
          <Card key={item.id} variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }} color="text.primary">
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      • {item.course}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 1.5 }}>
                    &ldquo;{item.message}&rdquo;
                  </Typography>
                  <Rating value={item.rating} readOnly size="small" />
                </Box>
                <Box>
                  <IconButton color="primary" onClick={() => setEditing({ ...item })}>
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton color="error" onClick={() => deleteItem(item.id)}>
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
        {items.length === 0 && (
          <Paper sx={{ py: 10, textAlign: 'center', bgcolor: 'transparent', boxShadow: 'none' }}>
            <FormatQuote sx={{ fontSize: 60, color: 'grey.300', mb: 2 }} />
            <Typography color="text.secondary">No testimonials yet.</Typography>
          </Paper>
        )}
      </Box>

      {/* Edit Dialog */}
      <Dialog open={Boolean(editing)} onClose={() => setEditing(null)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{editing?.id ? "Edit Testimonial" : "New Testimonial"}</Typography>
          <IconButton onClick={() => setEditing(null)}><Close /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 1 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                fullWidth
                label="Student Name"
                value={editing?.name || ""}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
              <TextField
                fullWidth
                label="Course / Batch"
                value={editing?.course || ""}
                onChange={(e) => setEditing({ ...editing, course: e.target.value })}
              />
            </Box>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Message"
              value={editing?.message || ""}
              onChange={(e) => setEditing({ ...editing, message: e.target.value })}
            />
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block', fontWeight: 700 }}>
                RATING
              </Typography>
              <Rating 
                value={editing?.rating || 5} 
                onChange={(_, val) => setEditing({ ...editing, rating: val })} 
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setEditing(null)} color="inherit">Cancel</Button>
          <Button variant="contained" startIcon={<Save />} onClick={saveItem} disabled={saving}>
            {saving ? "Saving..." : "Save Testimonial"}
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
