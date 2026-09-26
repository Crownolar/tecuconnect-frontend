import { UserRound } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";

export default function StakeholderProfile() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-emerald-600">Account</p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">Profile</h1>

        <p className="mt-1 text-sm text-slate-500">
          View your stakeholder account information.
        </p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <UserRound size={20} className="text-slate-600" />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              {user?.name ?? "TEC-TRAK Stakeholder"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {user?.email ?? "Stakeholder account"}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-400">Role</p>

            <p className="mt-1 text-sm font-medium text-slate-800">
              Stakeholder
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-400">Access</p>

            <p className="mt-1 text-sm font-medium text-slate-800">Read-only</p>
          </div>
        </div>
      </section>
    </div>
  );
}
