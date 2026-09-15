const PageHeader = ({ title, description, action }) => {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-[28px]">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-sm leading-6 text-text-secondary">
            {description}
          </p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
};

export default PageHeader;