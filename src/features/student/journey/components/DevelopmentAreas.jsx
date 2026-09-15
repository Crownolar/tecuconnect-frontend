import Card from "../../../../components/ui/Card";

export default function DevelopmentAreas({ areas = [] }) {
  const percentColor = (name) => {
    if (name === "Innovation") return "#4f9cf9";
    return "#0a3b25";
  };

  return (
    <Card
      padding="none"
      className="w-full rounded-xl border-[#e2e8f0] bg-white p-4 shadow-none sm:p-5 lg:rounded-[17.81px] lg:p-[29.68px]"
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        {/* Heading */}
        <h3 className="text-[15px] font-semibold leading-5 tracking-[0%] text-[#0a3b25] sm:text-[16px]">
          Development Areas
        </h3>

        {/* Areas */}
        <div className="flex flex-col gap-5 sm:gap-[20.78px]">
          {areas.map((area, index) => (
            <div
              key={`${area.name}-${index}`}
              className="flex w-full flex-col gap-2"
            >
              {/* Label + Percentage */}
              <div className="flex items-center justify-between gap-3">
                <p className="min-w-0 truncate text-[13px] font-normal leading-5 text-[#0f172a] sm:text-[14px]">
                  {area.name}
                </p>

                <div
                  className="flex-none text-[13px] font-normal leading-5 sm:text-[14px]"
                  style={{
                    color: percentColor(area.name),
                  }}
                >
                  {area.progress}%
                </div>
              </div>

              {/* Progress */}
              <div className="h-[9px] w-full overflow-hidden rounded-[5.94px] bg-[#e2e8f0] sm:h-[11.87px]">
                <div
                  className="h-full rounded-[5.94px] transition-[width] duration-300"
                  style={{
                    width: `${Math.min(
                      Math.max(area.progress, 0),
                      100
                    )}%`,
                    backgroundColor:
                      area.name === "Innovation"
                        ? "#4f9cf9"
                        : "#10b981",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}