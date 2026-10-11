import { CalendarDays } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import Button from "../../../../components/ui/Button";
import { useMilestoneCategories } from "../hooks";

export default function MilestoneDetails({ onContinue }) {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [occurredAt, setOccurredAt] = useState("");
  const [error, setError] = useState("");

  const {
    data,
    isLoading,
    isError,
    error: categoriesError,
  } = useMilestoneCategories();

  const categories = useMemo(() => {
    return Array.isArray(data?.categories) ? data.categories : [];
  }, [data]);

  const mapping = data?.mapping || {};

  const milestoneTypes = useMemo(() => {
    return Object.entries(mapping)
      .filter(([, mappedCategory]) => mappedCategory === category)
      .map(([type]) => type);
  }, [mapping, category]);

  const [milestoneType, setMilestoneType] = useState("");

  useEffect(() => {
    setMilestoneType("");
  }, [category]);

  useEffect(() => {
    if (!milestoneType && milestoneTypes.length === 1) {
      setMilestoneType(milestoneTypes[0]);
    }
  }, [milestoneType, milestoneTypes]);

  useEffect(() => {
    if (!category && categories.length === 1) {
      setCategory(categories[0]);
    }
  }, [category, categories]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (
      !category ||
      !milestoneType ||
      !title.trim() ||
      !description.trim() ||
      !occurredAt
    ) {
      setError("Complete all milestone details before continuing.");
      return;
    }

    onContinue?.({
      type: milestoneType,
      title: title.trim(),
      description: description.trim(),
      occurredAt: new Date(`${occurredAt}T00:00:00`).toISOString(),
      category,
    });
  };

  return (
    <section className="w-full rounded-xl border border-slate-200 bg-white px-4 py-5 shadow-sm sm:rounded-[14px] sm:px-6 sm:py-7 md:px-8 md:py-8 lg:px-10 lg:py-10">
      <div>
        <h1 className="text-[22px] font-bold leading-7 text-slate-900 sm:text-[24px] md:text-[28px] md:leading-8">
          Milestone Details
        </h1>
        <p className="mt-1 text-[14px] leading-5 text-slate-600 sm:text-[16px] sm:leading-6 md:text-[19px] md:leading-7">
          Tell us about your achievement.
        </p>
      </div>

      {isError && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {categoriesError?.message || "Unable to load milestone categories."}
        </div>
      )}

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form className="mt-6 flex flex-col sm:mt-8" onSubmit={handleSubmit}>
        <div className="space-y-5 sm:space-y-6">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-800 sm:text-base">
              Category
            </span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              disabled={isLoading || categories.length === 0}
              className="h-12 w-full rounded-[10px] border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-slate-50 sm:h-13.25 sm:px-4 sm:text-lg"
            >
              <option value="">
                {isLoading ? "Loading categories..." : "Select Category"}
              </option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item.replaceAll("_", " ")}
                </option>
              ))}
            </select>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800 sm:text-base">
                Milestone Type
              </span>

              <select
                value={milestoneType}
                onChange={(event) => setMilestoneType(event.target.value)}
                disabled={!category || milestoneTypes.length === 0}
                className="h-12 w-full rounded-[10px] border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-slate-50 sm:h-13.25 sm:px-4 sm:text-lg"
              >
                <option value="">
                  {!category
                    ? "Select a category first"
                    : milestoneTypes.length === 0
                      ? "No milestone types available"
                      : "Select Milestone Type"}
                </option>

                {milestoneTypes.map((type) => (
                  <option key={type} value={type}>
                    {type
                      .replaceAll("_", " ")
                      .toLowerCase()
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </option>
                ))}
              </select>
            </label>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-800 sm:text-base">
              Milestone Title
            </span>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Built a functional prototype"
              className="h-12 w-full rounded-[10px] border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10 sm:h-13.25 sm:px-4 sm:text-lg"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-800 sm:text-base">
              Achievement Description
            </span>
            <textarea
              rows={5}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe what you accomplished, the skills you applied, and the impact of this milestone..."
              className="min-h-[130px] w-full resize-none rounded-[10px] border border-slate-200 bg-white px-3 py-3 text-sm leading-6 text-slate-700 outline-none placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10 sm:h-32.75 sm:px-4 sm:text-lg sm:leading-7"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-800 sm:text-base">
              Date of Achievement
            </span>
            <span className="relative block w-full max-w-xl">
              <input
                type="date"
                value={occurredAt}
                onChange={(event) => setOccurredAt(event.target.value)}
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

        <div className="mt-8 flex flex-col-reverse gap-4 border-t border-slate-100 pt-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-end sm:border-0 sm:pt-0">
          <Button
            type="submit"
            disabled={isLoading || categories.length === 0}
            className="w-full rounded-[10px] bg-primary px-8 py-3 text-base font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:text-lg"
          >
            Continue
          </Button>
        </div>
      </form>
    </section>
  );
}
