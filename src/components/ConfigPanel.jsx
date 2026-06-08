import { useState } from "react";
import { Settings2, ChevronDown, KeyRound, Server, Cpu, Wand2, Sparkles } from "lucide-react";
import { C, inp } from "../constants";
import Field from "./Field";

export default function ConfigPanel({ provider, setProvider, apiKey, setApiKey, ollamaUrl, setOllamaUrl, ollamaModel, setOllamaModel, channelCtx, setChannelCtx }) {
  const [open, setOpen] = useState(true);

  return (
    <section style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 16, overflow: "hidden" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 20px", background: "transparent", border: "none", color: C.text, cursor: "pointer",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 15 }}>
          <Settings2 size={17} color={C.accent} /> Model connection
        </span>
        <ChevronDown size={18} color={C.muted} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .25s" }} />
      </button>

      {open && (
        <div style={{ padding: "4px 20px 22px", borderTop: `1px solid ${C.lineSoft}` }}>
          <div style={{ display: "flex", gap: 10, margin: "18px 0 18px" }}>
            {[
              { id: "anthropic", label: "Anthropic", icon: Sparkles, sub: "Claude" },
              { id: "ollama",    label: "Ollama",    icon: Server,   sub: "self-hosted" },
            ].map((p) => {
              const on = provider === p.id;
              return (
                <button key={p.id} onClick={() => setProvider(p.id)} style={{
                  flex: 1, display: "flex", alignItems: "center", gap: 11, padding: "13px 15px",
                  borderRadius: 12, cursor: "pointer", textAlign: "left",
                  background: on ? C.accentDim : C.panel2,
                  border: `1px solid ${on ? C.accent : C.line}`, color: C.text, transition: "all .2s",
                }}>
                  <p.icon size={19} color={on ? C.accent : C.muted} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{p.label}</div>
                    <div className="mono" style={{ fontSize: 10.5, color: C.muted }}>{p.sub}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {provider === "anthropic" ? (
            <Field label="API key" icon={KeyRound}>
              <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-ant-•••••••••••••••••" style={inp} />
            </Field>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="Endpoint" icon={Server}>
                <input value={ollamaUrl} onChange={(e) => setOllamaUrl(e.target.value)} style={inp} />
              </Field>
              <Field label="Model" icon={Cpu}>
                <input value={ollamaModel} onChange={(e) => setOllamaModel(e.target.value)} style={inp} />
              </Field>
            </div>
          )}

          <div style={{ marginTop: 14 }}>
            <Field label="Channel context — steers the AI suggestions" icon={Wand2}>
              <input value={channelCtx} onChange={(e) => setChannelCtx(e.target.value)}
                placeholder="e.g. weekly home-espresso reviews for beginners" style={inp} />
            </Field>
          </div>

          <p className="mono" style={{ fontSize: 11, color: C.faint, marginTop: 14, lineHeight: 1.6 }}>
            Keys stay in the browser session. In this preview, suggestions are generated through the connected Claude API; a self-hosted build calls your own endpoint directly.
          </p>
        </div>
      )}
    </section>
  );
}
