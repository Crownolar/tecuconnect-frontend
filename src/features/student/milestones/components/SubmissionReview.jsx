import { Info } from "lucide-react";

import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";

export default function SubmissionReview({ onBack }) {
  return (
    <Card
      padding="none"
      className="min-h-191.5 rounded-[14px] border-slate-200 bg-white px-9 py-9 shadow-sm"
    >
      <div>
        <h1 className="text-[24px] font-bold leading-8 text-slate-900">
          Review Your Submission
        </h1>
        <p className="mt-1 text-[16px] leading-6 text-slate-600">
          Please review all details before submitting for verification.
        </p>
      </div>

      <div className="mt-7">
        <section>
          <h2 className="text-[16px] font-bold text-slate-800">
            Milestone Details
          </h2>

          <div className="mt-3 rounded-[9px] border border-slate-200 bg-slate-50 px-4 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-[13px] font-semibold uppercase text-slate-400">
                  Category
                </p>
                <p className="mt-1 text-[16px] font-bold text-slate-800">
                  Innovation &amp; Product
                </p>
              </div>

              <div>
                <p className="text-[13px] font-semibold uppercase text-slate-400">
                  Milestone
                </p>
                <p className="mt-1 text-[16px] font-bold text-slate-800">
                  Built Functional Prototype
                </p>
              </div>
            </div>

            <div className="mt-3">
              <p className="text-[13px] font-semibold uppercase text-slate-400">
                Description
              </p>
              <p className="mt-1 text-[15px] leading-6 text-slate-600">
                Developed a working prototype of an IoT-based agricultural
                monitoring system. Applied design thinking and lean startup
                methodology to iterate on the solution based on user feedback
                from local farmers.
              </p>
            </div>

            <div className="mt-3">
              <p className="text-[13px] font-semibold uppercase text-slate-400">
                Date of Achievement
              </p>
              <p className="mt-1 text-[16px] text-slate-800">August 28, 2026</p>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <h2 className="text-[16px] font-bold text-slate-800">Evidence</h2>

          <div className="mt-3 rounded-[9px] border border-slate-200 bg-slate-50 px-4 py-4">
            <p className="text-[13px] font-semibold uppercase text-slate-400">
              Files
            </p>
            <ul className="mt-1 space-y-1 text-[15px] text-slate-800">
              <li>• prototype-demo.mp4 (4.2 MB)</li>
              <li>• business-plan.pdf (1.8 MB)</li>
            </ul>

            <p className="mt-3 text-[13px] font-semibold uppercase text-slate-400">
              Links
            </p>
            <p className="mt-1 text-[15px] text-blue-500">
              https://github.com/yusuf/prototype-v1
            </p>
          </div>
        </section>

        <div className="mt-6 flex items-center gap-3 rounded-[9px] border-l-4 border-blue-500 bg-blue-50 px-4 py-4 text-[15px] text-blue-500">
          <Info size={21} className="shrink-0" />
          <p>
            Your submission will be reviewed by a TEC assessor. You will be
            notified once verification is complete.
          </p>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between">
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
            className="rounded-[10px] bg-primary px-7 py-3 text-lg font-semibold text-white transition hover:bg-primary-dark"
          >
            Submit for Verification
          </Button>
        </div>
      </div>
    </Card>
  );
}
