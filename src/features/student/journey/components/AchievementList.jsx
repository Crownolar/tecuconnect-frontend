import Card from "../../../../components/ui/Card";

export default function AchievementList({
  achievements = [],
}) {
  if (!achievements || achievements.length === 0) {
    return (
      <Card
        padding="none"
        className="w-full rounded-xl border-[#e2e8f0] bg-white p-4 shadow-none sm:p-5 lg:p-6"
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
            />
          </svg>

          <h3 className="mb-2 text-[15px] font-semibold text-[#142033] sm:text-[16px]">
            No achievements yet
          </h3>

          <p className="max-w-sm text-[13px] leading-5 text-[#53657D] sm:text-[14px]">
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
      {/* Header */}
      <h3 className="px-4 pb-4 pt-5 text-[15px] font-semibold leading-5 text-[#0a3b25] sm:px-6 sm:pt-6 sm:text-[16px]">
        Recent Achievements
      </h3>

      {/* Achievement Items */}
      <div className="space-y-0">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="flex flex-col gap-3 border-t border-[#dfe7f1] bg-[#f8fafc] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5"
          >
            {/* Achievement title */}
            <div className="flex min-w-0 items-start gap-3">
              <span className="mt-1 h-3 w-3 flex-none rounded-full bg-[#10b981]" />

              <p className="min-w-0 break-words text-[13px] font-normal leading-5 text-[#0a3b25] sm:text-[14px]">
                {achievement.title}
              </p>
            </div>

            {/* Verification + Date */}
            <div className="flex flex-wrap items-center gap-2 pl-6 sm:flex-none sm:justify-end sm:gap-3 sm:pl-0">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-[#10b981] bg-[rgba(16,185,129,0.1)] px-2 py-1 text-[11px] font-semibold text-[#10b981] sm:px-2.5 sm:text-[12px]">
                <span className="text-[12px]">✓</span>
                Verified
              </span>

              <span className="text-[12px] font-normal text-[#475569] sm:text-[14px]">
                {achievement.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}