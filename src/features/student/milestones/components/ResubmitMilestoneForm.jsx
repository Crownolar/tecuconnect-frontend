import { useRef, useState } from "react";
import EvidenceUploader from "./EvidenceUploader";
import { useResubmitMilestoneClaim } from "../hooks";

export default function ResubmitMilestoneForm({ claim, onComplete, onCancel }) {
  const [evidence, setEvidence] = useState([]);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const submissionLock = useRef(false);
  const resubmitClaim = useResubmitMilestoneClaim();
  const isSubmitting = resubmitClaim.isPending || submissionLock.current;

  const handleContinue = async (uploadedEvidence) => {
    // Synchronous lock prevents two rapid clicks before React re-renders.
    if (submissionLock.current || resubmitClaim.isPending || result) return;
    submissionLock.current = true;
    setError("");

    const latestEvidence = uploadedEvidence?.[uploadedEvidence.length - 1];
    if (!latestEvidence?.fileUrl) {
      setError("Please add one valid evidence link before submitting.");
      submissionLock.current = false;
      return;
    }

    try {
      const response = await resubmitClaim.mutateAsync({
        claimId: claim.id,
        payload: { evidence: [latestEvidence] },
      });
      setResult(response);
      onComplete?.(response);
    } catch (err) {
      setError(err?.data?.message || err?.data?.error || err?.message || "Unable to submit new evidence.");
    } finally {
      submissionLock.current = false;
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <h3 className="font-semibold text-amber-900">Changes Requested</h3>
        <p className="mt-2 text-sm leading-6 text-amber-800">
          {claim.verificationNote || "Update the evidence based on the review feedback."}
        </p>
      </div>

      {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {result && (
        <div role="status" className={`rounded-xl border px-4 py-3 text-sm ${result.awaitingMentorReview ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-amber-200 bg-amber-50 text-amber-900"}`}>
          {result.awaitingMentorReview
            ? "Evidence submitted. This milestone is pending mentor review. Further submissions are locked until the mentor reviews it."
            : `Evidence was saved, but the backend still reports status “${result.backendStatus || "unknown"}”. The documented evidence endpoint does not reset a rejected milestone to PENDING. Do not submit again; the backend workflow needs to be updated before this resubmission can complete.`}
        </div>
      )}

      {!result && (
        <EvidenceUploader
          evidence={evidence}
          onChange={setEvidence}
          onBack={onCancel}
          onContinue={handleContinue}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
