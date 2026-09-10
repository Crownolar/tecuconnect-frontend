export default function Avatar({
  src,
  name = "User",
  size = "md",
}) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={`
        flex shrink-0 items-center justify-center
        overflow-hidden rounded-full
        bg-primary-light
        font-semibold text-primary
        ${sizes[size]}
      `}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
        />
      ) : (
        initials
      )}
    </div>
  );
}