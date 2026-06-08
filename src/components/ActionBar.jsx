import { Sparkles, Rocket } from "lucide-react";
import { btn } from "../constants";

export default function ActionBar({ onGenerateAll, onStartUploads }) {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <button onClick={onGenerateAll} style={btn(false)}>
        <Sparkles size={17} /> Generate all metadata
      </button>
      <button onClick={onStartUploads} style={btn(true)}>
        <Rocket size={17} /> Start uploads
      </button>
    </div>
  );
}
