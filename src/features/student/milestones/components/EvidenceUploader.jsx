import { useRef, useState } from "react";

export default function EvidenceUploader({
  evidence = [],
  onChange,
  onBack,
  onContinue,
}) {
  const safeEvidence = Array.isArray(evidence) ? evidence : [];
  const fileInputRef = useRef(null);

  const [selectedFiles, setSelectedFiles] = useState(
    safeEvidence.filter((item) => item.type === "file"),
  );

  const [link, setLink] = useState("");

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);

    const fileEvidence = files.map((file) => ({
      type: "file",
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      file,
    }));

    const updatedFiles = [...selectedFiles, ...fileEvidence];

    setSelectedFiles(updatedFiles);

    onChange([
      ...updatedFiles,
      ...safeEvidence.filter((item) => item.type === "link"),
    ]);

    event.target.value = "";
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = selectedFiles.filter(
      (_, fileIndex) => fileIndex !== index,
    );

    setSelectedFiles(updatedFiles);

    onChange([
      ...updatedFiles,
      ...safeEvidence.filter((item) => item.type === "link"),
    ]);
  };

  const handleAddLink = () => {
    const trimmedLink = link.trim();

    if (!trimmedLink) {
      return;
    }

    const linkEvidence = {
      type: "link",
      name: trimmedLink,
      url: trimmedLink,
    };

    const updatedEvidence = [
      ...selectedFiles,
      ...safeEvidence.filter((item) => item.type === "link"),
      linkEvidence,
    ];

    onChange(updatedEvidence);
    setLink("");
  };

  const handleContinue = () => {
    const currentEvidence = [
      ...selectedFiles,
      ...safeEvidence.filter((item) => item.type === "link"),
    ];

    onContinue(currentEvidence);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Upload Evidence
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Add files or links that support your milestone claim.
        </p>
      </div>

      <div className="space-y-6">
        {/* File upload */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Supporting files
          </label>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full rounded-xl border-2 border-dashed border-slate-300 px-5 py-8 text-center transition hover:border-slate-400 hover:bg-slate-50"
          >
            <span className="block text-sm font-medium text-slate-700">
              Click to upload files
            </span>

            <span className="mt-1 block text-xs text-slate-500">
              PDF, images, videos, documents, etc.
            </span>
          </button>
        </div>

        {/* Selected files */}
        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">Selected files</p>

            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-800">
                    {file.name}
                  </p>

                  <p className="text-xs text-slate-500">{file.size}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="ml-4 text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* External link */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Supporting link
          </label>

          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="url"
              value={link}
              onChange={(event) => setLink(event.target.value)}
              placeholder="https://..."
              className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
            />

            <button
              type="button"
              onClick={handleAddLink}
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Add link
            </button>
          </div>
        </div>

        {/* Added links */}
        {evidence.filter((item) => item.type === "link").length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">Added links</p>

            {evidence
              .filter((item) => item.type === "link")
              .map((item, index) => (
                <div
                  key={`${item.url}-${index}`}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                >
                  <p className="truncate text-sm text-slate-700">{item.url}</p>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleContinue}
          className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
