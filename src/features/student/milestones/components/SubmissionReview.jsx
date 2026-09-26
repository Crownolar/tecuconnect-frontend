import { useState } from "react";

export default function SubmissionReview({
  milestoneDetails,
  evidence = [],
  onBack,
  onSubmit,
  isSubmitting = false,
}) {
  const [error, setError] = useState("");

  const safeEvidence = Array.isArray(evidence) ? evidence : [];

  const handleSubmit = async () => {
    setError("");

    try {
      await onSubmit();
    } catch (err) {
      setError(err?.message || "Unable to submit your milestone claim.");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Review Submission
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Review your milestone claim and evidence before submitting it.
        </p>
      </div>

      {/* Milestone details */}
      <div className="space-y-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Category
          </p>

          <p className="mt-1 text-sm font-medium text-slate-900">
            {milestoneDetails?.category || "Not provided"}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Milestone
          </p>

          <p className="mt-1 text-sm font-medium text-slate-900">
            {milestoneDetails?.milestone || "Not provided"}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Description
          </p>

          <p className="mt-1 text-sm text-slate-700">
            {milestoneDetails?.description || "No description provided."}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Achievement Date
          </p>

          <p className="mt-1 text-sm text-slate-700">
            {milestoneDetails?.achievementDate || "Not provided"}
          </p>
        </div>
      </div>

      {/* Evidence */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-slate-900">Evidence</h3>

        {safeEvidence.length === 0 ? (
          <div className="mt-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">
              No evidence has been added.
            </p>
          </div>
        ) : (
          <div className="mt-3 space-y-2">
            {safeEvidence.map((item, index) => (
              <div
                key={`${item.name || item.url}-${index}`}
                className="rounded-xl border border-slate-200 bg-slate-50 p-3"
              >
                {item.type === "file" ? (
                  <>
                    <p className="text-sm font-medium text-slate-800">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">{item.size}</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-slate-800">
                      External link
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {item.url}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Claim"}
        </button>
      </div>
    </div>
  );
}
