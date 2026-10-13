import {
  GraduationCap,
  CheckCircle2,
  BriefcaseBusiness,
  Users,
  CalendarCheck,
  TrendingUp,
  BadgeCheck,
  Coins,
  Building2,
  Briefcase,
} from "lucide-react";

import { useStakeholderImpact } from "../hooks";
import StakeholderMetricCard from "../components/StakeholderMetricCard";

function formatPercent(value) {
  return `${Number(value ?? 0).toLocaleString()}%`;
}

export default function StakeholderImpact() {
  const { data, isLoading, isError } = useStakeholderImpact();

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-slate-500" role="status">
        Loading impact data...
      </div>
    );
  }

  if (isError || !data?.funnel || !data?.participation) {
    return (
      <div className="p-6 text-sm text-red-600" role="alert">
        Unable to load impact data. Please try again.
      </div>
    );
  }

  const { funnel, participation } = data;
  const departments = Array.isArray(data.departments) ? data.departments : [];

  const funnelMetrics = [
    { label: "Students Enrolled", value: funnel.enrolled, icon: GraduationCap },
    { label: "Students Active", value: funnel.active, icon: Users },
    { label: "Attended at Least 80%", value: funnel.attended80, icon: CalendarCheck },
    { label: "Competence Certified", value: funnel.certifiedCompetence, icon: BadgeCheck },
    { label: "Applied Commercially", value: funnel.appliedCommercially, icon: TrendingUp },
    { label: "Generated Income", value: funnel.generatedIncome, icon: Coins },
    { label: "Sustainable Enterprises", value: funnel.sustainableEnterprises, icon: Building2 },
  ];

  const outcomeMetrics = [
    { label: "Ventures Supported", value: participation.ventures?.supported, icon: BriefcaseBusiness },
    { label: "Ventures Validated", value: participation.ventures?.validated, icon: CheckCircle2 },
    { label: "Ventures Launched", value: participation.ventures?.launched, icon: BriefcaseBusiness },
    { label: "Jobs Created", value: funnel.jobsCreated, icon: Briefcase },
    { label: "Employment-Creating Activities", value: funnel.createdEmployment, icon: Users },
    { label: "Spin-offs", value: funnel.spinoffs, icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-medium text-emerald-600">Institutional Impact</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Programme Impact</h1>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
          Aggregated indicators across participation, engagement, venture development,
          and entrepreneurship outcomes.
        </p>
      </header>

      <section className="space-y-3">
        <div>
          <h2 className="font-semibold text-slate-900">Programme Impact Funnel</h2>
          <p className="mt-1 text-sm text-slate-500">
            Progression from enrolment through commercial application and enterprise sustainability.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {funnelMetrics.map(({ label, value, icon }) => (
            <StakeholderMetricCard
              key={label}
              label={label}
              value={value ?? 0}
              icon={icon}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="font-semibold text-slate-900">Participation & Outcomes</h2>
          <p className="mt-1 text-sm text-slate-500">
            Participation rates, mentorship engagement, and programme-level outcomes.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StakeholderMetricCard
            label="Completion Rate"
            value={formatPercent(participation.completionRate)}
            icon={CheckCircle2}
          />
          <StakeholderMetricCard
            label="Programme Attendance"
            value={formatPercent(participation.attendanceRate)}
            icon={CalendarCheck}
          />
          <StakeholderMetricCard
            label="Mentorship Engagement"
            value={participation.mentorshipEngagement ?? 0}
            icon={Users}
          />
          {outcomeMetrics.map(({ label, value, icon }) => (
            <StakeholderMetricCard
              key={label}
              label={label}
              value={value ?? 0}
              icon={icon}
            />
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <h2 className="font-semibold text-slate-900">Department Participation</h2>
          <p className="mt-1 text-sm text-slate-500">
            Student participation by department and faculty.
          </p>
        </div>
        {departments.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {departments.map((item) => (
              <div
                key={item.id ?? `${item.name}-${item.faculty}`}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-700">{item.name}</p>
                  <p className="mt-1 text-xs text-slate-400">{item.faculty}</p>
                </div>
                <span className="shrink-0 font-semibold text-slate-900">
                  {item.students ?? 0}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-sm text-slate-500">
            No department participation data is available.
          </div>
        )}
      </section>
    </div>
  );
}
