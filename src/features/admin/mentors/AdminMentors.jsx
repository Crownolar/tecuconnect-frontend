import { useMemo, useState } from "react";
import { Edit3, Search, UserPlus, UserRound, UserX } from "lucide-react";

import {
  useAdminCatalog,
  useAdminDeactivateMentor,
  useAdminMentors,
  useAdminStudents,
  useAdminUpdateMentor,
  useAssignMentor,
} from "../hooks";

import AdminInviteUser from "../users/AdminInviteUser";

function ErrorMessage({ error }) {
  if (!error) return null;

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {error?.data?.message ||
        error?.data?.error ||
        error?.message ||
        "Something went wrong."}
    </div>
  );
}

function StatusBadge({ active }) {
  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
        active
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-600",
      ].join(" ")}
    >
      {active ? "ACTIVE" : "INACTIVE"}
    </span>
  );
}

export default function AdminMentors() {
  const mentorsQuery = useAdminMentors();
  const studentsQuery = useAdminStudents();
  const catalogQuery = useAdminCatalog();

  const assignMutation = useAssignMentor();
  const updateMutation = useAdminUpdateMentor();
  const deactivateMutation = useAdminDeactivateMentor();

  const [search, setSearch] = useState("");

  const [mentorId, setMentorId] = useState("");
  const [studentId, setStudentId] = useState("");

  const [editingMentor, setEditingMentor] = useState(null);
  const [deactivatingMentor, setDeactivatingMentor] = useState(null);

  const [showInvite, setShowInvite] = useState(false);

  const [assignMessage, setAssignMessage] = useState("");
  const [assignError, setAssignError] = useState("");

  const [editError, setEditError] = useState("");
  const [deactivateError, setDeactivateError] = useState("");

  const [editForm, setEditForm] = useState({
    specialization: "",
    expertise: "",
    bio: "",
    maxMentees: "",
    departmentId: "",
  });

  const [deactivateReason, setDeactivateReason] = useState("");

  const mentors = mentorsQuery.data ?? [];
  const students = studentsQuery.data ?? [];
  const departments = catalogQuery.data?.departments ?? [];

  const filteredMentors = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return mentors;

    return mentors.filter((mentor) =>
      [mentor.name, mentor.email, mentor.specialization, mentor.department]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [mentors, search]);

  const selectedMentor = useMemo(
    () => mentors.find((mentor) => mentor.id === mentorId),
    [mentors, mentorId],
  );

  const openEdit = (mentor) => {
    setEditError("");

    setEditingMentor(mentor);

    setEditForm({
      specialization: mentor.specialization || "",
      expertise: Array.isArray(mentor.expertise)
        ? mentor.expertise.join(", ")
        : mentor.expertise || "",
      bio: mentor.bio || "",
      maxMentees:
        mentor.maxMentees === null || mentor.maxMentees === undefined
          ? ""
          : String(mentor.maxMentees),
      departmentId: mentor.departmentId || mentor.department?.id || "",
    });
  };

  const handleAssign = async (event) => {
    event.preventDefault();

    setAssignMessage("");
    setAssignError("");

    if (!mentorId || !studentId) {
      setAssignError("Select both a mentor and a student.");
      return;
    }

    try {
      await assignMutation.mutateAsync({
        mentorId,
        studentId,
      });

      setAssignMessage("Student assigned to mentor successfully.");

      setStudentId("");
    } catch (error) {
      setAssignError(
        error?.data?.message ||
          error?.data?.error ||
          error?.message ||
          "Unable to assign student.",
      );
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    if (!editingMentor) return;

    setEditError("");

    const payload = {
      specialization: editForm.specialization.trim() || undefined,

      expertise: editForm.expertise
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      bio: editForm.bio.trim() || undefined,

      maxMentees:
        editForm.maxMentees === "" ? undefined : Number(editForm.maxMentees),

      departmentId: editForm.departmentId || undefined,
    };

    try {
      await updateMutation.mutateAsync({
        mentorId: editingMentor.id,
        payload,
      });

      setEditingMentor(null);
    } catch (error) {
      setEditError(
        error?.data?.message ||
          error?.data?.error ||
          error?.message ||
          "Unable to update mentor.",
      );
    }
  };

  const handleDeactivate = async (event) => {
    event.preventDefault();

    if (!deactivatingMentor) return;

    setDeactivateError("");

    try {
      await deactivateMutation.mutateAsync({
        mentorId: deactivatingMentor.id,
        reason: deactivateReason.trim(),
      });

      setDeactivatingMentor(null);
      setDeactivateReason("");
    } catch (error) {
      setDeactivateError(
        error?.data?.message ||
          error?.data?.error ||
          error?.message ||
          "Unable to deactivate mentor.",
      );
    }
  };

  if (
    mentorsQuery.isLoading ||
    studentsQuery.isLoading ||
    catalogQuery.isLoading
  ) {
    return (
      <div className="p-6 text-sm text-slate-500">
        Loading mentor management...
      </div>
    );
  }

  if (mentorsQuery.isError || studentsQuery.isError || catalogQuery.isError) {
    return (
      <div className="space-y-4 p-6">
        <ErrorMessage
          error={
            mentorsQuery.error || studentsQuery.error || catalogQuery.error
          }
        />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-600">
              Administration
            </p>

            <h1 className="mt-1 text-2xl font-semibold text-slate-900">
              Mentor Management
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage mentors and their student assignments.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowInvite(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            <UserPlus size={16} />
            Invite Mentor
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total mentors</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {mentors.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Active mentors</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {mentors.filter((mentor) => mentor.isActive !== false).length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Students available</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {students.length}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            <div className="min-w-0 flex-1">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Search mentors
              </label>

              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by name, email, specialization..."
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>
            </div>

            <form
              onSubmit={handleAssign}
              className="grid gap-3 sm:grid-cols-2 lg:w-[620px]"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Mentor
                </label>

                <select
                  value={mentorId}
                  onChange={(event) => setMentorId(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                >
                  <option value="">Select mentor</option>

                  {mentors
                    .filter((mentor) => mentor.isActive !== false)
                    .map((mentor) => (
                      <option key={mentor.id} value={mentor.id}>
                        {mentor.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Student
                </label>

                <select
                  value={studentId}
                  onChange={(event) => setStudentId(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-slate-400"
                >
                  <option value="">Select student</option>

                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={assignMutation.isPending}
                className="sm:col-span-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                {assignMutation.isPending ? "Assigning..." : "Assign Student"}
              </button>
            </form>
          </div>

          {assignMessage && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {assignMessage}
            </div>
          )}

          {assignError && (
            <div className="mt-4">
              <ErrorMessage error={{ message: assignError }} />
            </div>
          )}

          {selectedMentor && (
            <p className="mt-4 text-xs text-slate-500">
              Assigning students to{" "}
              <span className="font-semibold text-slate-700">
                {selectedMentor.name}
              </span>
              .
            </p>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-4">Mentor</th>
                  <th className="px-5 py-4">Specialization</th>
                  <th className="px-5 py-4">Department</th>
                  <th className="px-5 py-4">Mentees</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredMentors.map((mentor) => (
                  <tr key={mentor.id} className="text-sm hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                          <UserRound size={17} />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {mentor.name}
                          </p>

                          <p className="text-xs text-slate-500">
                            {mentor.email || "—"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {mentor.specialization || "—"}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {mentor.department || "—"}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {mentor.menteesCount ?? mentor.currentMentees ?? "—"}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge active={mentor.isActive !== false} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(mentor)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-white"
                        >
                          <Edit3 size={14} />
                          Edit
                        </button>

                        {mentor.isActive !== false && (
                          <button
                            type="button"
                            onClick={() => {
                              setDeactivateError("");
                              setDeactivateReason("");
                              setDeactivatingMentor(mentor);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-50"
                          >
                            <UserX size={14} />
                            Deactivate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {!filteredMentors.length && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-sm text-slate-500"
                    >
                      No mentors match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editingMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={handleEditSubmit}
            className="w-full max-w-xl space-y-5 rounded-2xl bg-white p-6 shadow-xl"
          >
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Edit Mentor
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update mentor profile information.
              </p>
            </div>

            {editError && <ErrorMessage error={{ message: editError }} />}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Specialization
              </label>

              <input
                value={editForm.specialization}
                onChange={(event) =>
                  setEditForm((current) => ({
                    ...current,
                    specialization: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Expertise
              </label>

              <input
                value={editForm.expertise}
                onChange={(event) =>
                  setEditForm((current) => ({
                    ...current,
                    expertise: event.target.value,
                  }))
                }
                placeholder="Business validation, Marketing, Finance"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
              />

              <p className="mt-1 text-xs text-slate-500">
                Separate multiple expertise areas with commas.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Bio
              </label>

              <textarea
                value={editForm.bio}
                onChange={(event) =>
                  setEditForm((current) => ({
                    ...current,
                    bio: event.target.value,
                  }))
                }
                rows={4}
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Maximum mentees
                </label>

                <input
                  type="number"
                  min="0"
                  value={editForm.maxMentees}
                  onChange={(event) =>
                    setEditForm((current) => ({
                      ...current,
                      maxMentees: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Department
                </label>

                <select
                  value={editForm.departmentId}
                  onChange={(event) =>
                    setEditForm((current) => ({
                      ...current,
                      departmentId: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
                >
                  <option value="">Select department</option>

                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingMentor(null)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
              >
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}

      {deactivatingMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={handleDeactivate}
            className="w-full max-w-md space-y-5 rounded-2xl bg-white p-6 shadow-xl"
          >
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Deactivate Mentor
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Deactivate{" "}
                <span className="font-semibold text-slate-700">
                  {deactivatingMentor.name}
                </span>
                ?
              </p>
            </div>

            {deactivateError && (
              <ErrorMessage error={{ message: deactivateError }} />
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Reason
              </label>

              <textarea
                value={deactivateReason}
                onChange={(event) => setDeactivateReason(event.target.value)}
                rows={4}
                required
                placeholder="Reason for deactivation..."
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeactivatingMentor(null)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={deactivateMutation.isPending}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
              >
                {deactivateMutation.isPending
                  ? "Deactivating..."
                  : "Deactivate"}
              </button>
            </div>
          </form>
        </div>
      )}

      {showInvite && (
        <AdminInviteUser
          defaultRole="MENTOR"
          onClose={() => setShowInvite(false)}
        />
      )}
    </>
  );
}
