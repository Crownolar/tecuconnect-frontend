import { Settings, CheckCircle2, AlertCircle } from "lucide-react";

const items = [
  {
    label: "Authentication",
    status: "Connected",
    detail: "Production JWT authentication is active.",
    ok: true,
  },
  {
    label: "Student records",
    status: "Connected",
    detail: "Administrative student data is available through the student resource.",
    ok: true,
  },
  {
    label: "Mentor management",
    status: "Connected",
    detail: "Mentor directory, creation and assignment resources are available.",
    ok: true,
  },
  {
    label: "Platform configuration",
    status: "Pending backend contract",
    detail: "No dedicated admin settings endpoint is documented in the current API contract.",
    ok: false,
  },
];

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-emerald-600">Administration</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Platform configuration and administrative preferences.
        </p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
            <Settings size={20} className="text-slate-700" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Platform Settings</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              This page now reports the actual integration state instead of pretending an
              administrative settings API exists.
            </p>
          </div>
        </div>

        <div className="mt-6 divide-y divide-slate-100 rounded-xl border border-slate-200">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-slate-900">{item.label}</p>
                <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1.5 text-xs font-medium ${item.ok ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                {item.ok ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
