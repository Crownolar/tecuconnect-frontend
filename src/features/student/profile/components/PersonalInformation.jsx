const PersonalInformation = ({ fields }) => {
  return (
    <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-text-primary">
        Personal Information
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.label}>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-secondary">
              {field.label}
            </p>

            <p className="mt-1.5 text-sm font-medium text-text-primary">
              {field.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PersonalInformation;