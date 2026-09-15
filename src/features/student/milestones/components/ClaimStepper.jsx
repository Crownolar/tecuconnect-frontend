import { Check } from "lucide-react";

const steps = ["Details", "Evidence", "Review"];

export default function ClaimStepper({ currentStep = 1 }) {
  return (
    <nav aria-label="Claim milestone progress" className="w-full">
      <ol className="mx-auto flex w-fit max-w-full items-center gap-4 sm:gap-6">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isComplete = stepNumber < currentStep;

          return (
            <li key={label} className="flex items-center gap-2 sm:gap-3">
              <div
                aria-current={isActive ? "step" : undefined}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                  isActive || isComplete
                    ? "bg-[#005b3f] text-white"
                    : "bg-[#e8eef5] text-[#475569]"
                }`}
              >
                {isComplete ? <Check size={22} strokeWidth={3} /> : stepNumber}
              </div>

              <span
                className={`whitespace-nowrap text-lg font-semibold ${
                  isActive || isComplete ? "text-[#10213b]" : "text-[#475569]"
                }`}
              >
                {label}
              </span>

              {stepNumber < steps.length && (
                <span
                  aria-hidden="true"
                  className={`ml-3 h-1 w-16 shrink-0 sm:ml-4 sm:w-22.5 ${
                    stepNumber < currentStep ? "bg-[#005b3f]" : "bg-[#dfe7ef]"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
