import { Award } from "lucide-react";
import Button from "../../../../components/ui/Button";

export default function NextActionCard({
  title,
  description,
  action,
  onAction,
}) {
  return (
    <div
      className="
        flex flex-col gap-4
        rounded-xl
        border border-emerald-200
        bg-emerald-50/60
        p-5
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div className="flex items-center gap-4">
        <div
          className="
            flex h-10 w-10 items-center justify-center
            rounded-full bg-white
            text-primary
            shadow-sm
          "
        >
          <Award size={20} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            {title}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <Button
        size="sm"
        onClick={onAction}
      >
        {action} →
      </Button>
    </div>
  );
}