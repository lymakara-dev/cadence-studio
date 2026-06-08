import { Trash2, Loader2, Tag, Clock, Calendar, Zap } from "lucide-react";
import { C, STATUS, fmtSize, inp, iconBtn } from "../constants";

export default function VideoCard({ v, index, onPatch, onRemove, onGenerate }) {
  const st = STATUS[v.status];

  return (
    <div className="rise" style={{
      background: C.panel, border: `1px solid ${C.line}`, borderRadius: 16,
      overflow: "hidden", animationDelay: `${index * 40}ms`,
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "168px 1fr", gap: 0 }}>
        {/* preview */}
        <div style={{ position: "relative", background: "#000", minHeight: 168 }}>
          <video src={v.url} muted preload="metadata"
            style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
          <div style={{
            position: "absolute", top: 10, left: 10, padding: "4px 9px", borderRadius: 7,
            background: st.bg, border: `1px solid ${st.color}`, display: "flex", alignItems: "center", gap: 6,
          }}>
            {v.status === "uploading" && (
              <Loader2 size={11} color={st.color} style={{ animation: "spin 1s linear infinite" }} />
            )}
            <span className="mono" style={{ fontSize: 10.5, color: st.color, textTransform: "uppercase", letterSpacing: 1 }}>
              {st.label}
            </span>
          </div>
        </div>

        {/* body */}
        <div style={{ padding: "16px 18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <div className="mono" style={{ fontSize: 12, color: C.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {v.fileName} · {fmtSize(v.size)}
            </div>
            <button onClick={() => onRemove(v.id)} style={iconBtn}>
              <Trash2 size={15} color={C.muted} />
            </button>
          </div>

          <input
            value={v.title}
            onChange={(e) => onPatch(v.id, { title: e.target.value })}
            placeholder="Video title…"
            style={{ ...inp, fontSize: 16, fontWeight: 700, marginTop: 12, marginBottom: 0, fontFamily: "'Bricolage Grotesque', sans-serif" }}
          />

          {v.titleOptions.length > 1 && (
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 9 }}>
              {v.titleOptions.map((t, i) => (
                <button key={i} onClick={() => onPatch(v.id, { title: t })} style={{
                  fontSize: 11.5, padding: "5px 10px", borderRadius: 99, cursor: "pointer",
                  background: v.title === t ? C.accentDim : C.panel2,
                  border: `1px solid ${v.title === t ? C.accent : C.line}`,
                  color: v.title === t ? C.accent : C.muted,
                  maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {t}
                </button>
              ))}
            </div>
          )}

          <textarea
            value={v.description}
            onChange={(e) => onPatch(v.id, { description: e.target.value })}
            placeholder="Description…"
            rows={3}
            style={{ ...inp, marginTop: 11, lineHeight: 1.55, fontSize: 13.5 }}
          />

          {v.tags.length > 0 && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 11, alignItems: "center" }}>
              <Tag size={13} color={C.faint} />
              {v.tags.map((t, i) => (
                <span key={i} className="mono" style={{
                  fontSize: 11, color: C.muted, padding: "3px 8px",
                  borderRadius: 6, background: C.panel2, border: `1px solid ${C.lineSoft}`,
                }}>
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* scheduling row */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: 14,
            paddingTop: 14, borderTop: `1px solid ${C.lineSoft}`,
          }}>
            <div style={{ display: "flex", background: C.panel2, borderRadius: 9, padding: 3, border: `1px solid ${C.line}` }}>
              {[{ id: "now", label: "Publish now" }, { id: "schedule", label: "Schedule" }].map((m) => (
                <button key={m.id} onClick={() => onPatch(v.id, { publishMode: m.id })} style={{
                  fontSize: 12.5, padding: "6px 12px", borderRadius: 7, cursor: "pointer", border: "none",
                  fontWeight: 600,
                  background: v.publishMode === m.id ? C.accent : "transparent",
                  color: v.publishMode === m.id ? "#0d0c0e" : C.muted,
                }}>
                  {m.label}
                </button>
              ))}
            </div>

            {v.publishMode === "schedule" && (
              <div style={{ display: "flex", alignItems: "center", gap: 7, color: C.muted }}>
                <Clock size={14} />
                <input
                  type="datetime-local"
                  value={v.scheduledAt}
                  onChange={(e) => onPatch(v.id, { scheduledAt: e.target.value })}
                  style={{ ...inp, width: "auto", padding: "7px 10px", marginBottom: 0, colorScheme: "dark", fontSize: 13 }}
                />
              </div>
            )}

            <button onClick={() => onGenerate(v.id)} disabled={v.generating} style={{
              marginLeft: "auto", display: "flex", alignItems: "center", gap: 7, fontSize: 13,
              fontWeight: 700, padding: "8px 14px", borderRadius: 9, cursor: v.generating ? "wait" : "pointer",
              background: C.accentDim, border: `1px solid ${C.accent}`, color: C.accent,
            }}>
              {v.generating
                ? <><Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} /> Generating…</>
                : <><Zap size={15} /> Suggest title & description</>}
            </button>
          </div>

          {/* progress */}
          {v.status === "uploading" && (
            <div style={{ marginTop: 13 }}>
              <div style={{ height: 6, borderRadius: 99, background: C.panel2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${v.progress}%`, background: C.accent, borderRadius: 99, transition: "width .35s ease" }} />
              </div>
              <div className="mono" style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>
                uploading… {Math.round(v.progress)}%
              </div>
            </div>
          )}

          {v.status === "scheduled" && (
            <div className="mono" style={{ fontSize: 12, color: C.blue, marginTop: 13, display: "flex", alignItems: "center", gap: 7 }}>
              <Calendar size={14} /> goes live {new Date(v.scheduledAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
