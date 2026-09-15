import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../../../../components/ui/Button";
import MilestoneFilters from "../components/MilestoneFilters";
import { milestones } from "../../../../mocks/milestones";

export default function Milestones() {
  const navigate = useNavigate();

  const totalMilestones = milestones.length;

  const verifiedCount = milestones.filter(
    (milestone) => milestone.status === "verified"
  ).length;

  const pendingCount = milestones.filter(
    (milestone) => milestone.status === "pending"
  ).length;

  const needsChangesCount = milestones.filter(
    (milestone) => milestone.status === "needs_changes"
  ).length;

  return (
    <div className="min-h-screen w-full min-w-0 bg-slate-50 text-slate-900">
      {/* Page Header */}
      <div className="space-y-5 sm:space-y-7">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          {/* Title */}
          <div className="min-w-0">
            <h1 className="text-[24px] font-bold leading-tight text-slate-800 sm:text-[26px] md:text-[28px]">
              My Milestones
            </h1>

            <p className="mt-1 max-w-xl text-[13px] leading-5 text-slate-500 sm:text-sm">
              Track and manage your entrepreneurial achievements.
            </p>
          </div>

          {/* Claim Button */}
          <Button
            type="button"
            size="lg"
            onClick={() =>
              navigate("/student/milestones/claim")
            }
            className="w-full rounded-[11.873px] bg-[#0a3b25] font-semibold text-white shadow-sm hover:bg-[#082f20] sm:w-auto"
          >
            <Plus size={18} />
            Claim Milestone
          </Button>
        </div>

        {/* Summary + Filters */}
        <div className="min-w-0">
          {/* Summary */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[12px] text-[#475569] sm:flex sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3 sm:text-[13px] lg:gap-x-12">
            {/* Total */}
            <div className="flex min-w-0 items-center gap-2 text-[#0f172a]">
              <span className="font-semibold">
                Total Milestones:
              </span>

              <span className="font-normal text-[#0a3b25]">
                {totalMilestones}
              </span>
            </div>

            {/* Verified */}
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#10b981]" />

              <span className="font-semibold">
                Verified:
              </span>

              <span className="font-normal text-[#10b981]">
                {verifiedCount}
              </span>
            </div>

            {/* Pending */}
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#f59e0b]" />

              <span className="font-semibold">
                Pending:
              </span>

              <span className="font-normal text-[#f59e0b]">
                {pendingCount}
              </span>
            </div>

            {/* Needs Changes */}
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#ef4444]" />

              <span className="font-semibold">
                Needs Changes:
              </span>

              <span className="font-normal text-[#ef4444]">
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