import { PencilLine } from "lucide-react";

const ProfileIdentityCard = ({ profile, onEdit }) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="flex flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-emerald-500 text-xl font-bold text-white shadow-sm">
            {profile.initials}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold tracking-tight text-text-primary">
                {profile.name}
              </h2>

              <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
                {profile.role}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-secondary">
              <span>
                <span className="text-slate-400">Matric No: </span>
                {profile.matricNumber}
              </span>

              <span className="hidden sm:inline">•</span>

              <span>
                <span className="text-slate-400">Department: </span>
                {profile.department}
              </span>

              <span className="hidden sm:inline">•</span>

              <span>
                <span className="text-slate-400">Level: </span>
                {profile.level}
              </span>
            </div>

            <p className="mt-1 text-sm text-text-secondary">
              {profile.email}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-dark"
        >
          <PencilLine className="h-4 w-4" />
          Edit Profile
        </button>
      </div>
    </section>
  );
};

export default ProfileIdentityCard;