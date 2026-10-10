import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, UsersRound } from "lucide-react";
import { useAdminUsers } from "../hooks";
import AdminInviteUser from "./AdminInviteUser";

export default function AdminUsers() {
  const { data = [], isLoading, isError } = useAdminUsers();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("ALL");
  const [showInviteModal, setShowInviteModal] = useState(false);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return data.filter((user) => {
      const matchesRole = role === "ALL" || user.role === role;
      const matchesSearch =
        !term ||
        [user.name, user.email, user.role, user.status]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(term);
      return matchesRole && matchesSearch;
    });
  }, [data, role, search]);

  if (isLoading) {
    return <div className="p-6 text-sm text-slate-500">Loading users...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-sm text-red-600">Unable to load users.</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-600">Administration</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">Users</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage the student and mentor accounts currently exposed by the API.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/admin/mentors")}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Mentor Management
          </button>
          <button
            onClick={() => navigate("/admin/users/create")}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            Enroll Student
          </button>
          <button
            type="button"
            onClick={() => setShowInviteModal(true)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Invite User
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row">
          <label className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={17}
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, email or role"
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-slate-400"
            />
          </label>
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
          >
            <option value="ALL">All roles</option>
            <option value="STUDENT">Students</option>
            <option value="MENTOR">Mentors</option>
          </select>
        </div>
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
                  Activity
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((user) => (
                <tr
                  key={`${user.role}-${user.id}`}
                  className="hover:bg-slate-50"
                >
                  <td className="px-5 py-4 font-medium text-slate-900">
                    {user.name}
                  </td>
                  <td className="px-5 py-4 text-slate-500">
                    {user.email || "—"}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500">
                    {user.lastLogin || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-2 p-10 text-center">
            <UsersRound className="text-slate-400" size={24} />
            <p className="text-sm font-medium text-slate-700">No users found</p>
            <p className="text-xs text-slate-500">
              Try a different search or role filter.
            </p>
          </div>
        )}
      </div>

      <p className="text-xs leading-5 text-slate-400">
        Staff and stakeholder account lists are intentionally not fabricated
        here; their list endpoints are not part of the current frontend API
        contract.
      </p>

      {showInviteModal && (
        <AdminInviteUser onClose={() => setShowInviteModal(false)} />
      )}
    </div>
  );
}
