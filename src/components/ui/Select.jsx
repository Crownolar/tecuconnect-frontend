export default function Select({
  label,
  options = [],
  placeholder = "Select an option",
  ...props
}) {
  return (
    <div className="w-full">
      
      {label && (
        <label className="mb-2 block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}

      <select
        className="
          w-full rounded-lg
          border border-border
          bg-white
          px-3 py-2.5
          text-sm text-text-primary
          outline-none
          focus:border-primary
          focus:ring-2 focus:ring-primary/10
        "
        {...props}
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

    </div>
  );
}