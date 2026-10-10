import { useEffect, useMemo, useState } from "react";
import { Save } from "lucide-react";

const LEVELS = [
  "LEVEL_0",
  "LEVEL_1",
  "LEVEL_2",
  "LEVEL_3",
  "LEVEL_4",
  "LEVEL_5",
  "LEVEL_6",
  "LEVEL_7",
  "LEVEL_8",
  "LEVEL_9",
  "LEVEL_10",
];

export default function AssessmentForm({ student, assessments, onSubmit, isSubmitting }) {
  const [skillId, setSkillId] = useState("");
  const [skillCompetencyId, setSkillCompetencyId] = useState("");
  const [level, setLevel] = useState("LEVEL_0");
  const [score, setScore] = useState("");
  const [evidence, setEvidence] = useState("");

  const skills = useMemo(() => {
    const map = new Map();

    const add = (skill) => {
      if (!skill) return;
      const id = skill.id || skill.skillId;
      if (!id) return;
      const existing = map.get(id) || { ...skill, id, competencies: [] };
      existing.name = skill.name || existing.name || id;
      existing.competencies = [
        ...(existing.competencies || []),
        ...(Array.isArray(skill.competencies) ? skill.competencies : []),
      ];
      existing.competencies = Array.from(
        new Map(existing.competencies.filter(Boolean).map((item) => [item.id, item])).values(),
      );
      map.set(id, existing);
    };

    assessments.forEach((item) => add(item.skill));
    assessments.forEach((item) => {
      if (item.skillId) {
        add({
          id: item.skillId,
          name: item.skillName,
          competencies: item.skillCompetency ? [item.skillCompetency] : [],
        });
      }
    });

    const studentSkills = Array.isArray(student?.skills) ? student.skills : [];
    studentSkills.forEach(add);

    return Array.from(map.values());
  }, [assessments, student]);

  const selectedSkill = skills.find((skill) => skill.id === skillId);
  const competencies = selectedSkill?.competencies || [];

  useEffect(() => {
    setSkillId("");
    setSkillCompetencyId("");
    setScore("");
    setEvidence("");
    setLevel("LEVEL_0");
  }, [student?.id]);

  useEffect(() => {
    if (!competencies.some((item) => item.id === skillCompetencyId)) {
      setSkillCompetencyId("");
    }
  }, [competencies, skillCompetencyId]);

  const submit = async (event) => {
    event.preventDefault();
    if (!student?.id || !skillId || score === "") return;

    await onSubmit({
      studentId: student.id,
      skillId,
      skillCompetencyId: skillCompetencyId || undefined,
      level,
      score: Number(score),
      evidence: evidence.trim() || undefined,
    });

    setScore("");
    setEvidence("");
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-text-primary">Record competency assessment</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Rate the selected student's demonstrated competency on the 0–5 scale.
        </p>
      </div>

      {skills.length === 0 ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          No skill catalogue is available in the data currently returned to this page. Existing assessment history or a student skill list is required to select a skill. The frontend will not invent skill IDs.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="assessment-skill" className="text-sm font-semibold text-text-primary">Skill</label>
              <select id="assessment-skill" value={skillId} onChange={(e) => setSkillId(e.target.value)} required className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                <option value="">Select skill</option>
                {skills.map((skill) => <option key={skill.id} value={skill.id}>{skill.name || skill.id}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="assessment-competency" className="text-sm font-semibold text-text-primary">Sub-competency <span className="font-normal text-text-secondary">(optional)</span></label>
              <select id="assessment-competency" value={skillCompetencyId} onChange={(e) => setSkillCompetencyId(e.target.value)} disabled={!selectedSkill || competencies.length === 0} className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none disabled:bg-slate-50 focus:border-primary focus:ring-2 focus:ring-primary/10">
                <option value="">Overall skill / none</option>
                {competencies.map((item) => <option key={item.id} value={item.id}>{item.name || item.id}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="assessment-level" className="text-sm font-semibold text-text-primary">Level</label>
              <select id="assessment-level" value={level} onChange={(e) => setLevel(e.target.value)} className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                {LEVELS.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="assessment-score" className="text-sm font-semibold text-text-primary">Competency rating</label>
              <select id="assessment-score" value={score} onChange={(e) => setScore(e.target.value)} required className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                <option value="">Select rating</option>
                {[0, 1, 2, 3, 4, 5].map((value) => <option key={value} value={value}>{value} / 5</option>)}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="assessment-evidence" className="text-sm font-semibold text-text-primary">Evidence / mentor notes <span className="font-normal text-text-secondary">(optional)</span></label>
            <textarea id="assessment-evidence" value={evidence} onChange={(e) => setEvidence(e.target.value)} rows={4} placeholder="Describe the evidence supporting this rating..." className="mt-2 w-full resize-y rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={isSubmitting || !student?.id} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <Save size={16} />
              {isSubmitting ? "Recording..." : "Record Assessment"}
            </button>
          </div>
        </>
      )}
    </form>
  );
}
