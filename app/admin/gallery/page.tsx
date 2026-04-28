"use client";

import { useState, useEffect, useRef } from "react";
import {
  Box, Typography, Button, Grid, Card, CardMedia, CardContent, CardActions,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton,
  CircularProgress, Snackbar, Alert, Paper
} from "@mui/material";
import {
  Add, Delete, Edit, Save, Close, Upload, Image as ImageIcon
} from "@mui/icons-material";

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" as any });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = () => {
    fetch("/api/content?section=gallery").then((r) => r.json()).then(setGallery);
  };
  useEffect(() => { load(); }, []);

  const saveItem = async () => {
    setSaving(true);
    try {
      const url = editing.id ? "/api/items" : "/api/items";
      const method = editing.id ? "PUT" : "POST";
      const body = editing.id 
        ? { section: "gallery", id: editing.id, updates: editing }
        : { section: "gallery", item: editing };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setToast({ open: true, message: "Gallery item saved!", severity: "success" });
        setEditing(null);
        load();
      } else {
        throw new Error("Failed to save");
      }
    } catch (err) {
      setToast({ open: true, message: "Error saving item", severity: "error" });
    }
    setSaving(false);
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this photo?")) return;
    try {
      await fetch("/api/items", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "gallery", id }),
      });
      setToast({ open: true, message: "Photo deleted", severity: "info" });
      load();
    } catch (err) {
      setToast({ open: true, message: "Error deleting", severity: "error" });
    }
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
        setEditing({ ...editing, image: blob.url });
        setToast({ open: true, message: "Image uploaded!", severity: "success" });
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      setToast({ open: true, message: "Upload failed. Check BLOB_READ_WRITE_TOKEN", severity: "error" });
    }
    setUploading(false);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" color="text.primary" gutterBottom>Gallery</Typography>
          <Typography variant="body2" color="text.secondary">Manage gallery photos and categories.</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setEditing({ title: "", image: "", category: "Campus" })}
        >
          Add Photo
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
        {gallery.map((item) => (
          <Box key={item.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <CardMedia
                component="img"
                height="180"
                image={item.image || "/images/placeholder.png"}
                alt={item.title}
                sx={{ bgcolor: 'grey.100' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" fontWeight={700} noWrap>{item.title || "Untitled"}</Typography>
                <Typography variant="caption" color="text.secondary">{item.category}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', p: 1 }}>
                <IconButton size="small" color="primary" onClick={() => setEditing({ ...item })}>
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => deleteItem(item.id)}>
                  <Delete fontSize="small" />
                </IconButton>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>

      {gallery.length === 0 && (
        <Paper sx={{ py: 10, textAlign: 'center', bgcolor: 'transparent', boxShadow: 'none' }}>
          <ImageIcon sx={{ fontSize: 60, color: 'grey.300', mb: 2 }} />
          <Typography color="text.secondary">No photos found in gallery.</Typography>
        </Paper>
      )}

      {/* Edit Dialog */}
      <Dialog open={Boolean(editing)} onClose={() => setEditing(null)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{editing?.id ? "Edit Photo" : "Add New Photo"}</Typography>
          <IconButton onClick={() => setEditing(null)}><Close /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 1 }}>
            <TextField
              fullWidth
              label="Title"
              value={editing?.title || ""}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            />
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block', fontWeight: 700 }}>
                IMAGE (UPLOAD OR URL)
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                <TextField
                  fullWidth
                  label="Image URL (Optional)"
                  placeholder="https://..."
                  value={editing?.image || ""}
                  onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                  size="small"
                />
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={uploading ? <CircularProgress size={20} /> : <Upload />}
                  disabled={uploading}
                >
                  Upload
                  <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
                </Button>
              </Box>
              {editing?.image && (
                <Box sx={{ mt: 2, borderRadius: 2, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                  <img src={editing.image} alt="Preview" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                </Box>
              )}
            </Box>
            <TextField
              fullWidth
              label="Category"
              placeholder="e.g. Campus, Events, Classes"
              value={editing?.category || ""}
              onChange={(e) => setEditing({ ...editing, category: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setEditing(null)} color="inherit">Cancel</Button>
          <Button variant="contained" startIcon={<Save />} onClick={saveItem} disabled={saving || uploading}>
            {saving ? "Saving..." : "Save Photo"}
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
