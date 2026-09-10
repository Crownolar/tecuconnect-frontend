import Card from "../../../../components/ui/Card";

const statusColors = {
  success: "bg-emerald-500",
  info: "bg-blue-500",
  default: "bg-slate-400",
};

export default function ActivityTimeline({
  activities = [],
}) {
  return (
    <Card>
      <h3 className="mb-5 text-sm font-semibold text-slate-800">
        Recent Activity
      </h3>

      <div className="space-y-5">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex gap-3"
          >
            <div className="flex flex-col items-center">
              <span
                className={`
                  mt-1 h-2 w-2 rounded-full
                  ${statusColors[activity.status]}
                `}
              />

              <div className="mt-1 h-full w-px bg-slate-200" />
            </div>

            <div className="pb-2">
              <p className="text-xs font-medium text-slate-700">
                {activity.title}
              </p>

              <span className="text-[11px] text-slate-400">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}