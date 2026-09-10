import { BadgeCheck } from "lucide-react";

const RecommendedMentorship = () => {
  return (
    <div className="rounded-xl border border-border bg-white p-4">
      <h2 className="mb-4 text-sm font-semibold text-text-primary">
        Recommended for You
      </h2>

      <div className="flex min-h-110px flex-col items-center justify-center rounded-lg bg-slate-50 px-6 text-center">
        <BadgeCheck
          size={20}
          className="mb-3 text-text-secondary"
        />

        <h3 className="text-xs font-semibold text-text-primary">
          Matching New Mentors
        </h3>

        <p className="mt-2 text-[10px] leading-relaxed text-text-secondary">
          We&apos;re matching new industry experts based on your Level 4
          &quot;Practising&quot; milestones. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default RecommendedMentorship;