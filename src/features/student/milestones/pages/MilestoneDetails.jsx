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
      <span className="mb-2 block text-base font-semibold text-slate-800">
        {label}
      </span>
      <span className="relative block">
        <select
          defaultValue={value}
          className="h-13.25 w-full appearance-none rounded-[10px] border border-slate-200 bg-white px-4 pr-12 text-lg text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          size={21}
          strokeWidth={2.5}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-600"
        />
      </span>
    </label>
  );
}

export default function MilestoneDetails({ onContinue }) {
  return (
    <section className="min-h-191.5 rounded-[14px] border border-slate-200 bg-white px-10 py-10 shadow-sm">
      <div>
        <h1 className="text-[28px] font-bold leading-8 text-slate-900">
          Milestone Details
        </h1>
        <p className="mt-1 text-[19px] leading-7 text-slate-600">
          Tell us about your achievement.
        </p>
      </div>

      <form
        className="mt-8 flex min-h-152 flex-col"
        onSubmit={(event) => {
          event.preventDefault();
          onContinue?.();
        }}
      >
        <div className="space-y-6">
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

          <label className="block">
            <span className="mb-2 block text-base font-semibold text-slate-800">
              Achievement Description
            </span>
            <textarea
              rows={4}
              placeholder="Describe what you accomplished, the skills you applied, and the impact of this milestone..."
              className="h-32.75 w-full resize-none rounded-[10px] border border-slate-200 bg-white px-4 py-3 text-lg leading-7 text-slate-700 outline-none placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-base font-semibold text-slate-800">
              Date of Achievement
            </span>
            <span className="relative block max-w-xl">
              <input
                type="text"
                defaultValue="August 28, 2026"
                className="h-13.25 w-full rounded-[10px] border border-slate-200 bg-white px-4 pr-12 text-lg text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
              <CalendarDays
                aria-hidden="true"
                size={21}
                strokeWidth={2.5}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-600"
              />
            </span>
          </label>
        </div>

        <div className="mt-auto flex items-center justify-between pt-10">
          <Button
            type="button"
            variant="ghost"
            className="p-0! text-lg font-semibold text-slate-900 transition hover:text-slate-700"
          >
            Save Draft
          </Button>

          <Button
            type="submit"
            className="rounded-[10px] bg-primary px-8 py-3 text-lg font-semibold text-white transition hover:bg-primary-dark"
          >
            Continue
          </Button>
        </div>
      </form>
    </section>
  );
}
