import Card from "../../../components/ui/Card";

export default function MentorMetricCard({ label, value, detail, icon: Icon }) {
  return (
    <Card padding="md" className="min-w-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-text-secondary">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-text-primary">{value}</p>
          <p className="mt-1 text-xs leading-5 text-text-secondary">{detail}</p>
        </div>
        {Icon && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
            <Icon size={19} />
          </span>
        )}
      </div>
    </Card>
  );
}
