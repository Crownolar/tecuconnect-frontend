import { useState } from "react";

import ClaimStepper from "../components/ClaimStepper";
import EvidenceUploader from "../components/EvidenceUploader";
import SubmissionReview from "../components/SubmissionReview";
import MilestoneDetails from "./MilestoneDetails";

export default function ClaimMilestone() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen w-full min-w-0 space-y-5 overflow-x-hidden bg-slate-50 sm:space-y-7">
      <ClaimStepper currentStep={currentStep} />

      {currentStep === 1 ? (
        <MilestoneDetails
          onContinue={() => setCurrentStep(2)}
        />
      ) : currentStep === 2 ? (
        <EvidenceUploader
          onBack={() => setCurrentStep(1)}
          onContinue={() => setCurrentStep(3)}
        />
      ) : (
        <SubmissionReview
          onBack={() => setCurrentStep(2)}
        />
      )}
    </div>
  );
}