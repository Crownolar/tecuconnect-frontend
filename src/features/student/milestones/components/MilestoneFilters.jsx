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
      : milestones.filter((milestone) => milestone.status === activeFilter);

  return (
    <div>
      <div className="mt-4 flex flex-wrap items-center gap-9 border-b border-[#dbe3ea] pb-2 text-[15px]">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveFilter(tab.value)}
            className={
              activeFilter === tab.value
                ? "rounded-none border-b-2 border-[#0a3b25] pb-2 font-bold text-[#0a3b25]"
                : "pb-2 font-medium text-[#475569]"
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredMilestones.map((milestone) => (
          <MilestoneCard key={milestone.id} {...milestone} />
        ))}
      </section>
    </div>
  );
}
