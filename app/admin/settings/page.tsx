"use client";

import { useState, useEffect } from "react";
import {
  Box, Typography, Card, CardContent, TextField, Button, IconButton,
  Divider, CircularProgress, Alert, Snackbar, Switch, FormControlLabel, Stack
} from "@mui/material";
import { Save, Add, Delete, Download, Campaign, Upload, Restore } from "@mui/icons-material";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

  useEffect(() => {
    fetch("/api/content?section=settings")
      .then((r) => r.json())
      .then(setSettings)
      .catch((err) => {
        console.error("Failed to fetch settings:", err);
        setToast({ open: true, message: "Failed to load settings from server", severity: "error" });
      });
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "settings", data: settings }),
      });
      if (res.ok) {
        setToast({ open: true, message: "Settings saved successfully!", severity: "success" });
      } else {
        throw new Error("Failed to save");
      }
    } catch (error: any) {
      console.error("Save Error:", error);
      const msg = error.details || error.message || "Unknown error";
      setToast({ open: true, message: `Error saving settings: ${msg}`, severity: "error" });
    }
    setSaving(false);
  };

  const updateField = (field: string, value: any) => {
    setSettings((prev: any) => ({ ...prev, [field]: value }));
  };

  const updateAffiliation = (index: number, field: string, value: string) => {
    const arr = [...(settings.affiliations || [])];
    if (typeof arr[index] === "string") {
      arr[index] = { name: arr[index], logo: "" }; // Migration from old string format
    }
    arr[index] = { ...arr[index], [field]: value };
    updateField("affiliations", arr);
  };

  const addAffiliation = () => {
    updateField("affiliations", [...(settings.affiliations || []), { name: "New Affiliation", logo: "" }]);
  };

  const removeAffiliation = (index: number) => {
    updateField("affiliations", settings.affiliations.filter((_: any, i: number) => i !== index));
  };

  if (!settings) {
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
          <Typography variant="h4" color="text.primary" gutterBottom>Site Settings</Typography>
          <Typography variant="body2" color="text.secondary">Manage general website configuration and details.</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Save />}
          onClick={save}
          disabled={saving}
          sx={{ px: 3, py: 1.5 }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Institute Information */}
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }} color="primary.main">Institute Information</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <TextField fullWidth label="Full Name" variant="outlined" size="medium" value={settings.siteName || ""} onChange={(e) => updateField("siteName", e.target.value)} />
              <TextField fullWidth label="Short Name" variant="outlined" size="medium" value={settings.shortName || ""} onChange={(e) => updateField("shortName", e.target.value)} />
              <TextField fullWidth label="Tagline" variant="outlined" size="medium" value={settings.tagline || ""} onChange={(e) => updateField("tagline", e.target.value)} />
              <TextField fullWidth label="Established Year" variant="outlined" size="medium" value={settings.established || ""} onChange={(e) => updateField("established", e.target.value)} />
            </Box>
          </CardContent>
        </Card>

        {/* Contact Details */}
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }} color="primary.main">Contact Details</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
              <TextField fullWidth label="Phone" variant="outlined" size="medium" value={settings.phone || ""} onChange={(e) => updateField("phone", e.target.value)} />
              <TextField fullWidth label="Mobile" variant="outlined" size="medium" value={settings.mobile || ""} onChange={(e) => updateField("mobile", e.target.value)} />
              <TextField fullWidth label="Email" variant="outlined" size="medium" value={settings.email || ""} onChange={(e) => updateField("email", e.target.value)} />
              <TextField fullWidth label="WhatsApp Number" variant="outlined" size="medium" value={settings.whatsappNumber || ""} onChange={(e) => updateField("whatsappNumber", e.target.value)} />
              <Box sx={{ gridColumn: '1 / -1' }}>
                <TextField fullWidth label="Full Address" variant="outlined" size="medium" value={settings.address || ""} onChange={(e) => updateField("address", e.target.value)} />
              </Box>
              <TextField fullWidth label="Working Hours" variant="outlined" size="medium" value={settings.workingHours || ""} onChange={(e) => updateField("workingHours", e.target.value)} />
              <TextField fullWidth label="Copyright Info" variant="outlined" size="medium" value={settings.copyrightInfo || ""} onChange={(e) => updateField("copyrightInfo", e.target.value)} />
              <TextField fullWidth label="Footer CTA Title" variant="outlined" size="medium" value={settings.ctaTitle || ""} onChange={(e) => updateField("ctaTitle", e.target.value)} />
              <TextField fullWidth label="Footer CTA Subtitle" variant="outlined" size="medium" value={settings.ctaSubtitle || ""} onChange={(e) => updateField("ctaSubtitle", e.target.value)} />
            </Box>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }} color="primary.main">Social Links</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
              <TextField fullWidth label="Facebook URL" variant="outlined" size="medium" value={settings.facebookUrl || ""} onChange={(e) => updateField("facebookUrl", e.target.value)} />
              <TextField fullWidth label="YouTube URL" variant="outlined" size="medium" value={settings.youtubeUrl || ""} onChange={(e) => updateField("youtubeUrl", e.target.value)} />
              <TextField fullWidth label="Google Maps URL" variant="outlined" size="medium" value={settings.mapUrl || ""} onChange={(e) => updateField("mapUrl", e.target.value)} />
            </Box>
          </CardContent>
        </Card>

        {/* Affiliations */}
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h6" color="primary.main">Affiliations</Typography>
              <Button variant="outlined" startIcon={<Add />} onClick={addAffiliation} size="small">Add Affiliation</Button>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {(settings.affiliations || []).map((a: any, i: number) => {
                const isString = typeof a === "string";
                const name = isString ? a : a.name;
                const logo = isString ? "" : a.logo;
                return (
                  <Box key={i} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <TextField fullWidth label="Affiliation Name" variant="outlined" size="small" value={name} onChange={(e) => updateAffiliation(i, "name", e.target.value)} />
                    <TextField fullWidth label="Logo Image URL" variant="outlined" size="small" value={logo} onChange={(e) => updateAffiliation(i, "logo", e.target.value)} />
                    <IconButton color="error" onClick={() => removeAffiliation(i)}><Delete /></IconButton>
                  </Box>
                );
              })}
            </Box>
          </CardContent>
        </Card>
        
        {/* Marquee Settings */}
        <Card sx={{ border: '1px solid', borderColor: 'primary.light', bgcolor: 'primary.main', color: 'white' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Campaign sx={{ fontSize: 32 }} />
              <Typography variant="h6">Promotional Marquee (Ticker)</Typography>
            </Box>
            
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={settings.marqueeShow || false} 
                      onChange={(e) => updateField("marqueeShow", e.target.checked)}
                      color="secondary"
                    />
                  }
                  label={
                    <Typography sx={{ fontWeight: 'bold' }}>
                      {settings.marqueeShow ? "Marquee is ACTIVE" : "Marquee is HIDDEN"}
                    </Typography>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch 
                      checked={settings.showAdmissionsInMarquee || false} 
                      onChange={(e) => updateField("showAdmissionsInMarquee", e.target.checked)}
                      color="warning"
                    />
                  }
                  label={
                    <Typography sx={{ fontWeight: 'bold' }}>
                      Auto-show Open Admissions
                    </Typography>
                  }
                />
              </Box>
              
              <TextField 
                fullWidth 
                label="Marquee Content" 
                variant="filled" 
                multiline
                rows={3}
                value={settings.marqueeText || ""} 
                onChange={(e) => updateField("marqueeText", e.target.value)}
                placeholder="Enter text separated by bullets (•) for best look..."
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  '& .MuiInputBase-input': { color: 'white' },
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                  '& .MuiFilledInput-underline:before': { borderBottomColor: 'rgba(255,255,255,0.3)' }
                }}
                helperText={
                  <span>
                    Tip: Use <b>•</b> to separate items. You can use HTML like: 
                    <code> &lt;a href="/courses" class="btn-marquee"&gt;Browse Courses&lt;/a&gt;</code>
                  </span>
                }
                slotProps={{ 
                  formHelperText: { 
                    sx: { color: 'rgba(255,255,255,0.6)' } 
                  } 
                }}
              />
            </Stack>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'rgba(0,0,0,0.02)' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }} color="primary.main">Data Management</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Control how your website data is handled. Use "Force Sync" if your live site isn't showing the latest changes you pushed via code.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="outlined" 
                color="primary" 
                startIcon={<Download />}
                href="/api/admin/export"
                target="_blank"
                sx={{ fontWeight: 'bold' }}
              >
                Download Backup (.json)
              </Button>

              <Button 
                variant="outlined" 
                color="secondary" 
                startIcon={<Upload />}
                component="label"
                sx={{ fontWeight: 'bold' }}
              >
                Upload Backup (.json)
                <input
                  type="file"
                  hidden
                  accept=".json"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    
                    if (!confirm("This will completely replace your live data with the content of this file. Are you sure?")) return;

                    try {
                      const text = await file.text();
                      const json = JSON.parse(text);
                      
                      const res = await fetch("/api/admin/upload-backup", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(json),
                      });
                      
                      const result = await res.json();
                      if (res.ok) {
                        setToast({ open: true, message: result.message, severity: "success" });
                        setTimeout(() => window.location.reload(), 1500);
                      } else {
                        throw new Error(result.error);
                      }
                    } catch (err: any) {
                      setToast({ open: true, message: "Upload failed: " + err.message, severity: "error" });
                    }
                  }}
                />
              </Button>

              <Button 
                variant="contained" 
                color="warning" 
                startIcon={<Save />}
                onClick={async () => {
                  if (!confirm("This will overwrite your LIVE database with the data from your local content.json file. Are you sure?")) return;
                  try {
                    const res = await fetch("/api/admin/sync", { method: "POST" });
                    const result = await res.json();
                    if (res.ok) {
                      setToast({ open: true, message: result.message, severity: "success" });
                      setTimeout(() => window.location.reload(), 1500);
                    } else {
                      throw new Error(result.error);
                    }
                  } catch (err: any) {
                    setToast({ open: true, message: "Sync failed: " + err.message, severity: "error" });
                  }
                }}
                sx={{ fontWeight: 'bold' }}
              >
                Force Sync Local Data to Live
              </Button>

              <Button 
                variant="contained" 
                color="success" 
                startIcon={<Restore />}
                onClick={async () => {
                  if (!confirm("This will scan your Blob storage and automatically add ALL images to your Gallery. Continue?")) return;
                  try {
                    const res = await fetch("/api/admin/auto-gallery", { method: "POST" });
                    const result = await res.json();
                    if (res.ok) {
                      setToast({ open: true, message: result.message, severity: "success" });
                      setTimeout(() => window.location.reload(), 1500);
                    } else {
                      throw new Error(result.error);
                    }
                  } catch (err: any) {
                    setToast({ open: true, message: "Restore failed: " + err.message, severity: "error" });
                  }
                }}
                sx={{ fontWeight: 'bold', bgcolor: '#2e7d32' }}
              >
                Auto-Restore Gallery from Blob
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

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
