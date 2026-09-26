import { useStaffStudents } from "../hooks";

export default function StaffStudents() {
  const { data = [], isLoading, isError } = useStaffStudents();

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading students...</p>;
  }

  if (isError) {
    return (
      <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
        Unable to load students.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Students</h1>

        <p className="mt-1 text-sm text-slate-500">
          View and monitor students participating in TEC-TRAK.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[800px] w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-4 font-semibold text-slate-600">
                  Student
                </th>
                <th className="px-5 py-4 font-semibold text-slate-600">
                  Department
                </th>
                <th className="px-5 py-4 font-semibold text-slate-600">
                  Level
                </th>
                <th className="px-5 py-4 font-semibold text-slate-600">
                  Progress
                </th>
                <th className="px-5 py-4 font-semibold text-slate-600">
                  Attendance
                </th>
                <th className="px-5 py-4 font-semibold text-slate-600">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {data.map((student) => (
                <tr key={student.id}>
                  <td className="px-5 py-4">
                    <div className="font-medium text-slate-900">
                      {student.name}
                    </div>

                    <div className="mt-1 text-xs text-slate-500">
                      {student.matricNumber}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {student.department}
                  </td>

                  <td className="px-5 py-4 text-slate-600">{student.level}</td>

                  <td className="px-5 py-4 font-medium text-slate-700">
                    {student.progress}%
                  </td>

                  <td className="px-5 py-4 font-medium text-slate-700">
                    {student.attendance}%
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        student.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
