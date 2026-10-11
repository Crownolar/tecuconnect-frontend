import { useState } from "react";

import ClaimStepper from "../components/ClaimStepper";
import EvidenceUploader from "../components/EvidenceUploader";
import SubmissionReview from "../components/SubmissionReview";
import MilestoneDetails from "./MilestoneDetails";

import { useClaimMilestone, useSubmitEvidence } from "../hooks";

export default function ClaimMilestone() {
  const [currentStep, setCurrentStep] = useState(1);
  const [milestoneDetails, setMilestoneDetails] = useState(null);
  const [evidence, setEvidence] = useState([]);

  const claimMilestone = useClaimMilestone();
  const submitEvidence = useSubmitEvidence();

  const handleSubmit = async () => {
    if (!milestoneDetails) {
      throw new Error("Milestone details are missing.");
    }

    const claimResponse = await claimMilestone.mutateAsync(milestoneDetails);
    const milestoneId = claimResponse?.id || claimResponse?.claimId;

    if (!milestoneId) {
      throw new Error(
        "The milestone was created, but no milestone ID was returned.",
      );
    }

    for (const item of evidence) {
      if (!item?.fileUrl) continue;

      await submitEvidence.mutateAsync({
        milestoneId,
        evidence: {
          fileUrl: item.fileUrl,
          fileType: item.fileType || "link",
          description: item.description || item.name || "",
        },
      });
    }

    setCurrentStep(4);
  };

  const isSubmitting = claimMilestone.isPending || submitEvidence.isPending;

  return (
    <div className="min-h-screen w-full min-w-0 space-y-5 overflow-x-hidden bg-slate-50 sm:space-y-7">
      <ClaimStepper currentStep={currentStep} />

      {currentStep === 1 && (
        <MilestoneDetails
          onContinue={(details) => {
            setMilestoneDetails(details);
            setCurrentStep(2);
          }}
        />
      )}

      {currentStep === 2 && (
        <EvidenceUploader
          evidence={evidence}
          onChange={setEvidence}
          onBack={() => setCurrentStep(1)}
          onContinue={(uploadedEvidence) => {
            setEvidence(uploadedEvidence);
            setCurrentStep(3);
          }}
        />
      )}

      {currentStep === 3 && (
        <SubmissionReview
          milestoneDetails={milestoneDetails}
          evidence={evidence}
          onBack={() => setCurrentStep(2)}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}

      {currentStep === 4 && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <h2 className="text-lg font-semibold text-emerald-800">
            Milestone Submitted
          </h2>
          <p className="mt-2 text-sm text-emerald-700">
            Your milestone claim has been submitted successfully and is awaiting
            mentor review.
          </p>
        </div>
      )}
    </div>
  );
}
