import { useState, useRef, useCallback } from "react";
import { C, uid, defaultSlot } from "./constants";
import GlobalStyles from "./components/GlobalStyles";
import Header from "./components/Header";
import StatsStrip from "./components/StatsStrip";
import ConfigPanel from "./components/ConfigPanel";
import DropZone from "./components/DropZone";
import ActionBar from "./components/ActionBar";
import VideoCard from "./components/VideoCard";
import Toast from "./components/Toast";
import { Film } from "lucide-react";

export default function App() {
  const [provider, setProvider] = useState("anthropic");
  const [apiKey, setApiKey] = useState("");
  const [ollamaUrl, setOllamaUrl] = useState("http://localhost:11434");
  const [ollamaModel, setOllamaModel] = useState("llama3.1");
  const [channelCtx, setChannelCtx] = useState("");
  const [videos, setVideos] = useState([]);
  const [notice, setNotice] = useState(null);
  const intervals = useRef({});

  const flash = (msg, kind = "info") => {
    setNotice({ msg, kind });
    setTimeout(() => setNotice(null), 4200);
  };

  /* ---------- queue management ---------- */
  const addFiles = useCallback((fileList) => {
    const items = Array.from(fileList)
      .filter((f) => f.type.startsWith("video/") || /\.(mp4|mov|mkv|webm|avi)$/i.test(f.name))
      .map((f) => ({
        id: uid(),
        fileName: f.name,
        size: f.size,
        url: URL.createObjectURL(f),
        title: "",
        titleOptions: [],
        description: "",
        tags: [],
        publishMode: "schedule",
        scheduledAt: defaultSlot(),
        status: "draft",
        progress: 0,
        generating: false,
      }));
    if (!items.length) { flash("No video files detected in that drop.", "warn"); return; }
    setVideos((v) => [...v, ...items]);
  }, []);

  const patch = (id, fields) =>
    setVideos((v) => v.map((x) => (x.id === id ? { ...x, ...fields } : x)));

  const remove = (id) => {
    clearInterval(intervals.current[id]);
    setVideos((v) => v.filter((x) => x.id !== id));
  };

  /* ---------- AI metadata generation ---------- */
  async function callModel(prompt) {
    if (provider === "ollama") {
      try {
        const r = await fetch(`${ollamaUrl.replace(/\/$/, "")}/api/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: ollamaModel, prompt, stream: false }),
        });
        if (!r.ok) throw new Error("ollama unreachable");
        const d = await r.json();
        return d.response;
      } catch {
        flash("Ollama endpoint not reachable from preview — using the connected Claude API instead.", "warn");
      }
    }
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const d = await r.json();
    return d.content.filter((b) => b.type === "text").map((b) => b.text).join("\n");
  }

  const buildPrompt = (fileName) =>
    `You are a YouTube growth strategist optimizing video metadata for discoverability.
Video file: "${fileName}"
Channel context: "${channelCtx || "general interest channel"}"

Return ONLY raw JSON (no markdown, no backticks, no commentary) of this exact shape:
{"titles":["option 1","option 2","option 3"],"description":"a compelling 2-3 paragraph description with a hook, the value, and a call to action; end with 3-5 relevant hashtags","tags":["tag1","tag2"]}

Rules: titles under 70 chars, specific and honest (no misleading clickbait). Provide up to 12 tags.`;

  const parseJSON = (raw) => {
    const clean = raw.replace(/```json|```/g, "").trim();
    const s = clean.indexOf("{"), e = clean.lastIndexOf("}");
    return JSON.parse(clean.slice(s, e + 1));
  };

  const generate = async (id) => {
    const vid = videos.find((x) => x.id === id);
    if (!vid) return;
    patch(id, { generating: true });
    try {
      const raw = await callModel(buildPrompt(vid.fileName));
      const j = parseJSON(raw);
      patch(id, {
        generating: false,
        titleOptions: j.titles || [],
        title: (j.titles && j.titles[0]) || vid.title,
        description: j.description || "",
        tags: j.tags || [],
        status: "ready",
      });
    } catch {
      patch(id, { generating: false });
      flash("Couldn't generate suggestions — check the connection and try again.", "warn");
    }
  };

  const generateAll = async () => {
    for (const v of videos) if (!v.generating && v.status === "draft") await generate(v.id);
  };

  /* ---------- uploads ---------- */
  const startUploads = () => {
    const targets = videos.filter((v) => v.status === "ready" || v.status === "scheduled");
    if (!targets.length) { flash("Nothing queued — generate metadata first.", "warn"); return; }
    targets.forEach((v) => {
      if (v.publishMode === "schedule") { patch(v.id, { status: "scheduled" }); return; }
      patch(v.id, { status: "uploading", progress: 0 });
      intervals.current[v.id] = setInterval(() => {
        setVideos((list) => list.map((x) => {
          if (x.id !== v.id) return x;
          const next = Math.min(100, x.progress + Math.random() * 14 + 4);
          if (next >= 100) {
            clearInterval(intervals.current[v.id]);
            return { ...x, progress: 100, status: "published" };
          }
          return { ...x, progress: next };
        }));
      }, 380);
    });
  };

  /* ---------- derived stats ---------- */
  const stats = {
    total:     videos.length,
    ready:     videos.filter((v) => v.status === "ready").length,
    scheduled: videos.filter((v) => v.status === "scheduled").length,
    published: videos.filter((v) => v.status === "published").length,
    size:      videos.reduce((a, v) => a + v.size, 0),
  };

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh", fontFamily: "'Hanken Grotesk', sans-serif" }}>
      <GlobalStyles />

      {/* atmosphere */}
      <div className="glow" style={{ position: "fixed", inset: 0, pointerEvents: "none", opacity: 0.9 }} />
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E\")",
      }} />

      <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "0 20px 80px" }}>
        <Header provider={provider} ollamaModel={ollamaModel} />

        <StatsStrip stats={stats} />

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: 20 }}>
          <ConfigPanel
            provider={provider} setProvider={setProvider}
            apiKey={apiKey} setApiKey={setApiKey}
            ollamaUrl={ollamaUrl} setOllamaUrl={setOllamaUrl}
            ollamaModel={ollamaModel} setOllamaModel={setOllamaModel}
            channelCtx={channelCtx} setChannelCtx={setChannelCtx}
          />

          <DropZone onAddFiles={addFiles} totalCount={stats.total} totalSize={stats.size} />

          {videos.length > 0 && (
            <ActionBar onGenerateAll={generateAll} onStartUploads={startUploads} />
          )}

          <div className="scroll" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {videos.map((v, i) => (
              <VideoCard key={v.id} v={v} index={i} onPatch={patch} onRemove={remove} onGenerate={generate} />
            ))}
            {videos.length === 0 && (
              <div style={{ textAlign: "center", padding: "30px 0", color: C.faint }}>
                <Film size={26} style={{ opacity: 0.5 }} />
                <div style={{ marginTop: 10, fontSize: 14 }}>Your upload queue is empty.</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Toast notice={notice} />
    </div>
  );
}
