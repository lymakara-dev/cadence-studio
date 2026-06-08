import { AlertCircle } from "lucide-react";
import { C } from "../constants";

export default function Toast({ notice }) {
  if (!notice) return null;

  return (
    <div className="rise" style={{
      position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
      display: "flex", alignItems: "center", gap: 10, padding: "13px 18px", borderRadius: 12, zIndex: 50,
      background: C.panel2, border: `1px solid ${notice.kind === "warn" ? C.amber : C.line}`,
      boxShadow: "0 12px 40px rgba(0,0,0,0.5)", maxWidth: 440,
    }}>
      <AlertCircle size={17} color={notice.kind === "warn" ? C.amber : C.muted} />
      <span style={{ fontSize: 13.5 }}>{notice.msg}</span>
    </div>
  );
}
