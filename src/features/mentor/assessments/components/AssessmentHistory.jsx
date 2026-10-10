import { ClipboardList } from "lucide-react";

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString();
};

export default function AssessmentHistory({ assessments }) {
  if (!assessments.length) {
    return (
      <div className="rounded-xl border border-dashed border-border p-10 text-center">
        <ClipboardList className="mx-auto text-text-secondary" size={24} />
        <p className="mt-3 text-sm font-semibold text-text-primary">No assessments yet</p>
        <p className="mt-1 text-sm text-text-secondary">
          Recorded competency assessments for this student will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[760px] text-left">
        <thead className="border-b border-border bg-slate-50 text-xs font-semibold text-text-secondary">
          <tr>
            <th className="px-4 py-3">Skill</th>
            <th className="px-4 py-3">Competency</th>
            <th className="px-4 py-3">Level</th>
            <th className="px-4 py-3">Score</th>
            <th className="px-4 py-3">Assessed</th>
            <th className="px-4 py-3">Evidence</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {assessments.map((item) => (
            <tr key={item.id} className="text-sm align-top">
              <td className="px-4 py-4 font-semibold text-text-primary">{item.skillName}</td>
              <td className="px-4 py-4 text-text-secondary">{item.competencyName}</td>
              <td className="px-4 py-4 text-text-secondary">{item.level || "—"}</td>
              <td className="px-4 py-4 font-semibold text-text-primary">{item.score} / 5</td>
              <td className="px-4 py-4 text-text-secondary">{formatDate(item.assessedAt)}</td>
              <td className="max-w-[260px] px-4 py-4 text-text-secondary">
                <span className="line-clamp-2">{item.evidence || "—"}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
