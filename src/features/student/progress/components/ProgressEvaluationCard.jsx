import {
  CheckCircle2,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

export default function ProgressEvaluationCard({
  progress,
}) {
  if (!progress) {
    return null;
  }

  const maturityChanged =
    progress.maturity?.changed;

  const teisChanged =
    progress.teis?.changed;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-emerald-50 p-2 text-emerald-700">
          <RefreshCw className="h-5 w-5" />
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">
            Progress Evaluation
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Your entrepreneurial progress is evaluated
            automatically when verified milestones affect
            your programme criteria.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" />

            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Maturity Level
            </span>
          </div>

          <div className="mt-3 text-2xl font-bold text-slate-900">
            Level {progress.maturity?.currentLevel ?? "—"}
          </div>

          {maturityChanged && (
            <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              Level updated
            </div>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" />

            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              TEIS Score
            </span>
          </div>

          <div className="mt-3 text-2xl font-bold text-slate-900">
            {progress.teis?.score ?? "—"}
          </div>

          {teisChanged && (
            <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              Score recalculated
            </div>
          )}
        </div>
      </div>
    </section>
  );
}