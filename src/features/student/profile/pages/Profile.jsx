import { useState } from "react";
import PageHeader from "../../../../components/shared/PageHeader";

import ProfileIdentityCard from "../components/ProfileIdentityCard";
import PersonalInformation from "../components/PersonalInformation";
import SkillsInterests from "../components/SkillsInterests";
import JourneySummary from "../components/JourneySummary";
import AccountSettings from "../components/AccountSettings";

import { useNavigate } from "react-router-dom";
import { PencilLine, X, Loader2 } from "lucide-react";

import { useProfile, useUpdateProfile } from "../hook/useProfile";

const Field = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}) => {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
      />
    </label>
  );
};

const SelectField = ({ label, name, value, onChange, options }) => {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
      >
        <option value="">Select...</option>

        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
};

const Profile = () => {
  const { data: student, isLoading, isError, error } = useProfile();
  const updateProfileMutation = useUpdateProfile();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    degreeProgramme: "",
    dateOfBirth: "",
    gender: "",
    disabilityStatus: "",
    socioeconomicBackground: "",
    isRural: false,
  });

  const openEditProfile = () => {
    setForm({
      firstName: student?.user?.firstName ?? "",
      lastName: student?.user?.lastName ?? "",
      phone: student?.user?.phone ?? "",
      degreeProgramme: student?.degreeProgramme ?? "",
      dateOfBirth: student?.dateOfBirth ? student.dateOfBirth.slice(0, 10) : "",
      gender: student?.gender ?? "",
      disabilityStatus: student?.disabilityStatus ?? "",
      socioeconomicBackground: student?.socioeconomicBackground ?? "",
      isRural: student?.isRural ?? false,
    });

    setIsEditOpen(true);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    updateProfileMutation.mutate(form, {
      onSuccess: () => {
        setIsEditOpen(false);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="My Profile"
          description="Manage your account and track your entrepreneurial progress."
        />

        <div className="rounded-2xl border border-border bg-white p-6">
          <p className="text-sm text-text-secondary">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="My Profile"
          description="Manage your account and track your entrepreneurial progress."
        />

        <div className="rounded-2xl border border-red-200 bg-white p-6">
          <h2 className="font-semibold text-text-primary">
            Unable to load profile
          </h2>

          <p className="mt-1 text-sm text-text-secondary">
            {error?.message ||
              "Something went wrong while loading your profile."}
          </p>
        </div>
      </div>
    );
  }

  const user = student?.user;
  const summary = student?.summary;

  const name =
    summary?.name ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    "Student";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const email = summary?.email || user?.email || "—";

  const departmentName =
    summary?.department || student?.department?.name || "—";

  const facultyName =
    summary?.faculty || student?.department?.faculty?.name || "—";

  const profile = {
    name,
    initials: initials || "ST",
    role: "STUDENT",
    email,
    matricNumber: student?.matricNumber ?? "—",
    department: departmentName,
    faculty: facultyName,
    level: student?.level ?? "—",
    avatarUrl: user?.avatarUrl ?? null,
  };

  const infoFields = [
    {
      label: "Full Name",
      value: name,
    },
    {
      label: "Email",
      value: email,
    },
    {
      label: "Matric Number",
      value: student?.matricNumber ?? "—",
    },
    {
      label: "Programme",
      value: student?.degreeProgramme ?? "—",
    },
    {
      label: "Department",
      value: departmentName,
    },
    {
      label: "Faculty",
      value: facultyName,
    },
    {
      label: "Level",
      value: student?.level ?? "—",
    },
    {
      label: "Admission Year",
      value: student?.admissionYear ?? "—",
    },
  ];

  const skills = (student?.skills ?? [])
    .map((item) => item.label || item.skill?.name)
    .filter(Boolean);

  const journey = {
    currentLevel:
      summary?.currentMaturityLabel || summary?.currentMaturityLevel || "—",

    progress: Number(summary?.progressPct ?? 0),

    milestonesAchieved: {
      completed: Number(summary?.milestonesVerified ?? 0),
      total: Number(summary?.milestoneTarget ?? 0),
    },

    mentorshipSessions: {
      completed: Number(summary?.mentorshipSessions ?? 0),
    },

    teisScore: Number(summary?.teisScore ?? 0),
  };

  const accountSettings = [
    {
      id: "notifications",
      title: "Notification Preferences",
      description: "Manage how you receive TEC-TRAK notifications.",
      action: "Manage",
    },
    {
      id: "security",
      title: "Security",
      description: "Manage your account security settings.",
      action: "Manage",
    },
  ];

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="My Profile"
        description="Manage your account and track your entrepreneurial progress."
      />

      <ProfileIdentityCard profile={profile} onEdit={openEditProfile} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <PersonalInformation fields={infoFields} />

          <SkillsInterests skills={skills} />
        </div>

        <div className="space-y-5">
          <JourneySummary journey={journey} />

          <AccountSettings settings={accountSettings} />
        </div>
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Edit Profile
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update your personal information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="First Name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />

                <Field
                  label="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />

                <Field
                  label="Phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />

                <Field
                  label="Degree Programme"
                  name="degreeProgramme"
                  value={form.degreeProgramme}
                  onChange={handleChange}
                />

                <Field
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                />

                <SelectField
                  label="Gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  options={[
                    ["MALE", "Male"],
                    ["FEMALE", "Female"],
                    ["OTHER", "Other"],
                  ]}
                />

                <SelectField
                  label="Disability Status"
                  name="disabilityStatus"
                  value={form.disabilityStatus}
                  onChange={handleChange}
                  options={[
                    ["NONE", "None"],
                    ["VISUAL", "Visual"],
                    ["HEARING", "Hearing"],
                    ["PHYSICAL", "Physical"],
                    ["OTHER", "Other"],
                  ]}
                />

                <SelectField
                  label="Socioeconomic Background"
                  name="socioeconomicBackground"
                  value={form.socioeconomicBackground}
                  onChange={handleChange}
                  options={[
                    ["LOW", "Low"],
                    ["MIDDLE", "Middle"],
                    ["HIGH", "High"],
                  ]}
                />
              </div>

              <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <input
                  type="checkbox"
                  name="isRural"
                  checked={form.isRural}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-slate-300"
                />

                <span className="text-sm text-slate-700">
                  I come from a rural area
                </span>
              </label>

              {updateProfileMutation.isError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {updateProfileMutation.error?.message ||
                    "Unable to update your profile. Please try again."}
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={updateProfileMutation.isPending}
                  className="inline-flex items-center justify-center rounded-lg bg-[#0A3B25] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0F5132] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {updateProfileMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}

                  {updateProfileMutation.isPending
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
