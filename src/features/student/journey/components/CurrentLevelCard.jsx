import Card from "../../../../components/ui/Card";

export default function CurrentLevelCard({
  currentLevel,
  progress /* unused */,
}) {
  return (
    <Card
      padding="none"
      className="rounded-xl border-[#e2e8f0] bg-white p-6 shadow-none"
    >
      <div className="flex items-start justify-between mb-4">
        <p className="text-[13px] font-medium text-[#53657D]">Current Level</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-1.5 py-0.5 rounded-sm bg-[rgba(16,185,129,0.1)] text-[11px] font-semibold text-[#10b981]">
            Active Stage
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-[20px] font-extrabold text-[#0a3b25]">
          Level {currentLevel.level} — {currentLevel.name}
        </p>
        <p className="text-[13px] leading-[1.9] text-[#53657D]">
          You are actively applying entrepreneurial skills to real projects. You
          have demonstrated competency across core areas and are building
          practical experience through mentored ventures.
        </p>
      </div>
    </Card>
  );
}
