import AdminUserForm from "./AdminUserForm";

export default function AdminCreateUser() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-slate-500">
          User Management
        </p>

        <h1 className="mt-1 text-2xl font-semibold text-slate-900">
          Enroll Student
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Create and enroll a student account for access to the TEC-TRAK
          Student Portal.
        </p>
      </div>

      <AdminUserForm />
    </div>
  );
}