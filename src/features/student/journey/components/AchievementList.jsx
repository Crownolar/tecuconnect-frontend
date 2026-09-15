import Card from "../../../../components/ui/Card";

export default function AchievementList({ achievements }) {
  if (!achievements || achievements.length === 0) {
    return (
      <Card
        padding="none"
        className="rounded-xl border-[#e2e8f0] bg-white p-6 shadow-none"
      >
        <div className="flex flex-col items-center py-8 text-center">
          <svg
            className="mb-4 h-12 w-12 text-[#d1d5db]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m2 0a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 className="mb-2 text-[16px] font-semibold text-[#142033]">
            No achievements yet
          </h3>
          <p className="text-[14px] text-[#53657D]">
            Complete requirements to earn achievements and showcase your
            progress.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card
      padding="none"
      className="w-full overflow-hidden rounded-xl border-[#e2e8f0] bg-white shadow-none"
    >
      <h3 className="px-6 pb-4 pt-6 text-[16px] font-semibold leading-none text-[#0a3b25]">
        Recent Achievements
      </h3>

      <div className="space-y-0">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="flex items-center justify-between gap-4 border-t border-[#dfe7f1] bg-[#f8fafc] px-5 py-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[#10b981]" />
              <p className="truncate text-[14px] font-normal leading-none text-[#0a3b25]">
                {achievement.title}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-[11.873px]">
              <span className="inline-flex items-center gap-2 rounded-md border border-[#10b981] bg-[rgba(16,185,129,0.1)] py-[2.968px] px-[8.904px] text-[16.325px] font-semibold text-[#10b981]">
                <span className="text-[16.325px]">✓</span>
                Verified
              </span>
              <span className="text-[14px] font-normal text-[#475569]">
                {achievement.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
