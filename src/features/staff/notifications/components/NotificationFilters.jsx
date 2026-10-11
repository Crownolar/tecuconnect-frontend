const filters = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "milestones", label: "Milestones" },
  { value: "mentorship", label: "Mentorship" },
  { value: "system", label: "System" },
];

export default function NotificationFilters({ value, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          onClick={() => onChange(filter.value)}
          className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
            value === filter.value
              ? "border-primary bg-primary text-white"
              : "border-border bg-white text-text-secondary hover:text-text-primary"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
