import { ClipboardCheck, GraduationCap, MessageSquare, Users } from "lucide-react";

function Stat({ icon: Icon, label, value, helper }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700"><Icon className="h-5 w-5" /></div>
        <span className="text-2xl font-bold text-text-primary">{value}</span>
      </div>
      <div className="mt-4 font-semibold text-text-primary">{label}</div>
      <div className="mt-1 text-xs text-text-secondary">{helper}</div>
    </div>
  );
}

export default function MentorshipOverview({ students, pendingReviews, sessions, assessments }) {
  const completedSessions = sessions.filter((session) => {
    const status = String(session?.status || session?.state || "").toUpperCase();
    return ["COMPLETED", "COMPLETE", "DONE"].includes(status);
  }).length;

  return (
    <section>
      <div>
        <h3 className="text-xl font-semibold text-text-primary">Mentorship Overview</h3>
        <p className="mt-1 text-sm text-text-secondary">A live summary of your current mentor activity.</p>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={Users} label="Assigned Students" value={students.length} helper="Students currently assigned to you" />
        <Stat icon={ClipboardCheck} label="Pending Reviews" value={pendingReviews.length} helper="Milestone claims awaiting review" />
        <Stat icon={MessageSquare} label="Completed Sessions" value={completedSessions} helper={`${sessions.length} session record${sessions.length === 1 ? "" : "s"} loaded`} />
        <Stat icon={GraduationCap} label="Assessments" value={assessments.length} helper="Assessment records you can access" />
      </div>
    </section>
  );
}
