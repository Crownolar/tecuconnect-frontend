export default function Badge({
  children,
  variant = "default",
}) {
  const variants = {
    default:
      "bg-gray-100 text-gray-600",

    success:
      "bg-emerald-50 text-emerald-700",

    warning:
      "bg-amber-50 text-amber-700",

    danger:
      "bg-red-50 text-red-700",

    info:
      "bg-blue-50 text-blue-700",
  };

  return (
    <span
      className={`
        inline-flex items-center
        rounded-full
        px-2.5 py-1
        text-xs font-medium
        ${variants[variant]}
      `}
    >
      {children}
    </span>
  );
}