import { useStaffAttendance } from "../hooks";

export default function StaffAttendance() {
  const { data = [], isLoading, isError } = useStaffAttendance();

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading attendance...</p>;
  }

  if (isError) {
    return (
      <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
        Unable to load attendance.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Attendance</h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor student participation and attendance.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[650px] w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Sessions</th>
                <th className="px-5 py-4">Attended</th>
                <th className="px-5 py-4">Attendance</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {data.map((student) => (
                <tr key={student.student}>
                  <td className="px-5 py-4 font-medium text-slate-900">
                    {student.student}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {student.sessions}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {student.attended}
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-semibold text-slate-800">
                      {student.attendance}%
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
