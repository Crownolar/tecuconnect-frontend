import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

import Button from "../../../../components/ui/Button";
import MilestoneFilters from "../components/MilestoneFilters";
import { useMilestones, useMyMilestoneClaims } from "../hooks";
import MilestoneClaimStatus from "../components/MilestoneClaimStatus";

export default function Milestones() {
  const navigate = useNavigate();

  const { data: milestones = [], isLoading, isError, error } = useMilestones();

  const { data: claimsData, isLoading: claimsLoading } = useMyMilestoneClaims();

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const claims = Array.isArray(claimsData) ? claimsData : [];

  const filteredClaims = useMemo(() => {
    return claims.filter((claim) => {
      const matchesCategory =
        categoryFilter === "all" || claim.category === categoryFilter;

      const matchesStatus =
        statusFilter === "all" || claim.status === statusFilter;

      return matchesCategory && matchesStatus;
    });
  }, [claims, categoryFilter, statusFilter]);

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-slate-500">Loading milestones...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5">
        <p className="font-semibold text-red-700">Unable to load milestones</p>

        <p className="mt-1 text-sm text-red-600">
          {error?.message ||
            "Something went wrong while loading your milestones."}
        </p>
      </div>
    );
  }

  if (claimsLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading your milestone claims...
        </p>
      </div>
    );
  }

  const myClaimsCount = claims.length;

  const verifiedCount = claims.filter(
    (claim) => claim.status === "VERIFIED",
  ).length;

  const pendingCount = claims.filter(
    (claim) => claim.status === "PENDING_REVIEW",
  ).length;

  const needsChangesCount = claims.filter(
    (claim) => claim.status === "CHANGES_REQUESTED",
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
            onClick={() => navigate("/student/milestones/claim")}
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
              <span className="font-semibold">My Claims:</span>
              <span className="font-normal text-[#0a3b25]">
                {myClaimsCount}
              </span>
            </div>

            {/* Verified */}
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#10b981]" />

              <span className="font-semibold">Verified:</span>

              <span className="font-normal text-[#10b981]">
                {verifiedCount}
              </span>
            </div>

            {/* Pending */}
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#f59e0b]" />

              <span className="font-semibold">Pending:</span>

              <span className="font-normal text-[#f59e0b]">{pendingCount}</span>
            </div>

            {/* Needs Changes */}
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#ef4444]" />

              <span className="font-semibold">Needs Changes:</span>

              <span className="font-normal text-[#ef4444]">
                {needsChangesCount}
              </span>
            </div>
          </div>

          <MilestoneFilters
            milestones={milestones}
            claims={claims}
            categoryFilter={categoryFilter}
            statusFilter={statusFilter}
            onCategoryChange={setCategoryFilter}
            onStatusChange={setStatusFilter}
          />

          {claims.length > 0 && (
            <section className="space-y-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  My Milestone Claims
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Track the status of milestones you have submitted for review.
                </p>
              </div>

              <div className="space-y-3">
                {filteredClaims.length > 0 ? (
                  filteredClaims.map((claim) => (
                    <div
                      key={claim.id}
                      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-xs font-medium text-slate-500">
                            {claim.category}
                          </p>

                          <h3 className="mt-1 font-semibold text-slate-900">
                            {claim.milestone}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            Submitted {claim.submittedAt}
                          </p>
                        </div>

                        <MilestoneClaimStatus status={claim.status} />
                      </div>

                      {claim.mentorFeedback && (
                        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                            Mentor Feedback
                          </p>

                          <p className="mt-2 text-sm leading-6 text-amber-900">
                            {claim.mentorFeedback}
                          </p>

                          {claim.status === "CHANGES_REQUESTED" && (
                            <button
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/student/milestones/resubmit?claim=${claim.id}`,
                                )
                              }
                              className="mt-4 inline-flex items-center rounded-xl bg-[#0A3B25] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#082F1D]"
                            >
                              Resubmit Milestone
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
                    <p className="font-medium text-slate-700">
                      No milestone claims match your filters.
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Try changing the category or status filter.
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
