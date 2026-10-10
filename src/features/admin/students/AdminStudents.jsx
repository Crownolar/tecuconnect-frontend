import { useMemo, useState } from "react";
import { Eye, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAdminStudents } from "../hooks";

function StatusBadge({ status }) {
  const normalized = String(status || "").toUpperCase();

  const active = normalized === "ACTIVE" || normalized === "ENROLLED";

  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
        active
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-600",
      ].join(" ")}
    >
      {status || "—"}
    </span>
  );
}

export default function AdminStudents() {
  const studentsQuery = useAdminStudents();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const navigate = useNavigate();

  const students = studentsQuery.data ?? [];

  const statuses = useMemo(() => {
    return [
      "ALL",
      ...new Set(
        students
          .map((student) => String(student.status || "").toUpperCase())
          .filter(Boolean),
      ),
    ];
  }, [students]);

  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase();

    return students.filter((student) => {
      const matchesStatus =
        status === "ALL" ||
        String(student.status || "").toUpperCase() === status;

      const searchable = [
        student.name,
        student.email,
        student.matricNumber,
        student.matricNo,
        student.degreeProgramme,
        student.programme,
        typeof student.department === "object"
          ? student.department?.name
          : student.department,
        typeof student.faculty === "object"
          ? student.faculty?.name
          : student.faculty,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !term || searchable.includes(term);

      return matchesStatus && matchesSearch;
    });
  }, [students, search, status]);

  if (studentsQuery.isLoading) {
    return (
      <div className="p-6 text-sm text-slate-500">Loading students...</div>
    );
  }

  if (studentsQuery.isError) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {studentsQuery.error?.data?.message ||
            studentsQuery.error?.data?.error ||
            studentsQuery.error?.message ||
            "Unable to load students."}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium text-emerald-600">Administration</p>

          <h1 className="mt-1 text-2xl font-semibold text-slate-900">
            Students
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View and inspect student records available through the platform API.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total students</p>

            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {students.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Active</p>

            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {
                students.filter(
                  (student) =>
                    String(student.status || "").toUpperCase() === "ACTIVE",
                ).length
              }
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Currently displayed</p>

            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {filteredStudents.length}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="min-w-0 flex-1">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Search students
              </label>

              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Name, email, matric number, department..."
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>
            </div>

            <div className="lg:w-52">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
              >
                {statuses.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-4">Student</th>

                  <th className="px-5 py-4">Matric Number</th>

                  <th className="px-5 py-4">Department</th>

                  <th className="px-5 py-4">Maturity</th>

                  <th className="px-5 py-4">Status</th>

                  <th className="px-5 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="text-sm hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {student.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {student.email || "—"}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {student.matricNumber || student.matricNo || "—"}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {typeof student.department === "object"
                        ? student.department?.name
                        : student.department || "—"}
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-700">
                      {student.maturityLevel || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={student.status} />
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/admin/students/${student.id}`)
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-white"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {!filteredStudents.length && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-sm text-slate-500"
                    >
                      No students match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
