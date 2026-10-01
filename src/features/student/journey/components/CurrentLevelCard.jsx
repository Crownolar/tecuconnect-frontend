import Card from "../../../../components/ui/Card";

export default function CurrentLevelCard({ currentLevel }) {
  return (
    <Card
      padding="none"
      className="w-full rounded-xl border-[#e2e8f0] bg-white p-4 shadow-none sm:p-5 lg:p-6"
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <p className="text-[12px] font-bold leading-normal text-[#0a3b25]">
          Current Level
        </p>

        <div className="flex items-center">
          <div className="inline-flex items-center rounded-sm bg-[rgba(16,185,129,0.1)] px-2 py-1 text-[12px] font-semibold leading-normal text-[#10b981] sm:text-[13px]">
            Active Stage
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-[15px] font-bold leading-6 text-[#0a3b25] sm:text-[16px]">
          {currentLevel?.label ?? "Current level unavailable"}
        </p>

        <p className="text-[13px] font-normal leading-6 text-[#53657D] sm:text-[14px]">
          Your current maturity level is based on your verified programme
          progress and completed requirements.
        </p>
      </div>
    </Card>
  );
}
