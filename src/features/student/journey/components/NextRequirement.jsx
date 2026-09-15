import Card from "../../../../components/ui/Card";
import ProgressBar from "../../../../components/ui/ProgressBar";

export default function NextRequirement({ progress, nextLevel }) {
  return (
    <Card
      padding="none"
      className="w-full rounded-xl border-[#e2e8f0] bg-white p-6 shadow-none"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-[12px] font-bold leading-normal text-[#0a3b25]">
          Progress to Next Level
        </p>

        <p>
          Target: <span className="text-[14px] font-normal text-[#0a3b25]">{nextLevel.name}</span>
        </p>
      </div>

      <div className="mb-[8.904px] flex items-baseline gap-2">
        <p className="text-[16px] font-bold leading-normal text-[#0a3b25]">
          {progress}%
        </p>
        <span className="text-[14px] font-bold leading-normal text-[#0a3b25]">
          Complete
        </span>
      </div>

      <ProgressBar
        value={progress}
        color="success"
        className="mb-6 h-2.5 bg-border"
      />

      <p className="mb-3 text-[18px] font-semibold uppercase tracking-[0.742px] text-[#142033]">
        Remaining Requirements:
      </p>

      <ul className="space-y-2 text-[14px] font-normal text-[#53657D]">
        <li className="flex items-start gap-2">
          <span className="mt-1.75 h-1.5 w-1.5 rounded-full bg-[#53657D]" />
          <span>Complete venture pitch assessment</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1.75 h-1.5 w-1.5 rounded-full bg-[#53657D]" />
          <span>Submit final portfolio review</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1.75 h-1.5 w-1.5 rounded-full bg-[#53657D]" />
          <span>Achieve 80% in Innovation competency</span>
        </li>
      </ul>
    </Card>
  );
}
