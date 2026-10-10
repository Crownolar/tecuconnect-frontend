import { Mail, ShieldCheck } from "lucide-react";

function getInitials(user) {
  const first = user?.firstName?.[0] ?? "";
  const last = user?.lastName?.[0] ?? "";
  const fallback = user?.name?.split?.(" ")?.map((part) => part[0]).slice(0, 2).join("") ?? "";
  return (first + last || fallback || "M").toUpperCase();
}

function getName(user) {
  const name = [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim();
  return name || user?.name || "Mentor";
}

export default function ProfileHeader({ user }) {
  const name = getName(user);
  const email = user?.email || "—";
  const status = user?.status || user?.accountStatus || "ACTIVE";

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <div className="bg-slate-50 p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-700 to-emerald-500 text-xl font-bold text-white shadow-sm">
              {getInitials(user)}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="truncate text-2xl font-bold tracking-tight text-text-primary">{name}</h2>
                <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">
                  Mentor
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-secondary">
                <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" />{email}</span>
                <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" />{status}</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            <div className="font-semibold">Authenticated account</div>
            <div className="mt-0.5 text-xs text-emerald-700">Profile data is loaded from your current session.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
