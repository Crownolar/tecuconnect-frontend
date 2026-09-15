import { Check, FileText, Link2, Trash2, UploadCloud, X } from "lucide-react";

import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";
import Input from "../../../../components/ui/Input";

const uploadedFiles = [
  { name: "prototype-demo.mp4", size: "4.2 MB" },
  { name: "business-plan.pdf", size: "1.8 MB" },
];

export default function EvidenceUploader({ onBack, onContinue }) {
  return (
    <Card
      padding="none"
      className="min-h-191.5 rounded-[14px] border-slate-200 bg-white px-9 py-9 shadow-sm"
    >
      <div>
        <h1 className="text-[24px] font-bold leading-8 text-slate-900">
          Upload Evidence
        </h1>
        <p className="mt-1 text-[16px] leading-6 text-slate-600">
          Provide supporting documents, images, or links for verification.
        </p>
      </div>

      <div className="mt-7 flex min-h-152 flex-col">
        <button
          type="button"
          className="flex h-45.25 flex-col items-center justify-center rounded-[10px] border border-dashed border-slate-200 bg-white text-center transition hover:border-primary"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-500">
            <UploadCloud size={25} strokeWidth={2} />
          </span>
          <span className="mt-3 text-[17px] font-semibold text-slate-800">
            Drag and drop files here, or click to browse
          </span>
          <span className="mt-1 text-[14px] text-slate-400">
            PDF, PNG, JPG up to 10MB
          </span>
        </button>

        <section className="mt-7">
          <h2 className="text-[16px] font-semibold text-slate-800">
            Uploaded Files
          </h2>

          <div className="mt-3 space-y-3">
            {uploadedFiles.map((file) => (
              <div
                key={file.name}
                className="flex h-15.5 items-center justify-between rounded-[9px] border border-slate-200 bg-white px-4"
              >
                <div className="flex items-center gap-3">
                  <FileText size={23} className="text-blue-500" />
                  <div>
                    <p className="text-[15px] font-semibold text-slate-800">
                      {file.name}
                    </p>
                    <p className="text-[13px] text-slate-400">{file.size}</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
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

        <section className="mt-7">
          <h2 className="text-[16px] font-semibold text-slate-800">
            External Links
          </h2>

          <Input
            type="text"
            placeholder="Paste a link to external evidence (GitHub, portfolio, etc.)"
            className="mt-3 h-11.5 rounded-[9px] border-slate-200 bg-white text-[15px] text-slate-700 placeholder:text-slate-400"
          />

          <div className="mt-3 inline-flex items-center gap-2 rounded-[9px] border border-slate-200 bg-slate-50 px-3 py-2 text-[14px] text-slate-700">
            <Link2 size={17} className="text-slate-600" />
            <span>https://github.com/yusuf/prototype-v1</span>
            <button
              type="button"
              aria-label="Remove external link"
              className="text-slate-600 transition hover:text-slate-900"
            >
              <X size={16} />
            </button>
          </div>
        </section>

        <div className="mt-auto flex items-center justify-between pt-9">
          <Button
            type="button"
            onClick={onBack}
            variant="ghost"
            className="p-0! text-lg font-semibold text-slate-900 transition hover:text-slate-700"
          >
            Back
          </Button>

          <div className="flex items-center gap-6">
            <Button
              type="button"
              variant="ghost"
              className="p-0! text-lg font-semibold text-slate-900 transition hover:text-slate-700"
            >
              Save Draft
            </Button>
            <Button
              type="button"
              onClick={onContinue}
              className="rounded-[10px] bg-primary px-7 py-3 text-lg font-semibold text-white transition hover:bg-primary-dark"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
