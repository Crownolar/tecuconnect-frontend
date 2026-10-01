import PageHeader from "../../../../components/shared/PageHeader";

import ProfileIdentityCard from "../components/ProfileIdentityCard";
import PersonalInformation from "../components/PersonalInformation";
import SkillsInterests from "../components/SkillsInterests";
import JourneySummary from "../components/JourneySummary";
import AccountSettings from "../components/AccountSettings";

import { useAuth } from "../../../../hooks/useAuth";
import { useDepartment } from "../../../../services/catalog/catalog.hooks";

const Profile = () => {
  const { user } = useAuth();

  const student = user?.student;

  const {
    data: department,
    isLoading: departmentLoading,
  } = useDepartment(student?.departmentId);

  const fullName =
    `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

  const initials =
    `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase();

  /*
   * This object adapts the backend user/student response
   * to the shape expected by ProfileIdentityCard.
   */
  const profile = {
    name: fullName || "Student",
    initials: initials || "ST",
    role: user?.role ?? "STUDENT",

    email: user?.email ?? "—",
    phoneNumber: user?.phone ?? "—",

    matricNumber: student?.matricNumber ?? "—",
    department: departmentLoading
      ? "Loading..."
      : department?.name ?? "—",

    faculty: department?.faculty?.name ?? "—",

    level: student?.level ?? "—",

    yearOfEntry: student?.admissionYear ?? "—",

    degreeProgramme: student?.degreeProgramme ?? "—",
  };

  /*
   * Personal information displayed by the existing component.
   */
  const infoFields = [
    {
      label: "Full Name",
      value: fullName || "—",
    },
    {
      label: "Email",
      value: user?.email ?? "—",
    },
    {
      label: "Phone Number",
      value: user?.phone ?? "—",
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
      value: departmentLoading
        ? "Loading..."
        : department?.name ?? "—",
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

  /*
   * Skills are not currently supplied by the student response
   * you showed us.
   *
   * Do NOT invent them.
   */
  const skills = [];

  /*
   * Journey data will eventually come from the real progress API.
   * For now we only use values actually available on the student.
   */
  const journey = {
    currentLevel: student?.currentMaturityLevel ?? "—",
    progress: 0,
    milestonesAchieved: {
      completed: 0,
      total: 0,
    },
    mentorshipSessions: {
      completed: 0,
    },
    teisScore: student?.teisScore ?? null,
  };

  /*
   * Account settings are UI actions, not backend student data.
   * Keep these until their corresponding APIs are implemented.
   */
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
        action={
          <button
            type="button"
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-dark"
            onClick={() => console.log("Edit profile")}
          >
            Edit Profile
          </button>
        }
      />

      <ProfileIdentityCard
        profile={profile}
        onEdit={() => console.log("Edit profile")}
      />

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
    </div>
  );
};

export default Profile;