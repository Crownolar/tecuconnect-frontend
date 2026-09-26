import {
  Users,
  GraduationCap,
  UserRoundCheck,
  ShieldCheck,
  Gauge,
  Activity,
} from "lucide-react";

import { useAdminDashboard } from "../hooks";

function MetricCard({ label, value, icon: Icon, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          <Icon size={19} className="text-slate-700" />
        </div>

        <span className="text-xs font-medium text-slate-400">System</span>
      </div>

      <div className="mt-5">
        <p className="text-sm text-slate-500">{label}</p>

        <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>

        <p className="mt-1 text-xs text-slate-400">{description}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { data, isLoading, isError } = useAdminDashboard();

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-slate-500">
        Loading admin dashboard...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-sm text-red-600">
        Unable to load admin dashboard.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-emerald-600">
          TEC-TRAK Administration
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor users, programme records and administrative activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <MetricCard
          label="Total Users"
          value={data.totalUsers}
          icon={Users}
          description="Registered platform users"
        />

        <MetricCard
          label="Students"
          value={data.totalStudents}
          icon={GraduationCap}
          description="Registered TEC fellows"
        />

        <MetricCard
          label="Mentors"
          value={data.totalMentors}
          icon={UserRoundCheck}
          description="Active mentor accounts"
        />

        <MetricCard
          label="Active Staff"
          value={data.activeStaff}
          icon={ShieldCheck}
          description="Operational staff accounts"
        />

        <MetricCard
          label="Pending Overrides"
          value={data.pendingOverrides}
          icon={Gauge}
          description="Awaiting administrative review"
        />

        <MetricCard
          label="Audit Events"
          value={data.auditEvents}
          icon={Activity}
          description="Recorded administrative activity"
        />
      </div>
    </div>
  );
}
