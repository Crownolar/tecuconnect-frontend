import { useSearchParams } from "react-router-dom";

import { useMyMilestoneClaims } from "../hooks";

import ResubmitMilestoneForm from "../components/ResubmitMilestoneForm";

export default function ResubmitMilestone() {
  const [searchParams] = useSearchParams();

  const claimId = searchParams.get("claim");

  const { data: claims = [], isLoading } = useMyMilestoneClaims();

  const claim = claims.find((item) => item.id === claimId);

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-slate-500">Loading milestone...</div>
    );
  }

  if (!claim) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        Milestone claim not found.
      </div>
    );
  }

  if (claim.status !== "CHANGES_REQUESTED") {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
        This milestone does not currently require changes.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Resubmit Milestone
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Update your evidence based on your mentor's feedback.
        </p>
      </div>

      <ResubmitMilestoneForm
        claim={claim}
        onComplete={() => {
          window.location.href = "/student/milestones";
        }}
        onCancel={() => {
          window.history.back();
        }}
      />
    </div>
  );
}
