import { Settings } from "lucide-react";

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

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
          <Settings size={20} className="text-slate-700" />
        </div>

        <h2 className="mt-5 text-lg font-semibold text-slate-900">
          Platform Settings
        </h2>

        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
          System-level configuration will be connected to the administrative API
          during backend integration.
        </p>
      </div>
    </div>
  );
}
