import { FileBarChart, CalendarDays, ArrowRight } from "lucide-react";

import { useStakeholderReports } from "../hooks";

export default function StakeholderReports() {
  const { data = [], isLoading, isError } = useStakeholderReports();

  if (isLoading) {
    return <div className="p-6 text-sm text-slate-500">Loading reports...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-sm text-red-600">Unable to load reports.</div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-emerald-600">Reporting</p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">Reports</h1>

        <p className="mt-1 text-sm text-slate-500">
          Programme-level reports available to stakeholders.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {data.map((report) => (
          <div
            key={report.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                <FileBarChart size={20} className="text-slate-700" />
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {report.type}
              </span>
            </div>

            <h2 className="mt-5 font-semibold text-slate-900">
              {report.title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {report.description}
            </p>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CalendarDays size={14} />
                {report.period}
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-950"
              >
                View
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500 lg:col-span-2">
            No reports available.
          </div>
        )}
      </div>
    </div>
  );
}
