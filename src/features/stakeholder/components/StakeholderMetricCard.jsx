export default function StakeholderMetricCard({
  label,
  value,
  description,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          {Icon && <Icon size={19} className="text-slate-700" />}
        </div>

        <span className="text-xs font-medium text-slate-400">Impact</span>
      </div>

      <div className="mt-5">
        <p className="text-sm text-slate-500">{label}</p>

        <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>

        {description && (
          <p className="mt-1 text-xs text-slate-400">{description}</p>
        )}
      </div>
    </div>
  );
}
