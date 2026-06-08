import { C } from "../constants";

export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
      * { box-sizing: border-box; }
      ::selection { background: ${C.accent}; color: #0d0c0e; }
      input, textarea { font-family: inherit; }
      input:focus, textarea:focus { outline: none; }
      textarea { resize: vertical; }
      .disp { font-family: 'Bricolage Grotesque', sans-serif; }
      .mono { font-family: 'JetBrains Mono', monospace; }
      .scroll::-webkit-scrollbar { width: 8px; height: 8px; }
      .scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 8px; }
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      .rise { animation: rise .45s cubic-bezier(.2,.7,.2,1) both; }
      .glow { background: radial-gradient(60% 120% at 85% -10%, rgba(255,84,54,0.18), transparent 60%); }
    `}</style>
  );
}
