import Card from "../../../../components/ui/Card";

function formatLevel(level) {
  if (!level) return "—";

  return level
    .replace(/^LEVEL_/, "Level ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function JourneyTracker({
  currentLevel,
  currentLevelLabel,
  targetLevel,
  progressPct = 0,
  met = 0,
  total = 0,
}) {
  const safeProgress = Math.min(
    100,
    Math.max(0, Number(progressPct) || 0),
  );

  return (
    <Card className="w-full">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            Entrepreneurial Journey
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Your current maturity and progress toward the next level.
          </p>
        </div>

        <span className="text-xs font-medium text-emerald-600">
          {currentLevelLabel ||
            formatLevel(currentLevel)}
        </span>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-slate-600">
            Current Level
          </span>

          <span className="font-semibold text-slate-800">
            {currentLevelLabel ||
              formatLevel(currentLevel)}
          </span>
        </div>

        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{
              width: `${safeProgress}%`,
            }}
          />
        </div>

        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
          <span>
            {safeProgress}% progress
          </span>

          <span>
            Target: {formatLevel(targetLevel)}
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Requirements Met
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800">
            {met ?? 0}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Total Requirements
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800">
            {total ?? 0}
          </p>
        </div>

        <div className="col-span-2 rounded-xl bg-emerald-50 p-3 sm:col-span-1">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
            Next Target
          </p>

          <p className="mt-1 text-sm font-semibold text-emerald-800">
            {formatLevel(targetLevel)}
          </p>
        </div>
      </div>
    </Card>
  );
}