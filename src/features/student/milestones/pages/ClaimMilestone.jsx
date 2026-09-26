import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import ClaimStepper from "../components/ClaimStepper";
import EvidenceUploader from "../components/EvidenceUploader";
import SubmissionReview from "../components/SubmissionReview";

import MilestoneDetails from "./MilestoneDetails";

import {
  useClaimMilestone,
  useSubmitEvidence,
  useMyMilestoneClaims,
} from "../hooks";
import ResubmitMilestone from "../components/ResubmitMilestoneForm";

export default function ClaimMilestone() {
  const [currentStep, setCurrentStep] = useState(1);

  const [milestoneDetails, setMilestoneDetails] = useState(null);

  const [evidence, setEvidence] = useState([]);

  const claimMilestone = useClaimMilestone();

  const submitEvidence = useSubmitEvidence();

  const [searchParams] = useSearchParams();

  const resubmitId = searchParams.get("resubmit");

  const { data: claims = [] } = useMyMilestoneClaims();

  const resubmitClaim = claims.find((claim) => claim.id === resubmitId);

  const handleSubmit = async () => {
    if (!milestoneDetails) {
      throw new Error("Milestone details are missing.");
    }

    const claimResponse = await claimMilestone.mutateAsync(milestoneDetails);

    const claimId = claimResponse?.claimId;

    if (!claimId) {
      throw new Error(
        "The milestone claim was created, but no claim ID was returned.",
      );
    }

    await submitEvidence.mutateAsync({
      claimId,
      payload: evidence,
    });

    setCurrentStep(4);
  };

  const isSubmitting = claimMilestone.isPending || submitEvidence.isPending;

  if (resubmitClaim) {
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

        <ResubmitMilestone
          claim={resubmitClaim}
          onComplete={() => {
            window.history.back();
          }}
          onCancel={() => {
            window.history.back();
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full min-w-0 space-y-5 overflow-x-hidden bg-slate-50 sm:space-y-7">
      <ClaimStepper currentStep={currentStep} />

      {currentStep === 1 ? (
        <MilestoneDetails
          onContinue={(details) => {
            setMilestoneDetails(details);
            setCurrentStep(2);
          }}
        />
      ) : currentStep === 2 ? (
        <EvidenceUploader
          evidence={evidence}
          onChange={setEvidence}
          onBack={() => setCurrentStep(1)}
          onContinue={(uploadedEvidence) => {
            setEvidence(uploadedEvidence);
            setCurrentStep(3);
          }}
        />
      ) : currentStep === 3 ? (
        <SubmissionReview
          milestoneDetails={milestoneDetails}
          evidence={evidence}
          onBack={() => setCurrentStep(2)}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      ) : (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <h2 className="text-lg font-semibold text-emerald-800">
            Milestone Submitted
          </h2>

          <p className="mt-2 text-sm text-emerald-700">
            Your milestone claim has been submitted successfully and is awaiting
            review.
          </p>
        </div>
      )}
    </div>
  );
}
