import { Check, Eye, X } from "lucide-react";

const formatDate = (value) => {
  if (!value) return "No date proposed";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Invalid date";
  return date.toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const statusClass = {
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  ACCEPTED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  REJECTED: "border-red-200 bg-red-50 text-red-700",
};

export default function MentorshipRequestList({
  requests = [],
  onView,
  onAccept,
  onReject,
}) {
  if (!requests.length) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-white p-10 text-center">
        <h3 className="text-sm font-semibold text-text-primary">
          No mentorship requests
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          New student requests will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white">
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-slate-50">
            <tr>
              {[
                "Student",
                "Topic",
                "Preferred Date",
                "Status",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {requests.map((request) => (
              <tr key={request.id} className="align-top">
                <td className="px-4 py-4">
                  <div className="font-medium text-text-primary">
                    {request.studentName}
                  </div>
                  <div className="mt-1 text-xs text-text-secondary">
                    {request.student?.matricNumber || request.student?.email || "—"}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="font-medium text-text-primary">
                    {request.topic || "General mentorship"}
                  </div>
                  {request.notes ? (
                    <p className="mt-1 max-w-sm text-xs text-text-secondary line-clamp-2">
                      {request.notes}
                    </p>
                  ) : null}
                </td>
                <td className="px-4 py-4 text-sm text-text-secondary">
                  {formatDate(request.preferredDate)}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                      statusClass[request.status] ||
                      "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onView?.(request)}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-2 text-xs font-semibold text-text-primary hover:bg-slate-50"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </button>
                    {request.status === "PENDING" ? (
                      <>
                        <button
                          type="button"
                          onClick={() => onAccept?.(request)}
                          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-2.5 py-2 text-xs font-semibold text-white hover:opacity-90"
                        >
                          <Check className="h-3.5 w-3.5" />
                          Accept
                        </button>
                        <button
                          type="button"
                          onClick={() => onReject?.(request)}
                          className="inline-flex items-center gap-1.5 rounded-md border border-red-200 px-2.5 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"
                        >
                          <X className="h-3.5 w-3.5" />
                          Reject
                        </button>
                      </>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-border md:hidden">
        {requests.map((request) => (
          <div key={request.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-text-primary">
                  {request.studentName}
                </p>
                <p className="mt-1 text-xs text-text-secondary">
                  {request.student?.matricNumber || request.student?.email || "—"}
                </p>
              </div>
              <span
                className={`inline-flex rounded-full border px-2 py-1 text-[10px] font-semibold ${
                  statusClass[request.status] ||
                  "border-slate-200 bg-slate-50 text-slate-600"
                }`}
              >
                {request.status}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div>
                <span className="text-xs text-text-secondary">Topic</span>
                <p className="font-medium text-text-primary">
                  {request.topic || "General mentorship"}
                </p>
              </div>
              <div>
                <span className="text-xs text-text-secondary">Preferred date</span>
                <p className="text-text-primary">
                  {formatDate(request.preferredDate)}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onView?.(request)}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-semibold text-text-primary"
              >
                <Eye className="h-3.5 w-3.5" />
                View
              </button>
              {request.status === "PENDING" ? (
                <>
                  <button
                    type="button"
                    onClick={() => onAccept?.(request)}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-white"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Accept
                  </button>
                  <button
                    type="button"
                    onClick={() => onReject?.(request)}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-red-200 px-3 py-2 text-xs font-semibold text-red-700"
                  >
                    <X className="h-3.5 w-3.5" />
                    Reject
                  </button>
                </>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
