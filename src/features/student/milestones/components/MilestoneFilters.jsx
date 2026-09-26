import { useMemo } from "react";

export default function MilestoneFilters({
  milestones = [],
  claims = [],
  categoryFilter = "all",
  statusFilter = "all",
  onCategoryChange,
  onStatusChange,
}) {
  const safeMilestones = Array.isArray(milestones) ? milestones : [];
  const safeClaims = Array.isArray(claims) ? claims : [];

  const categories = useMemo(() => {
    return [
      ...new Set(
        safeMilestones
          .map((milestone) => milestone.category)
          .filter(Boolean),
      ),
    ];
  }, [safeMilestones]);

  const filteredMilestones = useMemo(() => {
    return safeMilestones.filter((milestone) => {
      const categoryMatch =
        categoryFilter === "all" ||
        milestone.category === categoryFilter;

      if (!categoryMatch) {
        return false;
      }

      if (statusFilter === "all") {
        return true;
      }

      const claim = safeClaims.find(
        (item) =>
          item.milestone === milestone.milestone ||
          item.milestoneId === milestone.id,
      );

      return claim?.status === statusFilter;
    });
  }, [safeMilestones, safeClaims, categoryFilter, statusFilter]);

  return (
    <section className="mt-6 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <select
          value={categoryFilter}
          onChange={(event) => onCategoryChange?.(event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-[#0A3B25] sm:w-auto"
        >
          <option value="all">All Categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
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
          <option value="PENDING_REVIEW">Pending Review</option>
          <option value="CHANGES_REQUESTED">Needs Changes</option>
        </select>
      </div>

      <div className="space-y-3">
        {filteredMilestones.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
            <p className="text-sm text-slate-500">
              No milestones match your filters.
            </p>
          </div>
        ) : (
          filteredMilestones.map((milestone) => (
            <div
              key={milestone.id || milestone.milestone}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <p className="text-xs font-medium text-slate-500">
                {milestone.category}
              </p>

              <h3 className="mt-1 font-semibold text-slate-900">
                {milestone.milestone}
              </h3>

              {milestone.description && (
                <p className="mt-1 text-sm text-slate-500">
                  {milestone.description}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}