import StaffMetricCard from "../components/StaffMetricCard";
import { useStaffDashboard } from "../hooks";

export default function StaffDashboard() {
  const { data, isLoading, isError } = useStaffDashboard();

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-sm text-slate-500">Loading staff dashboard...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        Unable to load staff dashboard.
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          TEC-TRAK Staff Portal
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Staff Dashboard
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Monitor student participation, progress, attendance, and operational
          issues.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StaffMetricCard
          label="Total Students"
          value={data.totalStudents}
          description="Students in the programme"
        />

        <StaffMetricCard
          label="Active Students"
          value={data.activeStudents}
          description="Currently participating"
        />

        <StaffMetricCard
          label="Pending Flags"
          value={data.pendingFlags}
          description="Require staff attention"
        />

        <StaffMetricCard
          label="Pending Milestones"
          value={data.pendingMilestones}
          description="Awaiting processing"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Attendance Rate</p>

          <div className="mt-3 flex items-end gap-2">
            <span className="text-4xl font-bold text-slate-900">
              {data.attendanceRate}%
            </span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-600"
              style={{
                width: `${data.attendanceRate}%`,
              }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Staff Attention</p>

          <p className="mt-3 text-sm text-slate-600">
            There are <strong>{data.pendingFlags}</strong> student issues
            currently requiring attention.
          </p>
        </div>
      </div>
    </div>
  );
}
