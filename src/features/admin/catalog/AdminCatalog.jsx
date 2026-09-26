import { useAdminCatalog } from "../hooks";

export default function AdminCatalog() {
  const { data, isLoading, isError } = useAdminCatalog();

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-slate-500">
        Loading catalogue...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-sm text-red-600">
        Unable to load catalogue.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-emerald-600">
          Administration
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Skills & Departments
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View the programme catalogue used across TEC-TRAK.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Departments
          </h2>

          <div className="mt-4 space-y-2">
            {data.departments.map((department) => (
              <div
                key={department}
                className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700"
              >
                {department}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Entrepreneurial Skills
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}