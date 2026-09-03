export default function ProgressBar({
  value = 0,
  className = "",
  color = "primary",
}) {
  const colors = {
    primary: "bg-primary",
    accent: "bg-accent",
    blue: "bg-blue-500",
    success: "bg-emerald-500",
  };

  return (
    <div
      className={`
        h-2 w-full
        overflow-hidden
        rounded-full
        bg-gray-100
        ${className}
      `}
    >
      <div
        className={`
          h-full
          rounded-full
          transition-all duration-500
          ${colors[color]}
        `}
        style={{
          width: `${Math.min(Math.max(value, 0), 100)}%`,
        }}
      />
    </div>
  );
}