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
      className="w-full rounded-xl border-[#e2e8f0] bg-white p-6 shadow-none"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="text-[15px] font-bold text-[#142033]">
          Entrepreneurial Journey Tracker
        </h3>

        <p className="text-[13px] text-[#475569]">
          Tracks five stages of startup integration
        </p>
      </div>

      <div className="flex w-full items-center justify-between gap-2">
        {stages.map((stage, index) => (
          <Fragment key={`${stage.level}-${stage.name}`}>
            <div
              className={
                stage.status === "current"
                  ? "flex flex-1 items-center gap-2 rounded-lg border border-[#10b981] bg-[rgba(16,185,129,0.1)] px-3 py-2"
                  : `flex flex-1 items-center gap-2${
                      stage.status === "locked" ? " opacity-50" : ""
                    }`
              }
            >
              <div className="flex h-6 w-6 flex-none items-center justify-center rounded-full">
                {stage.status === "completed" ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0a3b25]">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                ) : stage.status === "current" ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10b981]">
                    <MapPin size={14} className="text-white" />
                  </div>
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e2e8f0]">
                    <span className="text-[11px] font-bold text-[#475569]">
                      {stage.level}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-0.5">
                {stage.status === "current" ? (
                  <>
                    <p className="whitespace-nowrap text-[13px] font-bold text-[#065f46]">
                      {stage.name}
                    </p>

                    <p className="whitespace-nowrap text-[11px] font-semibold text-[#047857]">
                      Current Stage
                    </p>
                  </>
                ) : (
                  <>
                    <p className="whitespace-nowrap text-[13px] font-semibold text-[#142033]">
                      {stage.name}
                    </p>

                    <p className="whitespace-nowrap text-[11px] text-[#475569]">
                      Level {stage.level}
                    </p>
                  </>
                )}
              </div>
            </div>

            {index < stages.length - 1 && (
              <div className="mx-3 h-0.5 flex-1 bg-[#e2e8f0]">
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
    </Card>
  );
}
