import { Award, BarChart3, ClipboardCheck } from "lucide-react";

function Stat({ icon: Icon, label, value, detail }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <Icon size={17} />
        </div>
        <span className="text-xs text-text-secondary">{detail}</span>
      </div>
      <p className="mt-4 text-2xl font-bold text-text-primary">{value}</p>
      <p className="mt-1 text-xs font-medium text-text-secondary">{label}</p>
    </div>
  );
}

export default function AssessmentStats({ assessments }) {
  const list = Array.isArray(assessments) ? assessments : [];
  const skills = new Set(list.map((item) => item.skillId).filter(Boolean));
  const average = list.length
    ? list.reduce((sum, item) => sum + Number(item.score || 0), 0) / list.length
    : 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Stat icon={ClipboardCheck} label="Recorded assessments" value={list.length} detail="Selected student" />
      <Stat icon={BarChart3} label="Skills assessed" value={skills.size} detail="Unique skills" />
      <Stat icon={Award} label="Average rating" value={`${average.toFixed(1)} / 5`} detail="0–5 scale" />
    </div>
  );
}
