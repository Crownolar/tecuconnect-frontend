import { useMemo } from "react";

export default function MilestoneFilters({
  claims = [],
  categoryFilter = "all",
  statusFilter = "all",
  onCategoryChange,
  onStatusChange,
}) {
  const safeClaims = Array.isArray(claims) ? claims : [];

  const categories = useMemo(
    () => [...new Set(safeClaims.map((claim) => claim.category).filter(Boolean))],
    [safeClaims],
  );

  return (
    <section className="mt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <select
          value={categoryFilter}
          onChange={(event) => onCategoryChange?.(event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#0A3B25] sm:w-auto"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {String(category).replaceAll("_", " ")}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(event) => onStatusChange?.(event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#0A3B25] sm:w-auto"
        >
          <option value="all">All Statuses</option>
          <option value="VERIFIED">Verified</option>
          <option value="PENDING">Pending Review</option>
          <option value="REJECTED">Changes Requested</option>
          <option value="FLAGGED_FOR_REVIEW">Staff Review</option>
        </select>
      </div>
    </section>
  );
}
