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
            <h1 className="text-[28px] font-bold text-slate-800">My Milestones</h1>

            <p className="mt-1 text-sm text-slate-500">
              Track and manage your entrepreneurial achievements.
            </p>
          </div>

          <Button
            type="button"
            size="lg"
            onClick={() => navigate("/student/milestones/claim")}
            className="whitespace-nowrap rounded-[11.873px] font-semibold bg-[#0a3b25] text-white shadow-sm hover:bg-[#082f20]"
          >
            <Plus size={18} />
            Claim Milestone
          </Button>
        </div>

        {/* Milestone Summary and Tabs */}
        <div>
          <div className="flex flex-wrap items-center gap-12 text-[13px] font-normal text-[#475569]">
            <div className="flex items-center gap-2 text-[#0f172a]">
              <span className="font-semibold">Total Milestones:</span>
              <span className="text-[13px] font-normal text-[#0a3b25]">
                {totalMilestones}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[#475569]">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#10b981]" />
              <span className="font-semibold">Verified:</span>
              <span className="text-[13px] font-normal text-[#10b981]">
                {verifiedCount}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[#475569]">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#f59e0b]" />
              <span className="font-semibold">Pending:</span>
              <span className="text-[13px] font-normal text-[#f59e0b]">
                {pendingCount}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[#475569]">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#ef4444]" />
              <span className="font-semibold">Needs Changes:</span>
              <span className="text-[13px] font-normal text-[#ef4444]">
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
