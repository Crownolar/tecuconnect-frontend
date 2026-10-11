import { RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import PageHeader from "../../../components/shared/PageHeader";
import Card from "../../../components/ui/Card";
import Loading from "../../../components/ui/Loading";
import { useAssignedStudents } from "../hooks";
import { useCreateAssessment, useStudentAssessments } from "./hooks";
import AssessmentForm from "./components/AssessmentForm";
import AssessmentHistory from "./components/AssessmentHistory";
import AssessmentStats from "./components/AssessmentStats";
import StudentSelector from "./components/StudentSelector";

export default function Assessments() {
  const { data: students = [], isLoading: studentsLoading, isError: studentsError } = useAssignedStudents();
  const [studentId, setStudentId] = useState("");
  const [notice, setNotice] = useState(null);

  const selectedStudent = useMemo(
    () => students.find((student) => student.id === studentId),
    [students, studentId],
  );

  useEffect(() => {
    if (!studentId && students.length) setStudentId(students[0].id);
    if (studentId && !students.some((student) => student.id === studentId)) {
      setStudentId(students[0]?.id || "");
    }
  }, [studentId, students]);

  const assessmentsQuery = useStudentAssessments(studentId);
  const createAssessment = useCreateAssessment();
  const assessments = assessmentsQuery.data?.data ?? [];

  const handleSubmit = async (payload) => {
    setNotice(null);
    try {
      await createAssessment.mutateAsync(payload);
      setNotice({ type: "success", message: "Assessment recorded successfully. Student maturity and TEIS recalculation was triggered by the backend." });
    } catch (error) {
      setNotice({ type: "error", message: error?.message || "The assessment could not be recorded." });
    }
  };

  if (studentsLoading) return <Loading text="Loading assigned students..." />;

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Assessments"
        description="Record competency ratings for students assigned to you."
        action={
          studentId ? (
            <button type="button" onClick={() => assessmentsQuery.refetch()} disabled={assessmentsQuery.isFetching} className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-text-primary hover:bg-slate-50 disabled:opacity-50">
              <RefreshCw size={16} className={assessmentsQuery.isFetching ? "animate-spin" : ""} />
              Refresh
            </button>
          ) : null
        }
      />

      {studentsError ? <Card><p className="text-sm text-red-600">Assigned students could not be loaded. Refresh and try again.</p></Card> : null}

      {!students.length ? (
        <Card><p className="text-sm font-semibold text-text-primary">No assigned students</p><p className="mt-1 text-sm text-text-secondary">You need an active mentor assignment before recording a competency assessment.</p></Card>
      ) : (
        <>
          <Card>
            <StudentSelector students={students} value={studentId} onChange={(value) => { setStudentId(value); setNotice(null); }} />
          </Card>

          {assessmentsQuery.isError ? <Card><p className="text-sm text-red-600">Assessment history could not be loaded. Refresh and try again.</p></Card> : null}

          <AssessmentStats assessments={assessments} />

          {notice ? (
            <div className={`rounded-xl border p-4 text-sm ${notice.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-700"}`}>
              {notice.message}
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <Card>
              <AssessmentForm student={selectedStudent} assessments={assessments} onSubmit={handleSubmit} isSubmitting={createAssessment.isPending} />
            </Card>

            <Card>
              <div className="mb-4">
                <h2 className="text-base font-bold text-text-primary">Assessment history</h2>
                <p className="mt-1 text-sm text-text-secondary">Previous competency ratings recorded for this student.</p>
              </div>
              {assessmentsQuery.isLoading ? <Loading text="Loading assessment history..." /> : <AssessmentHistory assessments={assessments} />}
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
