import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../../../../components/ui/Button";
import MilestoneFilters from "../components/MilestoneFilters";
import { milestones } from "../../../../mocks/milestones";

export default function Milestones() {
  const navigate = useNavigate();
  const totalMilestones = milestones.length;
  const verifiedCount = milestones.filter(
    (milestone) => milestone.status === "verified",
  ).length;
  const pendingCount = milestones.filter(
    (milestone) => milestone.status === "pending",
  ).length;
  const needsChangesCount = milestones.filter(
    (milestone) => milestone.status === "needs_changes",
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Page Header */}
      <div className="space-y-7">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">My Milestones</h1>

            <p className="mt-1 text-sm text-slate-500">
              Track and manage your entrepreneurial achievements.
            </p>
          </div>

          <Button
            type="button"
            onClick={() => navigate("/student/milestones/claim")}
            className="inline-flex items-center gap-2 rounded-lg bg-[#0a3b25] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#082f20]"
          >
            <Plus size={18} />
            Claim Milestone
          </Button>
        </div>

        {/* Milestone Summary and Tabs */}
        <div>
          <div className="flex flex-wrap items-center gap-12 text-[13px] font-medium text-[#475569]">
            <div className="flex items-center gap-2 text-[#0f172a]">
              <span className="font-bold">Total Milestones:</span>
              <span className="font-bold text-[#0a3b25]">
                {totalMilestones}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[#475569]">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#10b981]" />
              <span>Verified:</span>
              <span className="font-semibold text-[#10b981]">
                {verifiedCount}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[#475569]">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#f59e0b]" />
              <span>Pending:</span>
              <span className="font-semibold text-[#f59e0b]">
                {pendingCount}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[#475569]">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#ef4444]" />
              <span>Needs Changes:</span>
              <span className="font-semibold text-[#ef4444]">
                {needsChangesCount}
              </span>
            </div>
          </div>

          <MilestoneFilters milestones={milestones} />
        </div>
      </div>
    </div>
  );
}
