export default function Loading({
  text = "Loading...",
}) {
  return (
    <div className="flex items-center justify-center gap-3 py-10">
      
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />

      <span className="text-sm text-text-secondary">
        {text}
      </span>

    </div>
  );
}