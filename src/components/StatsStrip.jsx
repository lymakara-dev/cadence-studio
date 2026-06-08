import { Film, ListChecks, Calendar, Check } from "lucide-react";
import { C } from "../constants";

export default function StatsStrip({ stats }) {
  const items = [
    { k: "queued",    v: stats.total,     c: C.text,  icon: Film },
    { k: "ready",     v: stats.ready,     c: C.amber, icon: ListChecks },
    { k: "scheduled", v: stats.scheduled, c: C.blue,  icon: Calendar },
    { k: "published", v: stats.published, c: C.mint,  icon: Check },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, margin: "22px 0" }}>
      {items.map((s) => (
        <div key={s.k} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 14, padding: "15px 17px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="mono" style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 1 }}>
              {s.k}
            </span>
            <s.icon size={15} color={s.c} />
          </div>
          <div className="disp" style={{ fontSize: 32, fontWeight: 800, color: s.c, marginTop: 6, lineHeight: 1 }}>
            {s.v}
          </div>
        </div>
      ))}
    </div>
  );
}
