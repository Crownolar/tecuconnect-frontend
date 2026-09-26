import { useAdminAuditLogs } from "../hooks";

export default function AdminAudit() {
  const { data = [], isLoading, isError } = useAdminAuditLogs();

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-slate-500">Loading audit logs...</div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-sm text-red-600">Unable to load audit logs.</div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-emerald-600">Administration</p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">Audit Logs</h1>

        <p className="mt-1 text-sm text-slate-500">
          Review recorded administrative and programme actions.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="divide-y divide-slate-100">
          {data.map((log) => (
            <div
              key={log.id}
              className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-slate-900">{log.action}</p>

                <p className="mt-1 text-sm text-slate-500">
                  {log.actor} → {log.target}
                </p>
              </div>

              <span className="text-xs text-slate-400">{log.timestamp}</span>
            </div>
          ))}

          {data.length === 0 && (
            <div className="p-10 text-center text-sm text-slate-500">
              No audit events found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
