import Card from "../../../../components/ui/Card";
import ProgressBar from "../../../../components/ui/ProgressBar";

export default function NextRequirement({ progress, nextLevel }) {
  return (
    <Card
      padding="none"
      className="w-full rounded-xl border-[#e2e8f0] bg-white p-6 shadow-none"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="text-[18px] font-bold leading-none text-[#0a3b25]">
          Progress to Next Level
        </h3>

        <p className="text-[16px] font-medium text-[#53657D]">
          Target: <span className="text-[#0a3b25]">{nextLevel.name}</span>
        </p>
      </div>

      <div className="mb-6 flex items-end gap-2">
        <p className="text-[40px] font-black leading-none tracking-[-0.04em] text-[#0a3b25]">
          {progress}%
        </p>
        <span className="pb-1 text-[18px] font-semibold text-[#0a3b25]">
          Complete
        </span>
      </div>

      <ProgressBar
        value={progress}
        color="success"
        className="mb-6 h-2.5 bg-border"
      />

      <p className="mb-3 text-[14px] font-black uppercase tracking-[0.02em] text-[#142033]">
        Remaining Requirements:
      </p>

      <ul className="space-y-2 text-[15px] text-[#53657D]">
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
