import { X } from "lucide-react";

const formatDate = (value) => {
  if (!value) return "No date proposed";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Invalid date";
  return date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
};

export default function RequestDetailModal({ request, onClose }) {
  if (!request) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-border p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Mentorship Request
            </p>
            <h2 className="mt-1 text-lg font-semibold text-text-primary">
              {request.studentName}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-text-secondary hover:bg-slate-100"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Info label="Topic" value={request.topic || "General mentorship"} />
            <Info label="Status" value={request.status || "—"} />
            <Info
              label="Preferred date"
              value={formatDate(request.preferredDate)}
            />
            <Info
              label="Student"
              value={
                request.student?.matricNumber ||
                request.student?.email ||
                "—"
              }
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
              Student message
            </p>
            <div className="mt-2 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-text-primary">
              {request.notes || "No additional message provided."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-text-primary">{value}</p>
    </div>
  );
}
