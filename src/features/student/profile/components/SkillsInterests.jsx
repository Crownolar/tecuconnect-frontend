const SkillsInterests = ({ skills }) => {
  return (
    <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-text-primary">
        Skills & Interests
      </h2>

      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-border bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default SkillsInterests;