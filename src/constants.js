export const C = {
  bg: "#0d0c0e",
  panel: "#161418",
  panel2: "#1d1a1f",
  line: "rgba(255,255,255,0.08)",
  lineSoft: "rgba(255,255,255,0.05)",
  text: "#ECEAE6",
  muted: "#8b857d",
  faint: "#5b5650",
  accent: "#FF5436",
  accentDim: "rgba(255,84,54,0.14)",
  amber: "#FFC15E",
  mint: "#7DE2B8",
  blue: "#7CA8FF",
};

export const STATUS = {
  draft:     { label: "draft",     color: C.faint,  bg: "rgba(255,255,255,0.05)" },
  ready:     { label: "ready",     color: C.amber,  bg: "rgba(255,193,94,0.13)" },
  scheduled: { label: "scheduled", color: C.blue,   bg: "rgba(124,168,255,0.14)" },
  uploading: { label: "uploading", color: C.accent, bg: C.accentDim },
  published: { label: "published", color: C.mint,   bg: "rgba(125,226,184,0.13)" },
};

let _id = 0;
export const uid = () => `v${++_id}`;

export const fmtSize = (b) =>
  b < 1e6 ? `${(b / 1e3).toFixed(0)} KB`
  : b < 1e9 ? `${(b / 1e6).toFixed(1)} MB`
  : `${(b / 1e9).toFixed(2)} GB`;

export const defaultSlot = () => {
  const d = new Date(Date.now() + 24 * 3600 * 1000);
  d.setMinutes(0, 0, 0);
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:00`;
};

export const inp = {
  width: "100%", padding: "10px 13px", borderRadius: 10, marginBottom: 0,
  background: C.panel2, border: `1px solid ${C.line}`, color: C.text, fontSize: 14,
};

export const iconBtn = {
  background: "transparent", border: "none", cursor: "pointer", padding: 4, borderRadius: 6,
  display: "grid", placeItems: "center",
};

export const btn = (primary) => ({
  display: "flex", alignItems: "center", gap: 9, padding: "12px 20px", borderRadius: 12,
  fontWeight: 700, fontSize: 14.5, cursor: "pointer",
  background: primary ? C.accent : C.panel,
  color: primary ? "#0d0c0e" : C.text,
  border: `1px solid ${primary ? C.accent : C.line}`,
  boxShadow: primary ? "0 6px 20px rgba(255,84,54,0.32)" : "none",
});
