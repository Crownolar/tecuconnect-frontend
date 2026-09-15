import { Fragment } from "react";
import { MapPin, CheckCircle } from "lucide-react";

import Card from "../../../../components/ui/Card";

export default function JourneyTracker({
  stages = [],
  orientation = "horizontal",
}) {
  if (orientation !== "horizontal") {
    return null;
  }

  return (
    <Card
      padding="none"
      className="w-full overflow-hidden rounded-xl border-[#e2e8f0] bg-white p-4 shadow-none sm:p-5 lg:p-6"
    >
      {/* Header */}
      <div className="mb-4 flex flex-col gap-1 sm:mb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <h3 className="text-[15px] font-semibold leading-5 text-[#142033] sm:text-[16px]">
          Entrepreneurial Journey Tracker
        </h3>

        <p className="text-[12px] leading-5 text-[#475569] sm:text-[14px]">
          Tracks five stages of startup integration
        </p>
      </div>

      {/* Scroll Container */}
      <div className="w-full overflow-x-auto pb-2">
        <div className="flex min-w-[720px] items-center gap-2">
          {stages.map((stage, index) => (
            <Fragment key={`${stage.level}-${stage.name}`}>
              {/* Stage */}
              <div
                className={
                  stage.status === "current"
                    ? "flex min-w-[135px] flex-1 items-center gap-2 rounded-lg border border-[#10b981] bg-[rgba(16,185,129,0.1)] px-3 py-2.5"
                    : `flex min-w-[125px] flex-1 items-center gap-2 rounded-lg px-2 py-2.5 ${
                        stage.status === "locked" ? "opacity-50" : ""
                      }`
                }
              >
                {/* Icon */}
                <div className="flex h-6 w-6 flex-none items-center justify-center rounded-full">
                  {stage.status === "completed" ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0a3b25]">
                      <CheckCircle
                        size={14}
                        className="text-white"
                      />
                    </div>
                  ) : stage.status === "current" ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10b981]">
                      <MapPin
                        size={14}
                        className="text-white"
                      />
                    </div>
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e2e8f0]">
                      <span className="text-[11px] font-bold text-[#475569]">
                        {stage.level}
                      </span>
                    </div>
                  )}
                </div>

                {/* Stage Text */}
                <div className="min-w-0 space-y-0.5">
                  {stage.status === "current" ? (
                    <>
                      <p className="truncate text-[12px] font-bold text-[#065f46] sm:text-[13px]">
                        {stage.name}
                      </p>

                      <p className="truncate text-[10px] font-semibold text-[#047857] sm:text-[11px]">
                        Current Stage
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="truncate text-[12px] font-semibold text-[#142033] sm:text-[13px]">
                        {stage.name}
                      </p>

                      <p className="text-[10px] text-[#475569] sm:text-[11px]">
                        Level {stage.level}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Connector */}
              {index < stages.length - 1 && (
                <div className="h-0.5 w-6 flex-none bg-[#e2e8f0] sm:w-10">
                  <div
                    className={`h-full w-full ${
                      stages[index + 1].status === "locked"
                        ? "bg-[#e2e8f0]"
                        : "bg-[#0a3b25]"
                    }`}
                  />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      {/* Mobile scroll hint */}
      <p className="mt-1 text-[10px] text-[#94a3b8] sm:hidden">
        ← Swipe to view all stages →
      </p>
    </Card>
  );
}