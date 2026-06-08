import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { C, fmtSize } from "../constants";

export default function DropZone({ onAddFiles, totalCount, totalSize }) {
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef(null);

  return (
    <section
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); onAddFiles(e.dataTransfer.files); }}
      onClick={() => fileRef.current?.click()}
      style={{
        border: `1.5px dashed ${dragging ? C.accent : C.line}`, borderRadius: 16,
        padding: "40px 24px", textAlign: "center", cursor: "pointer", transition: "all .2s",
        background: dragging ? C.accentDim : "transparent",
      }}
    >
      <input ref={fileRef} type="file" accept="video/*" multiple hidden
        onChange={(e) => onAddFiles(e.target.files)} />
      <div style={{
        width: 56, height: 56, borderRadius: 16, margin: "0 auto 16px",
        background: C.panel2, border: `1px solid ${C.line}`, display: "grid", placeItems: "center",
      }}>
        <Upload size={24} color={C.accent} />
      </div>
      <div className="disp" style={{ fontSize: 19, fontWeight: 700 }}>Drop videos to bulk-upload</div>
      <div style={{ color: C.muted, fontSize: 14, marginTop: 6 }}>
        or click to browse · MP4, MOV, MKV, WEBM ·{" "}
        {totalCount ? `${totalCount} queued · ${fmtSize(totalSize)}` : "select many at once"}
      </div>
    </section>
  );
}
