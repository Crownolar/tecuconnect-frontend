import Card from "../../../../components/ui/Card";
import ProgressBar from "../../../../components/ui/ProgressBar";

export default function NextRequirement({
  progress = 0,
  nextLevel,
  requirements = [],
}) {
  const safeProgress =
    typeof progress === "number" ? Math.min(Math.max(progress, 0), 100) : 0;

  return (
    <Card
      padding="none"
      className="w-full rounded-xl border-[#e2e8f0] bg-white p-4 shadow-none sm:p-5 lg:p-6"
    >
      {/* Header */}
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="text-[12px] font-bold leading-normal text-[#0a3b25]">
          Progress to Next Level
        </p>

        <p className="text-[12px] text-[#475569] sm:text-[13px]">
          Target:{" "}
          <span className="font-normal text-[#0a3b25]">
            {nextLevel?.label ?? "—"}
          </span>
        </p>
      </div>

      {/* Progress Percentage */}
      <div className="mb-[8.904px] flex items-baseline gap-2">
        <p className="text-[16px] font-bold leading-normal text-[#0a3b25]">
          {safeProgress}%
        </p>

        <span className="text-[13px] font-bold leading-normal text-[#0a3b25] sm:text-[14px]">
          Complete
        </span>
      </div>

      {/* Progress Bar */}
      <ProgressBar
        value={safeProgress}
        color="success"
        className="mb-5 h-2.5 bg-border sm:mb-6"
      />

      {/* Remaining Requirements */}
      <p className="mb-3 text-[15px] font-semibold uppercase leading-5 tracking-[0.742px] text-[#142033] sm:text-[16px]">
        Remaining Requirements:
      </p>

      {requirements.length === 0 ? (
        <p className="text-[13px] leading-5 text-[#53657D] sm:text-[14px]">
          No remaining requirements.
        </p>
      ) : (
        <ul className="space-y-3 text-[13px] font-normal leading-5 text-[#53657D] sm:text-[14px]">
          {requirements.map((requirement, index) => (
            <li
              key={`${requirement}-${index}`}
              className="flex items-start gap-2"
            >
              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#53657D]" />

              <span className="min-w-0">{requirement}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
