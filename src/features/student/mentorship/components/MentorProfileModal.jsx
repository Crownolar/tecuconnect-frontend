import {
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  GraduationCap,
  Users,
  X,
} from "lucide-react";

import { useMentor } from "../hook/useMentorship";

const MentorProfileModal = ({ mentorId, onClose, onRequest }) => {
  const { data: mentor, isLoading, isError, error } = useMentor(mentorId);

  if (!mentorId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-lg font-semibold text-text-primary">
            Mentor Profile
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-text-secondary transition hover:bg-slate-100"
            aria-label="Close mentor profile"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isLoading && (
          <div className="p-6">
            <p className="text-sm text-text-secondary">
              Loading mentor profile...
            </p>
          </div>
        )}

        {isError && (
          <div className="p-6">
            <p className="text-sm text-red-600">
              {error?.message || "Unable to load this mentor profile."}
            </p>
          </div>
        )}

        {!isLoading && !isError && mentor && (
          <div className="space-y-6 p-5">
            {/* Identity */}
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                {getInitials(mentor.name)}
              </div>

              <div className="min-w-0">
                <h3 className="text-xl font-semibold text-text-primary">
                  {mentor.name}
                </h3>

                <p className="mt-1 text-sm text-text-secondary">
                  {mentor.specialization || "TEC Mentor"}
                </p>

                {mentor.email && (
                  <p className="mt-1 text-xs text-text-secondary">
                    {mentor.email}
                  </p>
                )}
              </div>
            </div>

            {/* Expertise */}
            {mentor.expertise?.length > 0 && (
              <section>
                <h4 className="text-sm font-semibold text-text-primary">
                  Areas of Expertise
                </h4>

                <div className="mt-3 flex flex-wrap gap-2">
                  {mentor.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Bio */}
            {mentor.bio && (
              <section>
                <h4 className="text-sm font-semibold text-text-primary">
                  About
                </h4>

                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  {mentor.bio}
                </p>
              </section>
            )}

            {/* Academic information */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoItem
                icon={Building2}
                label="Department"
                value={mentor.department?.name || "—"}
              />

              <InfoItem
                icon={GraduationCap}
                label="Faculty"
                value={mentor.faculty?.name || "—"}
              />

              <InfoItem
                icon={Users}
                label="Mentees"
                value={`${mentor.activeMentees ?? 0} / ${
                  mentor.maxMentees ?? "—"
                }`}
              />

              <InfoItem
                icon={BriefcaseBusiness}
                label="Availability"
                value={
                  mentor.isAcceptingApplications
                    ? "Accepting mentees"
                    : "Not accepting"
                }
              />
            </div>

            {/* Status */}
            <div
              className={
                mentor.isAcceptingApplications
                  ? "flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3"
                  : "flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
              }
            >
              <CheckCircle2 className="h-4 w-4" />

              <span className="text-sm font-medium">
                {mentor.isAcceptingApplications
                  ? "This mentor is currently accepting mentorship requests."
                  : "This mentor is not currently accepting mentorship requests."}
              </span>
            </div>

            {/* Action */}
            <button
              type="button"
              disabled={!mentor.isAcceptingApplications}
              onClick={() => onRequest?.(mentor)}
              className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
            >
              {mentor.isAcceptingApplications
                ? "Request Mentorship"
                : "Not Accepting Requests"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="rounded-xl border border-border bg-slate-50 p-3">
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-text-secondary" />

      <span className="text-xs font-medium text-text-secondary">{label}</span>
    </div>

    <p className="mt-2 text-sm font-semibold text-text-primary">{value}</p>
  </div>
);

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export default MentorProfileModal;
