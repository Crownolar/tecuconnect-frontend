import { useState } from "react";

import MilestoneCard from "./MilestoneCard";

const tabs = [
  { label: "All", value: "all" },
  { label: "Verified", value: "verified" },
  { label: "Pending", value: "pending" },
  { label: "Needs Changes", value: "needs_changes" },
];

export default function MilestoneFilters({ milestones }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredMilestones =
    activeFilter === "all"
      ? milestones
      : milestones.filter(
          (milestone) => milestone.status === activeFilter
        );

  return (
    <div className="w-full min-w-0">
      {/* Filter Tabs */}
      <div className="mt-4 w-full overflow-x-auto border-b border-[#dbe3ea] pb-0">
        <div className="flex min-w-max items-center gap-6 text-[13px] sm:gap-9 sm:text-[15px]">
          {tabs.map((tab) => {
            const isActive = activeFilter === tab.value;

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveFilter(tab.value)}
                className={`shrink-0 rounded-none pb-2 transition ${
                  isActive
                    ? "border-b-2 border-[#0a3b25] font-bold text-[#0a3b25]"
                    : "font-medium text-[#475569] hover:text-[#0a3b25]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards */}
      <section className="mt-5 grid min-w-0 grid-cols-1 gap-4 sm:mt-6 sm:gap-5 xl:grid-cols-2 xl:gap-[23.745px]">
        {filteredMilestones.map((milestone) => (
          <MilestoneCard
            key={milestone.id}
            {...milestone}
          />
        ))}
      </section>

      {/* Empty State */}
      {filteredMilestones.length === 0 && (
        <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-white px-4 py-10 text-center">
          <p className="text-sm font-medium text-slate-600">
            No milestones found.
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Try selecting another filter.
          </p>
        </div>
      )}
    </div>
  );
}