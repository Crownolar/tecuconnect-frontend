import { useState } from "react";

const RequestMentorshipModal = ({
  mentor,
  onClose,
  onSubmit,
  isSubmitting = false,
}) => {
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [preferredDate, setPreferredDate] = useState("");

  if (!mentor) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      mentorId: mentor.id,
      topic: topic.trim(),
      notes: notes.trim(),
      preferredDate: new Date(preferredDate).toISOString(),
    };

    await onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl border border-border bg-white p-5 shadow-xl">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-text-primary">
            Request Mentorship
          </h2>

          <p className="mt-1 text-sm text-text-secondary">
            Send a mentorship request to {mentor.name}.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Topic */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-text-primary">
              Topic
            </label>

            <input
              type="text"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              placeholder="e.g. Business validation"
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none transition focus:border-primary"
              required
            />
          </div>

          {/* Notes */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-text-primary">
              Notes
            </label>

            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
              placeholder="Briefly tell the mentor what you would like help with..."
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none transition focus:border-primary"
              required
            />
          </div>

          {/* Preferred Date */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-text-primary">
              Preferred Date
            </label>

            <input
              type="datetime-local"
              value={preferredDate}
              onChange={(event) => setPreferredDate(event.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none transition focus:border-primary"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="w-full rounded-md border border-border px-3 py-2 text-xs font-semibold text-text-secondary transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md border border-primary px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestMentorshipModal;