function valueOrDash(value) {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "object") return value?.name || value?.title || value?.label || "—";
  return String(value);
}

const FIELD_DEFINITIONS = [
  ["First name", "firstName"],
  ["Last name", "lastName"],
  ["Email", "email"],
  ["Phone number", "phone"],
  ["Department", "department"],
  ["Faculty", "faculty"],
  ["Role", "role"],
  ["Account status", "status"],
];

export default function ProfessionalInformation({ user }) {
  return (
    <section className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
      <div>
        <h3 className="text-xl font-semibold text-text-primary">Professional & Account Information</h3>
        <p className="mt-1 text-sm text-text-secondary">
          Information returned by the authenticated mentor account.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FIELD_DEFINITIONS.map(([label, key]) => (
          <div key={key} className="rounded-xl border border-border bg-slate-50/70 px-4 py-3">
            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-text-secondary">{label}</div>
            <div className="mt-1.5 break-words text-sm font-medium text-text-primary">{valueOrDash(user?.[key])}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
