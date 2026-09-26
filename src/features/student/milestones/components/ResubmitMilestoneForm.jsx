import { useState } from "react";
import EvidenceUploader from "./EvidenceUploader";
import { useResubmitMilestoneClaim } from "../hooks";

export default function ResubmitMilestoneForm({ claim, onComplete, onCancel }) {
  const [evidence, setEvidence] = useState(
    Array.isArray(claim?.evidence) ? claim.evidence : [],
  );

  const [error, setError] = useState("");

  const resubmitClaim = useResubmitMilestoneClaim();

  const handleContinue = async (uploadedEvidence) => {
    setError("");

    if (!uploadedEvidence?.length) {
      setError(
        "Please provide at least one piece of evidence before resubmitting.",
      );
      return;
    }

    setEvidence(uploadedEvidence);

    try {
      await resubmitClaim.mutateAsync({
        claimId: claim.id,
        payload: {
          evidence: uploadedEvidence,
          description: claim.description,
          achievementDate: claim.achievementDate,
        },
      });

      onComplete?.();
    } catch (err) {
      setError(err?.message || "Unable to resubmit this milestone.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <h3 className="font-semibold text-amber-900">Changes Requested</h3>

        {claim.mentorFeedback && (
          <p className="mt-2 text-sm leading-6 text-amber-800">
            {claim.mentorFeedback}
          </p>
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <EvidenceUploader
        evidence={evidence}
        onChange={setEvidence}
        onBack={onCancel}
        onContinue={handleContinue}
      />

      {resubmitClaim.isPending && (
        <p className="text-sm text-slate-500">Resubmitting your milestone...</p>
      )}
    </div>
  );
}
