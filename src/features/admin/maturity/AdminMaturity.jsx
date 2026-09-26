import { useMaturityOverrides, useApproveMaturityOverride } from "../hooks";

export default function AdminMaturity() {
  const { data = [], isLoading, isError } = useMaturityOverrides();
  const approveMutation = useApproveMaturityOverride();

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-slate-500">
        Loading maturity overrides...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-sm text-red-600">
        Unable to load maturity overrides.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-emerald-600">Administration</p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Maturity Overrides
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Review administrative requests affecting student maturity records.
        </p>
      </div>

      <div className="space-y-4">
        {data.map((override) => (
          <div
            key={override.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  {override.student}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {override.previousLevel} → {override.requestedLevel}
                </p>

                <p className="mt-3 text-sm text-slate-600">{override.reason}</p>

                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                  <span>Requested by: {override.requestedBy}</span>
                  <span>•</span>
                  <span>{override.createdAt}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
                  {override.status}
                </span>

                {override.status === "Pending" && (
                  <button
                    type="button"
                    disabled={approveMutation.isPending}
                    onClick={() => approveMutation.mutate(override.id)}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {approveMutation.isPending ? "Approving..." : "Approve"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">
            No maturity override requests.
          </div>
        )}
      </div>
    </div>
  );
}
