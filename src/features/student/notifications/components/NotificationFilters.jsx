const FILTERS = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "milestones", label: "Milestones" },
  { value: "mentorship", label: "Mentorship" },
  { value: "system", label: "System" },
];

export default function NotificationFilters({ value, onChange, counts = {} }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Notification filters">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          type="button"
          onClick={() => onChange(filter.value)}
          aria-pressed={value === filter.value}
          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
            value === filter.value
              ? "border-primary bg-primary text-white"
              : "border-border bg-white text-text-secondary hover:border-primary hover:text-text-primary"
          }`}
        >
          {filter.label}
          <span className={value === filter.value ? "text-white/80" : "text-text-secondary"}>
            {counts[filter.value] ?? 0}
          </span>
        </button>
      ))}
    </div>
  );
}
