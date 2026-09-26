import { useStaffFlags, useResolveFlag } from "../hooks";

export default function StaffFlags() {
  const { data = [], isLoading, isError } = useStaffFlags();

  const resolveFlag = useResolveFlag();

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading flags...</p>;
  }

  if (isError) {
    return (
      <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
        Unable to load flags.
      </div>
    );
  }

  const openFlags = data.filter((flag) => flag.status === "Open");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Student Flags</h1>

        <p className="mt-1 text-sm text-slate-500">
          Review student issues requiring staff attention.
        </p>
      </div>

      <div className="space-y-3">
        {openFlags.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
            No open flags.
          </div>
        ) : (
          openFlags.map((flag) => (
            <div
              key={flag.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-slate-900">{flag.student}</p>

                <p className="mt-1 text-sm text-slate-500">{flag.type}</p>

                <div className="mt-2 flex gap-2 text-xs">
                  <span className="rounded-full bg-red-50 px-2 py-1 font-semibold text-red-700">
                    {flag.severity}
                  </span>

                  <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-600">
                    {flag.createdAt}
                  </span>
                </div>
              </div>

              <button
                type="button"
                disabled={resolveFlag.isPending}
                onClick={() => resolveFlag.mutate(flag.id)}
                className="rounded-xl bg-[#0A3B25] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0d4c30] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {resolveFlag.isPending ? "Resolving..." : "Resolve"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
