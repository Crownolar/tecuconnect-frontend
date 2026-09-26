import {
  GraduationCap,
  Users,
  CheckCircle2,
  CalendarCheck,
  Target,
  Building2,
  BriefcaseBusiness,
  TrendingUp,
} from "lucide-react";

import { useStakeholderDashboard } from "../hooks";
import StakeholderMetricCard from "../components/StakeholderMetricCard";

export default function StakeholderDashboard() {
  const { data, isLoading, isError } = useStakeholderDashboard();

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-slate-500">
        Loading stakeholder dashboard...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-sm text-red-600">
        Unable to load stakeholder dashboard.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-emerald-600">TEC-TRAK Impact</p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Stakeholder Dashboard
        </h1>

        <p className="mt-1 max-w-2xl text-sm text-slate-500">
          High-level visibility into programme participation, engagement and
          entrepreneurship outcomes.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StakeholderMetricCard
          label="Students"
          value={data.totalStudents}
          description="Students enrolled"
          icon={GraduationCap}
        />

        <StakeholderMetricCard
          label="Active Students"
          value={data.activeStudents}
          description="Currently active"
          icon={Users}
        />

        <StakeholderMetricCard
          label="Completion Rate"
          value={`${data.completionRate}%`}
          description="Programme completion"
          icon={CheckCircle2}
        />

        <StakeholderMetricCard
          label="Attendance"
          value={`${data.averageAttendance}%`}
          description="Average programme attendance"
          icon={CalendarCheck}
        />

        <StakeholderMetricCard
          label="Milestones"
          value={data.milestonesCompleted}
          description="Completed milestones"
          icon={Target}
        />

        <StakeholderMetricCard
          label="Mentors"
          value={data.activeMentors}
          description="Active mentors"
          icon={Users}
        />

        <StakeholderMetricCard
          label="Departments"
          value={data.departmentsReached}
          description="Departments reached"
          icon={Building2}
        />

        <StakeholderMetricCard
          label="Ventures"
          value={data.venturesSupported}
          description="Ventures supported"
          icon={BriefcaseBusiness}
        />
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
            <TrendingUp size={19} className="text-slate-700" />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">Programme Overview</h2>

            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
              This view provides aggregated programme information for
              institutional and strategic stakeholders. Detailed student-level
              operational actions remain within the appropriate staff, mentor
              and administrator portals.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
