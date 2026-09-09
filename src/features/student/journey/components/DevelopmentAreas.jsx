import Card from "../../../../components/ui/Card";

export default function DevelopmentAreas({ areas }) {
  const percentColor = (name) => {
    if (name === "Innovation") return "#4f9cf9";
    return "#0a3b25";
  };

  return (
    <Card
      padding="none"
      className="w-full rounded-xl border-[#e2e8f0] bg-white p-6 shadow-none"
    >
      <h3 className="mb-8 text-[32px] font-black leading-none text-[#0a3b25]">
        Development Areas
      </h3>

      <div className="space-y-6">
        {areas.map((area, index) => (
          <div
            key={`${area.name}-${index}`}
            className="flex items-center gap-6"
          >
            <div className="min-w-0 flex-1">
              <p className="text-[24px] font-medium leading-none text-[#0a3b25]">
                {area.name}
              </p>
            </div>

            <div className="flex-1">
              <div className="h-3 w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full transition-[width] duration-300"
                  style={{
                    width: `${area.progress}%`,
                    backgroundColor:
                      area.name === "Innovation" ? "#4f9cf9" : "#10b981",
                  }}
                />
              </div>
            </div>

            <div
              className="w-13 text-right text-[24px] font-medium leading-none"
              style={{ color: percentColor(area.name) }}
            >
              {area.progress}%
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
