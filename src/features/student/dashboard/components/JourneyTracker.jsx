import Card from "../../../../components/ui/Card";

import {
  CheckCircle2,
  Circle,
} from "lucide-react";

export default function JourneyTracker({ stages = [] }) {
  return (
    <Card className="w-full">
      {/* =========================================
          HEADER
          ========================================= */}
      <div className="mb-5 flex flex-col gap-1 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-semibold text-slate-800">
          Entrepreneurial Journey Tracker
        </h3>

        <span className="text-xs text-slate-500">
          Tracks five stages of startup integration
        </span>
      </div>

      {/* =========================================
          JOURNEY TRACKER
          ========================================= */}

      {/* 
        On mobile the journey can scroll horizontally
        instead of squeezing all five stages together.
      */}
      <div className="overflow-x-auto pb-2">
        <div className="flex min-w-[700px] items-center">
          {stages.map((stage, index) => {
            const isCompleted =
              stage.status === "completed";

            const isCurrent =
              stage.status === "current";

            return (
              <div
                key={stage.level}
                className="flex flex-1 items-center"
              >
                {/* Stage */}
                <div
                  className={`
                    flex shrink-0 items-center gap-2
                    ${
                      isCurrent
                        ? "rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3"
                        : ""
                    }
                  `}
                >
                  {/* Status Icon */}
                  {isCompleted ? (
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-primary"
                    />
                  ) : (
                    <Circle
                      size={18}
                      className={`shrink-0 ${
                        isCurrent
                          ? "text-emerald-500"
                          : "text-slate-300"
                      }`}
                    />
                  )}

                  {/* Stage Information */}
                  <div className="min-w-0">
                    <p className="whitespace-nowrap text-xs font-medium text-slate-700">
                      {stage.name}
                    </p>

                    <span className="whitespace-nowrap text-[10px] text-slate-400">
                      Level {stage.level}
                    </span>
                  </div>
                </div>

                {/* Connector */}
                {index < stages.length - 1 && (
                  <div className="mx-3 h-px min-w-8 flex-1 bg-slate-300" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile hint */}
      <p className="mt-1 text-[10px] text-slate-400 sm:hidden">
        Swipe horizontally to view all stages.
      </p>
    </Card>
  );
}