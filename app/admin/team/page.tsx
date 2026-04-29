"use client";

import { useState, useEffect } from "react";
import {
  Box, Typography, Button, Card, CardContent, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Avatar, CircularProgress, Snackbar, Alert, Paper, Divider
} from "@mui/material";
import {
  Add, Delete, Edit, Save, Close, Person, Upload
} from "@mui/icons-material";

export default function AdminTeamPage() {
  const [team, setTeam] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" as any });

  const load = () => {
    fetch("/api/content?section=team")
      .then((r) => r.json())
      .then(setTeam)
      .catch((err) => console.error("Failed to load team data:", err));
  };
  useEffect(() => { load(); }, []);

  const saveItem = async () => {
    setSaving(true);
    try {
      const url = "/api/items";
      const method = editing.id ? "PUT" : "POST";
      const body = editing.id 
        ? { section: "team", id: editing.id, updates: editing }
        : { section: "team", item: editing };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setToast({ open: true, message: "Member saved successfully!", severity: "success" });
        setEditing(null);
        load();
      } else {
        throw new Error("Failed to save");
      }
    } catch (err) {
      setToast({ open: true, message: "Error saving member", severity: "error" });
    }
    setSaving(false);
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    try {
      await fetch("/api/items", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "team", id }),
      });
      setToast({ open: true, message: "Member deleted", severity: "info" });
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
        setToast({ open: true, message: "Photo uploaded successfully!", severity: "success" });
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      setToast({ open: true, message: "Upload failed. Check your connection.", severity: "error" });
    }
    setUploading(false);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" color="text.primary" gutterBottom>Faculty / Team</Typography>
          <Typography variant="body2" color="text.secondary">Manage your institute&apos;s faculty and staff members.</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setEditing({ name: "", role: "", image: "", bio: "" })}
        >
          Add Member
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
        {team.map((member) => (
          <Box key={member.id}>
            <Card sx={{ textAlign: 'center', height: '100%', borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Avatar 
                  src={member.image} 
                  sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: 'grey.100' }}
                >
                  <Person sx={{ fontSize: 60, color: 'grey.300' }} />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>{member.name}</Typography>
                <Typography variant="caption" color="primary" sx={{ fontWeight: 700, textTransform: 'uppercase', tracking: 1, display: 'block', mb: 2 }}>
                  {member.role}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: 40 }}>
                  {member.bio}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                  <Button size="small" startIcon={<Edit />} onClick={() => setEditing({ ...member })}>Edit</Button>
                  <Button size="small" color="error" startIcon={<Delete />} onClick={() => deleteItem(member.id)}>Delete</Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {team.length === 0 && (
        <Paper sx={{ py: 10, textAlign: 'center', bgcolor: 'transparent', boxShadow: 'none' }}>
          <Person sx={{ fontSize: 60, color: 'grey.300', mb: 2 }} />
          <Typography color="text.secondary">No team members added yet.</Typography>
        </Paper>
      )}

      {/* Edit Dialog */}
      <Dialog open={Boolean(editing)} onClose={() => setEditing(null)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>{editing?.id ? "Edit Member" : "Add New Member"}</Typography>
          <IconButton onClick={() => setEditing(null)}><Close /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 1 }}>
            
            {/* Upload Section */}
            <Box sx={{ textAlign: 'center', p: 3, bgcolor: 'grey.50', borderRadius: 2, border: '1px dashed', borderColor: 'primary.main' }}>
              <Avatar src={editing?.image} sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: 'white', border: '2px solid white', boxShadow: 1 }}>
                <Person sx={{ fontSize: 60, color: 'grey.200' }} />
              </Avatar>
              <Button
                variant="contained"
                component="label"
                startIcon={uploading ? <CircularProgress size={20} color="inherit" /> : <Upload />}
                disabled={uploading}
                size="small"
              >
                {uploading ? "Uploading..." : "Upload Photo from Computer"}
                <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
              </Button>
              <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary', display: 'block' }}>
                Recommended: Square image (500x500px)
              </Typography>
            </Box>

            <Divider>OR</Divider>

            <TextField
              fullWidth
              label="Photo URL (Optional)"
              placeholder="https://..."
              value={editing?.image || ""}
              onChange={(e) => setEditing({ ...editing, image: e.target.value })}
              helperText="Link an image from the web instead"
            />

            <TextField
              fullWidth
              label="Full Name"
              value={editing?.name || ""}
              onChange={(e) => setEditing({ ...editing, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Role / Title"
              placeholder="e.g. Principal, Senior Instructor"
              value={editing?.role || ""}
              onChange={(e) => setEditing({ ...editing, role: e.target.value })}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Bio"
              value={editing?.bio || ""}
              onChange={(e) => setEditing({ ...editing, bio: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setEditing(null)} color="inherit">Cancel</Button>
          <Button variant="contained" startIcon={<Save />} onClick={saveItem} disabled={saving || uploading} sx={{ px: 4 }}>
            {saving ? "Saving..." : "Save Member"}
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
