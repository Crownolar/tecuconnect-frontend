import {
  Check,
  FileText,
  Link2,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";

import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";
import Input from "../../../../components/ui/Input";

const uploadedFiles = [
  { name: "prototype-demo.mp4", size: "4.2 MB" },
  { name: "business-plan.pdf", size: "1.8 MB" },
];

export default function EvidenceUploader({
  onBack,
  onContinue,
}) {
  return (
    <Card
      padding="none"
      className="w-full rounded-xl border-slate-200 bg-white px-4 py-5 shadow-sm sm:rounded-[14px] sm:px-6 sm:py-7 md:px-8 md:py-8 lg:px-9 lg:py-9"
    >
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-bold leading-7 text-slate-900 sm:text-[24px] sm:leading-8">
          Upload Evidence
        </h1>

        <p className="mt-1 text-[14px] leading-5 text-slate-600 sm:text-[16px] sm:leading-6">
          Provide supporting documents, images, or links for verification.
        </p>
      </div>

      <div className="mt-6 flex flex-col sm:mt-7">
        {/* Upload Area */}
        <button
          type="button"
          className="flex min-h-[180px] w-full flex-col items-center justify-center rounded-[10px] border border-dashed border-slate-200 bg-white px-4 py-8 text-center transition hover:border-primary sm:min-h-[220px] md:h-45.25"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-500 sm:h-14 sm:w-14">
            <UploadCloud
              size={23}
              strokeWidth={2}
              className="sm:h-[25px] sm:w-[25px]"
            />
          </span>

          <span className="mt-3 max-w-md text-[14px] font-semibold leading-5 text-slate-800 sm:text-[17px]">
            Drag and drop files here, or click to browse
          </span>

          <span className="mt-1 text-[12px] text-slate-400 sm:text-[14px]">
            PDF, PNG, JPG up to 10MB
          </span>
        </button>

        {/* Uploaded Files */}
        <section className="mt-6 sm:mt-7">
          <h2 className="text-[15px] font-semibold text-slate-800 sm:text-[16px]">
            Uploaded Files
          </h2>

          <div className="mt-3 space-y-3">
            {uploadedFiles.map((file) => (
              <div
                key={file.name}
                className="flex min-w-0 flex-col gap-3 rounded-[9px] border border-slate-200 bg-white px-3 py-3 sm:h-15.5 sm:flex-row sm:items-center sm:justify-between sm:px-4"
              >
                {/* File information */}
                <div className="flex min-w-0 items-center gap-3">
                  <FileText
                    size={21}
                    className="shrink-0 text-blue-500 sm:h-[23px] sm:w-[23px]"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold text-slate-800 sm:text-[15px]">
                      {file.name}
                    </p>

                    <p className="text-[12px] text-slate-400 sm:text-[13px]">
                      {file.size}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 sm:gap-5">
                  <Check
                    size={18}
                    strokeWidth={3}
                    className="text-emerald-500"
                  />

                  <button
                    type="button"
                    aria-label={`Remove ${file.name}`}
                    className="text-red-500 transition hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* External Links */}
        <section className="mt-6 sm:mt-7">
          <h2 className="text-[15px] font-semibold text-slate-800 sm:text-[16px]">
            External Links
          </h2>

          <Input
            type="text"
            placeholder="Paste a link to external evidence (GitHub, portfolio, etc.)"
            className="mt-3 h-11.5 w-full rounded-[9px] border-slate-200 bg-white text-[13px] text-slate-700 placeholder:text-slate-400 sm:text-[15px]"
          />

          {/* Existing Link */}
          <div className="mt-3 flex w-full min-w-0 items-center gap-2 rounded-[9px] border border-slate-200 bg-slate-50 px-3 py-2 text-[12px] text-slate-700 sm:w-fit sm:max-w-full sm:text-[14px]">
            <Link2
              size={17}
              className="shrink-0 text-slate-600"
            />

            <span className="min-w-0 flex-1 break-all sm:flex-none">
              https://github.com/yusuf/prototype-v1
            </span>

            <button
              type="button"
              aria-label="Remove external link"
              className="shrink-0 text-slate-600 transition hover:text-slate-900"
            >
              <X size={16} />
            </button>
          </div>
        </section>

        {/* Actions */}
        <div className="mt-8 flex flex-col-reverse gap-4 border-t border-slate-100 pt-6 sm:mt-9 sm:flex-row sm:items-center sm:justify-between sm:border-0 sm:pt-0">
          <Button
            type="button"
            onClick={onBack}
            variant="ghost"
            className="w-full p-0! text-base font-semibold text-slate-900 transition hover:text-slate-700 sm:w-auto sm:text-lg"
          >
            Back
          </Button>

          <div className="flex w-full flex-col-reverse gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-6">
            <Button
              type="button"
              variant="ghost"
              className="w-full p-0! text-base font-semibold text-slate-900 transition hover:text-slate-700 sm:w-auto sm:text-lg"
            >
              Save Draft
            </Button>

            <Button
              type="button"
              onClick={onContinue}
              className="w-full rounded-[10px] bg-primary px-7 py-3 text-base font-semibold text-white transition hover:bg-primary-dark sm:w-auto sm:text-lg"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}