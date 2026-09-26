import {
  GraduationCap,
  CheckCircle2,
  BriefcaseBusiness,
  Users,
  CalendarCheck,
} from "lucide-react";

import { useStakeholderImpact } from "../hooks";
import StakeholderMetricCard from "../components/StakeholderMetricCard";

export default function StakeholderImpact() {
  const { data, isLoading, isError } = useStakeholderImpact();

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-slate-500">Loading impact data...</div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-sm text-red-600">
        Unable to load impact data.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-emerald-600">
          Institutional Impact
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Programme Impact
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Aggregated indicators across participation, engagement and
          entrepreneurship activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StakeholderMetricCard
          label="Students Enrolled"
          value={data.studentsEnrolled}
          icon={GraduationCap}
        />

        <StakeholderMetricCard
          label="Students Active"
          value={data.studentsActive}
          icon={Users}
        />

        <StakeholderMetricCard
          label="Students Completed"
          value={data.studentsCompleted}
          icon={CheckCircle2}
        />

        <StakeholderMetricCard
          label="Milestone Completion"
          value={`${data.milestoneCompletionRate}%`}
          icon={CheckCircle2}
        />

        <StakeholderMetricCard
          label="Programme Attendance"
          value={`${data.averageProgrammeAttendance}%`}
          icon={CalendarCheck}
        />

        <StakeholderMetricCard
          label="Ventures Supported"
          value={data.venturesSupported}
          icon={BriefcaseBusiness}
        />

        <StakeholderMetricCard
          label="Ventures Validated"
          value={data.venturesValidated}
          icon={CheckCircle2}
        />

        <StakeholderMetricCard
          label="Ventures Launched"
          value={data.venturesLaunched}
          icon={BriefcaseBusiness}
        />
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <h2 className="font-semibold text-slate-900">
            Department Participation
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Student participation by department.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {data.departmentParticipation.map((item) => (
            <div
              key={item.department}
              className="flex items-center justify-between px-5 py-4"
            >
              <span className="text-sm text-slate-700">{item.department}</span>

              <span className="font-semibold text-slate-900">
                {item.students}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold text-slate-900">
              Mentorship Engagement
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Recorded programme-level mentorship activity.
            </p>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold text-slate-900">
              {data.mentorshipSessions}
            </p>

            <p className="text-xs text-slate-400">sessions</p>
          </div>
        </div>
      </section>
    </div>
  );
}
