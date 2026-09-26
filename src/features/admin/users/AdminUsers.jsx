import { useAdminUsers } from "../hooks";

export default function AdminUsers() {
  const { data = [], isLoading, isError } = useAdminUsers();

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-slate-500">
        Loading users...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-sm text-red-600">
        Unable to load users.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-emerald-600">
          Administration
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Users
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Review platform accounts and role assignments.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left font-semibold text-slate-600">
                  User
                </th>

                <th className="px-5 py-4 text-left font-semibold text-slate-600">
                  Email
                </th>

                <th className="px-5 py-4 text-left font-semibold text-slate-600">
                  Role
                </th>

                <th className="px-5 py-4 text-left font-semibold text-slate-600">
                  Status
                </th>

                <th className="px-5 py-4 text-left font-semibold text-slate-600">
                  Last Login
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {data.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-medium text-slate-900">
                    {user.name}
                  </td>

                  <td className="px-5 py-4 text-slate-500">
                    {user.email}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-slate-500">
                    {user.lastLogin}
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