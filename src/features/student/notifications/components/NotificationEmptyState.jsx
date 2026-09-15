import { BellOff } from "lucide-react";

const NotificationEmptyState = ({
  title = "No notifications",
  description = "You're all caught up. New notifications will appear here.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface px-6 py-12 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
        <BellOff size={18} />
      </div>

      <h3 className="mt-3 text-sm font-semibold text-text-primary">
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-sm text-text-secondary">
        {description}
      </p>
    </div>
  );
};

export default NotificationEmptyState;