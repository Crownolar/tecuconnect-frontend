import {
  Bell,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const icons = {
  notifications: Bell,
  security: ShieldCheck,
};

const AccountSettings = ({ settings }) => {
  return (
    <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-text-primary">
        Account Settings
      </h2>

      <div className="mt-5 space-y-3">
        {settings.map((item) => {
          const Icon = icons[item.id] ?? CheckCircle2;

          return (
            <div
              key={item.id}
              className="flex flex-col gap-3 rounded-xl border border-border bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-emerald-100 p-2 text-emerald-700">
                  <Icon className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {item.title}
                  </p>

                  <p className="mt-0.5 text-xs leading-5 text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-white px-3 py-2 text-xs font-medium text-accent transition hover:bg-slate-100"
              >
                {item.action}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AccountSettings;