export default function EmptyState({
  icon: Icon,
  title = "Nothing here yet",
  description,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      
      {Icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
          <Icon size={22} />
        </div>
      )}

      <h3 className="text-sm font-semibold text-text-primary">
        {title}
      </h3>

      {description && (
        <p className="mt-1 max-w-sm text-sm text-text-secondary">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}

    </div>
  );
}