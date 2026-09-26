import { Search, Users } from "lucide-react";
import { useMemo, useState } from "react";
import PageHeader from "../../../components/shared/PageHeader";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import ProgressBar from "../../../components/ui/ProgressBar";
import StatusBadge from "../../../components/shared/StatusBadge";
import Loading from "../../../components/ui/Loading";
import { useAssignedStudents } from "../hooks";

const statusMap = { on_track: "approved", needs_attention: "needs_changes" };

export default function MentorStudents() {
  const [query, setQuery] = useState("");
  const { data: students = [], isLoading } = useAssignedStudents();

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return students;
    return students.filter((student) =>
      [student.name, student.programme, student.level].some((value) => value.toLowerCase().includes(term)),
    );
  }, [query, students]);

  return (
    <div className="space-y-6">
      <PageHeader title="Assigned Students" description="Monitor the students currently connected to your mentorship workload." />
      <Card padding="sm">
        <div className="relative max-w-xl">
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by student, programme or level" className="pl-10" />
        </div>
      </Card>

      {isLoading ? <Loading text="Loading assigned students..." /> : (
        <Card padding="none" className="overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-12 text-center"><Users className="mx-auto text-text-secondary" size={24} /><p className="mt-3 text-sm font-semibold">No students found</p></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="border-b border-border bg-slate-50 text-xs font-semibold text-text-secondary">
                  <tr><th className="px-5 py-3">Student</th><th className="px-5 py-3">Level</th><th className="px-5 py-3">Journey Progress</th><th className="px-5 py-3">Milestones</th><th className="px-5 py-3">Last Activity</th><th className="px-5 py-3">Status</th></tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((student) => (
                    <tr key={student.id} className="text-sm">
                      <td className="px-5 py-4"><p className="font-semibold text-text-primary">{student.name}</p><p className="mt-1 text-xs text-text-secondary">{student.programme}</p></td>
                      <td className="px-5 py-4 text-text-secondary">{student.level}</td>
                      <td className="px-5 py-4"><div className="flex w-36 items-center gap-2"><ProgressBar value={student.progress} className="flex-1" /><span className="text-xs font-medium">{student.progress}%</span></div></td>
                      <td className="px-5 py-4 text-text-secondary">{student.milestones}</td>
                      <td className="px-5 py-4 text-text-secondary">{student.lastActivity}</td>
                      <td className="px-5 py-4"><StatusBadge status={statusMap[student.status]} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
