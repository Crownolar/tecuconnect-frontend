import { Check } from "lucide-react";

const steps = ["Details", "Evidence", "Review"];

export default function ClaimStepper({ currentStep = 1 }) {
  return (
    <nav
      aria-label="Claim milestone progress"
      className="w-full overflow-x-auto pb-1"
    >
      <ol className="mx-auto flex w-fit min-w-max items-center gap-3 px-2 sm:gap-5 sm:px-0">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isComplete = stepNumber < currentStep;

          return (
            <li
              key={label}
              className="flex shrink-0 items-center gap-2 sm:gap-3"
            >
              <div
                aria-current={isActive ? "step" : undefined}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold sm:h-11 sm:w-11 sm:text-lg ${
                  isActive || isComplete
                    ? "bg-[#005b3f] text-white"
                    : "bg-[#e8eef5] text-[#475569]"
                }`}
              >
                {isComplete ? (
                  <Check
                    size={18}
                    strokeWidth={3}
                    className="sm:h-[22px] sm:w-[22px]"
                  />
                ) : (
                  stepNumber
                )}
              </div>

              <span
                className={`whitespace-nowrap text-sm font-semibold sm:text-lg ${
                  isActive || isComplete
                    ? "text-[#10213b]"
                    : "text-[#475569]"
                }`}
              >
                {label}
              </span>

              {stepNumber < steps.length && (
                <span
                  aria-hidden="true"
                  className={`ml-1 h-0.5 w-8 shrink-0 sm:ml-3 sm:h-1 sm:w-16 ${
                    stepNumber < currentStep
                      ? "bg-[#005b3f]"
                      : "bg-[#dfe7ef]"
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