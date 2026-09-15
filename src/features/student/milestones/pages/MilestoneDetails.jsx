import { CalendarDays, ChevronDown } from "lucide-react";

import Button from "../../../../components/ui/Button";

const categoryOptions = [
  "Innovation & Product",
  "Business & Strategy",
  "Funding",
  "Leadership",
];

const milestoneOptions = [
  "Built Functional Prototype",
  "Validated Customer Need",
  "Launched First Version",
  "Secured Funding",
];

function SelectField({ label, value, options }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-800 sm:text-base">
        {label}
      </span>

      <span className="relative block">
        <select
          defaultValue={value}
          className="h-12 w-full appearance-none rounded-[10px] border border-slate-200 bg-white px-3 pr-11 text-sm text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 sm:h-13.25 sm:px-4 sm:text-lg"
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>

        <ChevronDown
          aria-hidden="true"
          size={19}
          strokeWidth={2.5}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 sm:right-4"
        />
      </span>
    </label>
  );
}

export default function MilestoneDetails({ onContinue }) {
  return (
    <section className="w-full rounded-xl border border-slate-200 bg-white px-4 py-5 shadow-sm sm:rounded-[14px] sm:px-6 sm:py-7 md:px-8 md:py-8 lg:px-10 lg:py-10">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-bold leading-7 text-slate-900 sm:text-[24px] md:text-[28px] md:leading-8">
          Milestone Details
        </h1>

        <p className="mt-1 text-[14px] leading-5 text-slate-600 sm:text-[16px] sm:leading-6 md:text-[19px] md:leading-7">
          Tell us about your achievement.
        </p>
      </div>

      <form
        className="mt-6 flex flex-col sm:mt-8"
        onSubmit={(event) => {
          event.preventDefault();
          onContinue?.();
        }}
      >
        <div className="space-y-5 sm:space-y-6">
          <SelectField
            label="Category"
            value="Innovation & Product"
            options={categoryOptions}
          />

          <SelectField
            label="Milestone"
            value="Built Functional Prototype"
            options={milestoneOptions}
          />

          {/* Description */}
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-800 sm:text-base">
              Achievement Description
            </span>

            <textarea
              rows={5}
              placeholder="Describe what you accomplished, the skills you applied, and the impact of this milestone..."
              className="min-h-[130px] w-full resize-none rounded-[10px] border border-slate-200 bg-white px-3 py-3 text-sm leading-6 text-slate-700 outline-none placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10 sm:h-32.75 sm:px-4 sm:text-lg sm:leading-7"
            />
          </label>

          {/* Date */}
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-800 sm:text-base">
              Date of Achievement
            </span>

            <span className="relative block w-full max-w-xl">
              <input
                type="text"
                defaultValue="August 28, 2026"
                className="h-12 w-full rounded-[10px] border border-slate-200 bg-white px-3 pr-11 text-sm text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 sm:h-13.25 sm:px-4 sm:text-lg"
              />

              <CalendarDays
                aria-hidden="true"
                size={19}
                strokeWidth={2.5}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 sm:right-4"
              />
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col-reverse gap-4 border-t border-slate-100 pt-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:border-0 sm:pt-0">
          <Button
            type="button"
            variant="ghost"
            className="w-full p-0! text-base font-semibold text-slate-900 transition hover:text-slate-700 sm:w-auto sm:text-lg"
          >
            Save Draft
          </Button>

          <Button
            type="submit"
            className="w-full rounded-[10px] bg-primary px-8 py-3 text-base font-semibold text-white transition hover:bg-primary-dark sm:w-auto sm:text-lg"
          >
            Continue
          </Button>
        </div>
      </form>
    </section>
  );
}