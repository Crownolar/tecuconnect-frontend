import {
  Activity,
  BookOpen,
  Building2,
  GraduationCap,
  RefreshCw,
  Users,
  UserRound,
} from "lucide-react";

import { useAdminDashboard } from "../hooks";

function MetricCard({ label, value, description, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>

          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            {value ?? "—"}
          </p>

          {description && (
            <p className="mt-2 text-xs text-slate-500">{description}</p>
          )}
        </div>

        <div className="rounded-xl bg-slate-100 p-3 text-slate-600">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

function DataSourceStatus({ dataSources }) {
  const sources = [
    ["Students", dataSources?.students],
    ["Mentors", dataSources?.mentors],
    ["Catalogue", dataSources?.catalog],
    ["Assessments", dataSources?.assessments],
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div>
        <h2 className="text-base font-semibold text-slate-900">Data Sources</h2>

        <p className="mt-1 text-sm text-slate-500">
          Availability of the APIs used to build this dashboard.
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {sources.map(([name, available]) => (
          <div
            key={name}
            className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3"
          >
            <span className="text-sm font-medium text-slate-700">{name}</span>

            <span
              className={[
                "rounded-full px-2.5 py-1 text-xs font-semibold",
                available
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-700",
              ].join(" ")}
            >
              {available ? "Available" : "Unavailable"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const dashboardQuery = useAdminDashboard();

  if (dashboardQuery.isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
          <div className="mt-3 h-8 w-64 animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-4 w-96 max-w-full animate-pulse rounded bg-slate-200" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-2xl border border-slate-200 bg-white"
            />
          ))}
        </div>
      </div>
    );
  }

  if (dashboardQuery.isError) {
    return (
      <div className="space-y-5">
        <div>
          <p className="text-sm font-medium text-emerald-600">Administration</p>

          <h1 className="mt-1 text-2xl font-semibold text-slate-900">
            Dashboard
          </h1>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <h2 className="font-semibold text-red-900">
            Unable to load admin dashboard
          </h2>

          <p className="mt-1 text-sm text-red-700">
            {dashboardQuery.error?.data?.message ||
              dashboardQuery.error?.data?.error ||
              dashboardQuery.error?.message ||
              "The dashboard data could not be loaded."}
          </p>

          <button
            type="button"
            onClick={() => dashboardQuery.refetch()}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-800"
          >
            <RefreshCw size={15} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  const data = dashboardQuery.data ?? {};

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-600">Administration</p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Admin Dashboard
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Operational overview of students, mentors, entrepreneurship
            catalogue and competency assessments.
          </p>
        </div>

        <button
          type="button"
          onClick={() => dashboardQuery.refetch()}
          disabled={dashboardQuery.isFetching}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          <RefreshCw
            size={15}
            className={dashboardQuery.isFetching ? "animate-spin" : ""}
          />

          {dashboardQuery.isFetching ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <section>
        <div className="mb-4">
          <h2 className="text-base font-semibold text-slate-900">People</h2>

          <p className="mt-1 text-sm text-slate-500">
            Current student and mentor population exposed by the API.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Total Students"
            value={data.totalStudents}
            description={`${data.activeStudents ?? 0} currently active`}
            icon={GraduationCap}
          />

          <MetricCard
            label="Active Students"
            value={data.activeStudents}
            description="Students marked active"
            icon={Activity}
          />

          <MetricCard
            label="Total Mentors"
            value={data.totalMentors}
            description={`${data.activeMentors ?? 0} currently active`}
            icon={Users}
          />

          <MetricCard
            label="Active Mentors"
            value={data.activeMentors}
            description="Mentors currently active"
            icon={UserRound}
          />
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-base font-semibold text-slate-900">
            Entrepreneurship Programme
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Catalogue and competency-assessment activity.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Skills"
            value={data.totalSkills}
            description="Configured entrepreneurship skills"
            icon={BookOpen}
          />

          <MetricCard
            label="Faculties"
            value={data.totalFaculties}
            description="Faculties available to the platform"
            icon={Building2}
          />

          <MetricCard
            label="Departments"
            value={data.totalDepartments}
            description="Departments available to the platform"
            icon={Building2}
          />

          <MetricCard
            label="Assessments"
            value={data.totalAssessments}
            description="Competency assessments recorded"
            icon={Activity}
          />
        </div>
      </section>

      <DataSourceStatus dataSources={data.dataSources} />
    </div>
  );
}
