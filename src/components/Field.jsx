import { C } from "../constants";

export default function Field({ label, icon: Icon, children }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, color: C.muted, marginBottom: 7 }}>
        <Icon size={13} color={C.faint} /> {label}
      </span>
      {children}
    </label>
  );
}
