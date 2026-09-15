import { Info } from "lucide-react";

import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";

export default function SubmissionReview({ onBack }) {
  return (
    <Card
      padding="none"
      className="w-full rounded-xl border-slate-200 bg-white px-4 py-5 shadow-sm sm:rounded-[14px] sm:px-6 sm:py-7 md:px-8 md:py-8 lg:px-9 lg:py-9"
    >
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-bold leading-7 text-slate-900 sm:text-[24px] sm:leading-8">
          Review Your Submission
        </h1>

        <p className="mt-1 text-[14px] leading-5 text-slate-600 sm:text-[16px] sm:leading-6">
          Please review all details before submitting for verification.
        </p>
      </div>

      <div className="mt-6 sm:mt-7">
        {/* Milestone Details */}
        <section>
          <h2 className="text-[15px] font-bold text-slate-800 sm:text-[16px]">
            Milestone Details
          </h2>

          <div className="mt-3 rounded-[9px] border border-slate-200 bg-slate-50 px-3 py-4 sm:px-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase text-slate-400 sm:text-[13px]">
                  Category
                </p>

                <p className="mt-1 break-words text-[14px] font-bold text-slate-800 sm:text-[16px]">
                  Innovation &amp; Product
                </p>
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase text-slate-400 sm:text-[13px]">
                  Milestone
                </p>

                <p className="mt-1 break-words text-[14px] font-bold text-slate-800 sm:text-[16px]">
                  Built Functional Prototype
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-[11px] font-semibold uppercase text-slate-400 sm:text-[13px]">
                Description
              </p>

              <p className="mt-1 text-[13px] leading-6 text-slate-600 sm:text-[15px]">
                Developed a working prototype of an IoT-based agricultural
                monitoring system. Applied design thinking and lean startup
                methodology to iterate on the solution based on user
                feedback from local farmers.
              </p>
            </div>

            <div className="mt-4">
              <p className="text-[11px] font-semibold uppercase text-slate-400 sm:text-[13px]">
                Date of Achievement
              </p>

              <p className="mt-1 text-[14px] text-slate-800 sm:text-[16px]">
                August 28, 2026
              </p>
            </div>
          </div>
        </section>

        {/* Evidence */}
        <section className="mt-5">
          <h2 className="text-[15px] font-bold text-slate-800 sm:text-[16px]">
            Evidence
          </h2>

          <div className="mt-3 rounded-[9px] border border-slate-200 bg-slate-50 px-3 py-4 sm:px-4">
            <p className="text-[11px] font-semibold uppercase text-slate-400 sm:text-[13px]">
              Files
            </p>

            <ul className="mt-1 space-y-1 text-[13px] text-slate-800 sm:text-[15px]">
              <li className="break-words">
                • prototype-demo.mp4 (4.2 MB)
              </li>

              <li className="break-words">
                • business-plan.pdf (1.8 MB)
              </li>
            </ul>

            <p className="mt-4 text-[11px] font-semibold uppercase text-slate-400 sm:text-[13px]">
              Links
            </p>

            <p className="mt-1 break-all text-[13px] text-blue-500 sm:text-[15px]">
              https://github.com/yusuf/prototype-v1
            </p>
          </div>
        </section>

        {/* Information */}
        <div className="mt-5 flex items-start gap-3 rounded-[9px] border-l-4 border-blue-500 bg-blue-50 px-3 py-3 text-[13px] leading-5 text-blue-500 sm:px-4 sm:py-4 sm:text-[15px]">
          <Info
            size={19}
            className="mt-0.5 shrink-0 sm:h-[21px] sm:w-[21px]"
          />

          <p className="min-w-0">
            Your submission will be reviewed by a TEC assessor. You will be
            notified once verification is complete.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col-reverse gap-4 border-t border-slate-100 pt-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:border-0 sm:pt-0">
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
            className="w-full rounded-[10px] bg-primary px-7 py-3 text-base font-semibold text-white transition hover:bg-primary-dark sm:w-auto sm:text-lg"
          >
            Submit for Verification
          </Button>
        </div>
      </div>
    </Card>
  );
}