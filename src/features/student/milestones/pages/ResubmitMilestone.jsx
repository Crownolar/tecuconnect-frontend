import { useSearchParams } from "react-router-dom";
import { useMilestone } from "../hooks";

export default function ResubmitMilestone() {
  const [searchParams] = useSearchParams();
  const claimId = searchParams.get("claim");
  const { data: claim, isLoading } = useMilestone(claimId);

  if (isLoading) {
    return <div className="p-6 text-sm text-slate-500">Loading milestone...</div>;
  }

  if (!claim) {
    return <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">Milestone claim not found.</div>;
  }

  if (claim.status !== "REJECTED") {
    return <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600">This milestone does not currently require changes.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Changes Requested</h1>
        <p className="mt-1 text-sm text-slate-500">
          The backend contract currently documents rejection, but it does not document a student resubmission endpoint yet.
        </p>
      </div>
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        {claim.verificationNote || "Review the mentor feedback and submit a new milestone claim when the resubmission endpoint is available."}
      </div>
    </div>
  );
}
