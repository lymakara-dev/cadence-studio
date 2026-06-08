import { Clapperboard } from "lucide-react";
import { C } from "../constants";

export default function Header({ provider, ollamaModel }) {
  return (
    <header style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "26px 0 22px", borderBottom: `1px solid ${C.line}`, position: "sticky", top: 0,
      background: `linear-gradient(${C.bg}, ${C.bg} 78%, transparent)`, zIndex: 20, backdropFilter: "blur(2px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 12, background: C.accent,
          display: "grid", placeItems: "center", boxShadow: "0 6px 22px rgba(255,84,54,0.4)",
        }}>
          <Clapperboard size={23} color="#0d0c0e" strokeWidth={2.4} />
        </div>
        <div>
          <div className="disp" style={{ fontSize: 21, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1 }}>
            Cadence Studio
          </div>
          <div className="mono" style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>
            bulk publishing · AI metadata · scheduler
          </div>
        </div>
      </div>

      <div className="mono" style={{
        display: "flex", alignItems: "center", gap: 8, fontSize: 12,
        color: C.muted, padding: "8px 13px", border: `1px solid ${C.line}`, borderRadius: 99,
      }}>
        <span style={{ width: 7, height: 7, borderRadius: 99, background: C.mint, boxShadow: `0 0 8px ${C.mint}` }} />
        {provider === "anthropic" ? "Anthropic API" : `Ollama · ${ollamaModel}`}
      </div>
    </header>
  );
}
