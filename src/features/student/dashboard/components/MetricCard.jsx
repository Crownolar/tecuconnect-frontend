import Card from "../../../../components/ui/Card";

export default function MetricCard({
  label,
  value,
  subtitle,
  icon: Icon,
}) {
  return (
    <Card padding="md">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium text-slate-500">
          {label}
        </p>

        {Icon && (
          <Icon
            size={16}
            className="text-primary"
          />
        )}
      </div>

      <div className="mt-3">
        <h3 className="text-xl font-bold text-slate-800">
          {value}
        </h3>

        {subtitle && (
          <p className="mt-1 text-xs text-slate-500">
            {subtitle}
          </p>
        )}
      </div>
    </Card>
  );
}