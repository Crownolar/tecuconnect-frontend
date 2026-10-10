import { useState } from "react";

export default function EvidenceUploader({
  evidence = [],
  onChange,
  onBack,
  onContinue,
  isSubmitting = false,
}) {
  const safeEvidence = Array.isArray(evidence) ? evidence : [];

  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const links = safeEvidence.filter((item) => item.type === "link");

  const handleAddLink = () => {
    const trimmedLink = link.trim();
    const trimmedDescription = description.trim();

    if (!trimmedLink) {
      setError("Enter an evidence URL.");
      return;
    }

    try {
      const parsedUrl = new URL(trimmedLink);

      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        setError("Enter a valid HTTP or HTTPS evidence URL.");
        return;
      }
    } catch {
      setError("Enter a valid evidence URL.");
      return;
    }

    if (!trimmedDescription) {
      setError("Describe what this evidence proves or contains.");
      return;
    }

    setError("");

    const evidenceItem = {
      type: "link",
      name: trimmedLink,
      url: trimmedLink,
      fileUrl: trimmedLink,
      fileType: "link",
      description: trimmedDescription,
    };

    // Resubmission replaces the previous evidence draft rather than adding
    // multiple candidates. The backend must also implement replacement for
    // this to replace persisted evidence.
    const updatedEvidence = [evidenceItem];

    onChange?.(updatedEvidence);

    setLink("");
    setDescription("");
  };

  const handleRemoveLink = (index) => {
    const updatedEvidence = links.filter((_, itemIndex) => itemIndex !== index);

    onChange?.(updatedEvidence);
  };

  const handleContinue = () => {
    setError("");

    if (links.length === 0) {
      setError("Add one evidence link before continuing.");
      return;
    }
    onContinue?.(links);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Add Evidence</h2>

        <p className="mt-1 text-sm text-slate-500">
          Add a publicly accessible link to evidence supporting your milestone.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Evidence URL */}
        <div>
          <label
            htmlFor="evidence-url"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Evidence URL
          </label>

          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              id="evidence-url"
              type="url"
              value={link}
              disabled={isSubmitting}
              onChange={(event) => {
                setLink(event.target.value);
                setError("");
              }}
              placeholder="https://..."
              className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
            />

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleAddLink}
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Add evidence
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-500">
            Example: a publicly accessible Google Drive, OneDrive, GitHub, or
            other evidence link.
          </p>
        </div>

        {/* Evidence description */}
        <div>
          <label
            htmlFor="evidence-description"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Evidence Description
          </label>

          <textarea
            id="evidence-description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
              setError("");
            }}
            placeholder="Describe what this evidence proves or contains..."
            rows={4}
            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
          />

          <p className="mt-2 text-xs text-slate-500">
            Briefly explain how this evidence supports your milestone claim.
          </p>
        </div>

        {/* Added evidence */}
        {links.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-700">Added evidence</p>

            {links.map((item, index) => (
              <div
                key={`${item.url}-${index}`}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="break-all text-sm font-medium text-slate-700">
                      {item.url}
                    </p>

                    {item.description && (
                      <p className="mt-2 text-sm leading-5 text-slate-600">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleRemoveLink(index)}
                    className="shrink-0 text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Storage notice */}
        <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
          <p className="text-xs leading-5 text-blue-700">
            Evidence is currently submitted using an accessible web link. File
            uploads will be enabled when a project file-storage service is
            available.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleContinue}
          disabled={isSubmitting || links.length === 0}
          className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Submitting…" : "Continue"}
        </button>
      </div>
    </div>
  );
}
