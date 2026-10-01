import { useState } from "react";
import { adminUsersService } from "./adminUsers.service";
import { useDepartments } from "../../../services/catalog/catalog.hooks";

const initialForm = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phone: "",
  matricNumber: "",
  level: "LEVEL_100",
  departmentId: "",
  degreeProgramme: "",
  admissionYear: "",
  expectedGraduationYear: "",
  gender: "MALE",
  disabilityStatus: "NONE",
  socioeconomicBackground: "LOW",
  isRural: false,
};

const levels = [
  "LEVEL_100",
  "LEVEL_200",
  "LEVEL_300",
  "LEVEL_400",
  "LEVEL_500",
];

const genders = ["MALE", "FEMALE"];

const disabilityStatuses = ["NONE", "VISUAL", "HEARING", "PHYSICAL", "OTHER"];

const socioeconomicBackgrounds = ["LOW", "MIDDLE", "HIGH"];

export default function AdminUserForm() {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [createdUser, setCreatedUser] = useState(null);

  const {
    data: departments = [],
    isLoading: departmentsLoading,
    isError: departmentsError,
  } = useDepartments();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setCreatedUser(null);
    setIsSubmitting(true);

    try {
      const payload = {
        ...form,
        admissionYear: Number(form.admissionYear),
        expectedGraduationYear: Number(form.expectedGraduationYear),
      };

      const response = await adminUsersService.registerStudent(payload);

      console.log("Student enrollment response:", response);

      setSuccess(response?.message || "Student enrolled successfully.");
      setCreatedUser(response?.user || null);

      setForm(initialForm);
    } catch (err) {
      console.error("Student enrollment failed:", err);

      setError(
        err?.data?.message || err?.message || "Unable to enroll student.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal information */}
        <section>
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Basic information for the student's TEC-TRAK account.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="First name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Yusuf"
              required
            />

            <Field
              label="Last name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Abdulrahman"
              required
            />

            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="student@example.com"
              required
            />

            <Field
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="08012345678"
              required
            />

            <Field
              label="Matric number"
              name="matricNumber"
              value={form.matricNumber}
              onChange={handleChange}
              placeholder="19/ENG/0452"
              required
            />

            <Field
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Temporary password"
              required
            />
          </div>
        </section>

        {/* Academic information */}
        <section>
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Academic Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Information used to establish the student's academic profile.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              label="Level"
              name="level"
              value={form.level}
              onChange={handleChange}
              options={levels}
            />

            <select
              name="departmentId"
              value={form.departmentId}
              onChange={handleChange}
              required
              disabled={departmentsLoading}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500"
            >
              <option value="">
                {departmentsLoading
                  ? "Loading departments..."
                  : "Select department"}
              </option>

              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}

              {departmentsError && (
                <p className="mt-1 text-sm text-red-600">
                  Unable to load departments. Please try again.
                </p>
              )}
            </select>

            <Field
              label="Degree programme"
              name="degreeProgramme"
              value={form.degreeProgramme}
              onChange={handleChange}
              placeholder="Computer Science"
              required
            />

            <Field
              label="Admission year"
              name="admissionYear"
              type="number"
              value={form.admissionYear}
              onChange={handleChange}
              placeholder="2023"
              required
            />

            <Field
              label="Expected graduation year"
              name="expectedGraduationYear"
              type="number"
              value={form.expectedGraduationYear}
              onChange={handleChange}
              placeholder="2027"
              required
            />

            <SelectField
              label="Gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              options={genders}
            />
          </div>
        </section>

        {/* Additional information */}
        <section>
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Additional Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Additional information captured during student enrollment.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              label="Disability status"
              name="disabilityStatus"
              value={form.disabilityStatus}
              onChange={handleChange}
              options={disabilityStatuses}
            />

            <SelectField
              label="Socioeconomic background"
              name="socioeconomicBackground"
              value={form.socioeconomicBackground}
              onChange={handleChange}
              options={socioeconomicBackgrounds}
            />

            <label className="flex items-center gap-3 sm:col-span-2">
              <input
                type="checkbox"
                name="isRural"
                checked={form.isRural}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300"
              />

              <span>
                <span className="block text-sm font-medium text-slate-700">
                  Rural background
                </span>

                <span className="block text-xs text-slate-500">
                  Indicate whether the student is from a rural area.
                </span>
              </span>
            </label>
          </div>
        </section>

        {/* Feedback */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {createdUser && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">
              Account created
            </p>

            <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {createdUser.firstName} {createdUser.lastName}
              </p>

              <p>
                <span className="font-medium">Email:</span> {createdUser.email}
              </p>

              <p>
                <span className="font-medium">Role:</span> {createdUser.role}
              </p>

              <p>
                <span className="font-medium">Status:</span>{" "}
                {createdUser.status}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Enrolling student..." : "Enroll Student"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option.replaceAll("_", " ")}
          </option>
        ))}
      </select>
    </div>
  );
}
