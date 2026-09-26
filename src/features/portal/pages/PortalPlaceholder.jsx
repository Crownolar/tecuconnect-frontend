import { useLocation } from "react-router-dom";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/shared/PageHeader";

export default function PortalPlaceholder({
  title,
  description,
  role,
  items = [],
}) {
  const location = useLocation();

  return (
    <div className="space-y-6">
      <PageHeader title={title} description={description} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.label} className="p-5">
            <p className="text-sm font-semibold text-text-primary">
              {item.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              {item.description}
            </p>
          </Card>
        ))}
      </div>
      <Card className="border-dashed p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          {role} portal foundation
        </p>
        <p className="mt-2 text-sm text-text-secondary">
          Route ready:{" "}
          <span className="font-medium text-text-primary">
            {location.pathname}
          </span>
          . API-backed workflow components will be integrated into this shell
          during the MVP sprint.
        </p>
      </Card>
    </div>
  );
}
