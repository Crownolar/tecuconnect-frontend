import { useEffect, useState } from "react";
import { CalendarDays, X } from "lucide-react";

const toLocalInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export default function RequestDecisionModal({
  request,
  mode,
  isSubmitting,
  error,
  onClose,
  onSubmit,
}) {
  const [preferredDate, setPreferredDate] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    setPreferredDate(toLocalInput(request?.preferredDate));
    setNote("");
  }, [request, mode]);

  if (!request || !mode) return null;

  const isAccept = mode === "accept";

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit?.({
      status: isAccept ? "ACCEPTED" : "DECLINED",
      preferredDate:
        isAccept && preferredDate
          ? new Date(preferredDate).toISOString()
          : undefined,
      responseNote: note.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white shadow-xl"
      >
        <div className="flex items-start justify-between border-b border-border p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              {isAccept ? "Accept Request" : "Reject Request"}
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

        <div className="space-y-4 p-5">
          {isAccept ? (
            <label className="block">
              <span className="text-sm font-medium text-text-primary">
                Session date and time
              </span>
              <span className="mt-1 flex items-center gap-2 rounded-md border border-border px-3 py-2 focus-within:border-primary">
                <CalendarDays className="h-4 w-4 text-text-secondary" />
                <input
                  type="datetime-local"
                  value={preferredDate}
                  onChange={(event) => setPreferredDate(event.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                  required
                />
              </span>
              <span className="mt-1 block text-xs text-text-secondary">
                Accepting the request with a date schedules the mentorship
                session.
              </span>
            </label>
          ) : null}

          <label className="block">
            <span className="text-sm font-medium text-text-primary">
              {isAccept ? "Message to student" : "Reason"}
            </span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={4}
              placeholder={
                isAccept
                  ? "Optional guidance before the session..."
                  : "Explain why you cannot accept this request..."
              }
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm outline-none focus:border-primary"
              required={!isAccept}
            />
          </label>
        </div>

        <div className="flex justify-end gap-2 border-t border-border p-5">
          {error ? (
            <div className="mx-5 mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-md border border-border px-3 py-2 text-sm font-semibold text-text-primary hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`rounded-md px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 ${
              isAccept
                ? "bg-primary hover:opacity-90"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isSubmitting
              ? "Saving..."
              : isAccept
                ? "Accept & Schedule"
                : "Reject Request"}
          </button>
        </div>
      </form>
    </div>
  );
}
