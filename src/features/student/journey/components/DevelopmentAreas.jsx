import Card from "../../../../components/ui/Card";

export default function DevelopmentAreas({ areas }) {
  const percentColor = (name) => {
    if (name === "Innovation") return "#4f9cf9";
    return "#0a3b25";
  };

  return (
    <Card
      padding="none"
      className="w-full rounded-[17.81px] border-[#e2e8f0] bg-white p-[29.68px] shadow-none"
    >
      <div className="flex flex-col gap-[23.75px]">
        <h3 className="text-[16px] font-semibold leading-[100%] tracking-[0%] text-[#0a3b25]">
          Development Areas
        </h3>

        <div className="flex flex-col gap-[20.78px]">
          {areas.map((area, index) => (
            <div
              key={`${area.name}-${index}`}
              className="flex w-full flex-col gap-[8.9px]"
            >
              <div className="flex items-center justify-between">
                <p className="text-[14px] font-normal leading-[100%] tracking-[0%] text-[#0f172a]">
                  {area.name}
                </p>

                <div
                  className="text-[14px] font-normal leading-[100%] tracking-[0%]"
                  style={{ color: percentColor(area.name) }}
                >
                  {area.progress}%
                </div>
              </div>

              <div className="h-[11.87px] w-full overflow-hidden rounded-[5.94px] bg-[#e2e8f0]">
                <div
                  className="h-full rounded-[5.94px] transition-[width] duration-300"
                  style={{
                    width: `${area.progress}%`,
                    backgroundColor:
                      area.name === "Innovation" ? "#4f9cf9" : "#10b981",
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
