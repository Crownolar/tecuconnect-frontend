export default function Card({
  children,
  className = "",
  padding = "md",
}) {
  const paddingStyles = {
    sm: "p-4",
    md: "p-5",
    lg: "p-6",
    none: "",
  };

  return (
    <div
      className={`
        rounded-xl
        border border-border
        bg-surface
        shadow-sm
        ${paddingStyles[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}