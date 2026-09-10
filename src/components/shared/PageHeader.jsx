export default function PageHeader({
  title,
  description,
  action,
}) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-sm text-text-secondary">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}

    </div>
  );
}