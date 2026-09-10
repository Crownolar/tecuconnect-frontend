import Card from "../../../../components/ui/Card";
import { CheckCircle2, Circle } from "lucide-react";

export default function JourneyTracker({ stages = [] }) {
  return (
    <Card className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">
          Entrepreneurial Journey Tracker
        </h3>

        <span className="text-xs text-slate-500">
          Tracks five stages of startup integration
        </span>
      </div>

      <div className="flex items-center justify-between gap-2">
        {stages.map((stage, index) => {
          const isCompleted = stage.status === "completed";
          const isCurrent = stage.status === "current";

          return (
            <div
              key={stage.level}
              className="flex flex-1 items-center"
            >
              <div
                className={`
                  flex items-center gap-2
                  ${isCurrent
                    ? "rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3"
                    : ""
                  }
                `}
              >
                {isCompleted ? (
                  <CheckCircle2
                    size={18}
                    className="text-primary"
                  />
                ) : (
                  <Circle
                    size={18}
                    className={
                      isCurrent
                        ? "text-emerald-500"
                        : "text-slate-300"
                    }
                  />
                )}

                <div>
                  <p className="text-xs font-medium text-slate-700">
                    {stage.name}
                  </p>

                  <span className="text-[10px] text-slate-400">
                    Level {stage.level}
                  </span>
                </div>
              </div>

              {index < stages.length - 1 && (
                <div className="mx-3 h-px flex-1 bg-slate-300" />
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}