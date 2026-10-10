import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

import Button from "../../../../components/ui/Button";
import MilestoneFilters from "../components/MilestoneFilters";
import MilestoneClaimStatus from "../components/MilestoneClaimStatus";
import { useMyMilestoneClaims } from "../hooks";

export default function Milestones() {
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleOpenMilestone = (milestoneId) => {
    if (!milestoneId) return;

    navigate(`/student/milestones/${milestoneId}`);
  };

  const {
    data: claimsResponse,
    isLoading,
    isError,
    error,
  } = useMyMilestoneClaims();

  const claims = Array.isArray(claimsResponse)
    ? claimsResponse
    : claimsResponse?.data || [];

  const filteredClaims = useMemo(
    () =>
      claims.filter((claim) => {
        const matchesCategory =
          categoryFilter === "all" || claim.category === categoryFilter;
        const matchesStatus =
          statusFilter === "all" || claim.status === statusFilter;
        return matchesCategory && matchesStatus;
      }),
    [claims, categoryFilter, statusFilter],
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-sm text-slate-500">
        Loading milestones...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5">
        <p className="font-semibold text-red-700">Unable to load milestones</p>
        <p className="mt-1 text-sm text-red-600">
          {error?.message || "Something went wrong."}
        </p>
      </div>
    );
  }

  const verifiedCount = claims.filter(
    (claim) => claim.status === "VERIFIED",
  ).length;
  const pendingCount = claims.filter(
    (claim) => claim.status === "PENDING",
  ).length;
  const needsChangesCount = claims.filter(
    (claim) => claim.status === "REJECTED",
  ).length;

  return (
    <div className="min-h-screen w-full min-w-0 bg-slate-50 text-slate-900">
      <div className="space-y-5 sm:space-y-7">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-[24px] font-bold leading-tight text-slate-800 sm:text-[26px] md:text-[28px]">
              My Milestones
            </h1>
            <p className="mt-1 max-w-xl text-[13px] leading-5 text-slate-500 sm:text-sm">
              Track and manage your entrepreneurial achievements.
            </p>
          </div>
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

        <div className="grid grid-cols-2 gap-3 text-[12px] text-[#475569] sm:flex sm:flex-wrap sm:gap-x-8">
          <div>
            <span className="font-semibold">My Claims:</span>{" "}
            <span className="text-[#0a3b25]">{claims.length}</span>
          </div>
          <div>
            <span className="font-semibold">Verified:</span>{" "}
            <span className="text-emerald-600">{verifiedCount}</span>
          </div>
          <div>
            <span className="font-semibold">Pending:</span>{" "}
            <span className="text-amber-600">{pendingCount}</span>
          </div>
          <div>
            <span className="font-semibold">Changes Requested:</span>{" "}
            <span className="text-red-600">{needsChangesCount}</span>
          </div>
        </div>

        <MilestoneFilters
          claims={claims}
          categoryFilter={categoryFilter}
          statusFilter={statusFilter}
          onCategoryChange={setCategoryFilter}
          onStatusChange={setStatusFilter}
        />

        <section className="space-y-3">
          {filteredClaims.length > 0 ? (
            filteredClaims.map((claim) => (
              <article
                key={claim.id}
                role="button"
                tabIndex={0}
                onClick={() => handleOpenMilestone(claim.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleOpenMilestone(claim.id);
                  }
                }}
                className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase text-slate-500">
                      {String(
                        claim.category || claim.type || "Milestone",
                      ).replaceAll("_", " ")}
                    </p>
                    <h2 className="mt-1 font-semibold text-slate-900">
                      {claim.title || claim.milestone}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {claim.occurredAt
                        ? `Achieved ${new Date(claim.occurredAt).toLocaleDateString()}`
                        : claim.submittedAt
                          ? `Submitted ${new Date(claim.submittedAt).toLocaleDateString()}`
                          : ""}
                    </p>
                  </div>
                  <MilestoneClaimStatus status={claim.status} />
                </div>

                {claim.description && (
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {claim.description}
                  </p>
                )}

                {claim.verificationNote && (
                  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Review Note
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                      {claim.verificationNote}
                    </p>
                  </div>
                )}
              </article>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="font-medium text-slate-700">
                No milestone claims yet.
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Claim your first milestone to start your journey.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
