import { useAdminStudents } from "../hooks";

export default function AdminStudents() {
  const { data = [], isLoading, isError } = useAdminStudents();

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-slate-500">Loading students...</div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-sm text-red-600">Unable to load students.</div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-emerald-600">Administration</p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">Students</h1>

        <p className="mt-1 text-sm text-slate-500">
          Review student programme records and current status.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left font-semibold text-slate-600">
                  Student
                </th>

                <th className="px-5 py-4 text-left font-semibold text-slate-600">
                  Matric No.
                </th>

                <th className="px-5 py-4 text-left font-semibold text-slate-600">
                  Department
                </th>

                <th className="px-5 py-4 text-left font-semibold text-slate-600">
                  Level
                </th>

                <th className="px-5 py-4 text-left font-semibold text-slate-600">
                  Maturity
                </th>

                <th className="px-5 py-4 text-left font-semibold text-slate-600">
                  Progress
                </th>

                <th className="px-5 py-4 text-left font-semibold text-slate-600">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {data.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-medium text-slate-900">
                    {student.name}
                  </td>

                  <td className="px-5 py-4 text-slate-500">
                    {student.matricNumber}
                  </td>

                  <td className="px-5 py-4 text-slate-500">
                    {student.department}
                  </td>

                  <td className="px-5 py-4 text-slate-500">{student.level}</td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                      {student.maturityLevel}
                    </span>
                  </td>

                  <td className="px-5 py-4 font-medium text-slate-700">
                    {student.progress}%
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
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
