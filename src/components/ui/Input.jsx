export default function Input({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      
      {label && (
        <label className="mb-2 block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}

      <input
        className={`
          w-full rounded-lg
          border border-border
          bg-white
          px-3 py-2.5
          text-sm text-text-primary
          outline-none
          transition
          placeholder:text-gray-400
          focus:border-primary
          focus:ring-2 focus:ring-primary/10
          ${error ? "border-red-500" : ""}
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}