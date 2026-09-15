import PageHeader from "../../../../components/shared/PageHeader";

import ProfileIdentityCard from "../components/ProfileIdentityCard";
import PersonalInformation from "../components/PersonalInformation";
import SkillsInterests from "../components/SkillsInterests";
import JourneySummary from "../components/JourneySummary";
import AccountSettings from "../components/AccountSettings";

import { profileData } from "../profile.data";

const Profile = () => {
  const infoFields = [
    { label: "Full Name", value: profileData.name },
    { label: "Phone Number", value: profileData.phoneNumber },
    { label: "Department", value: profileData.department },
    { label: "Date of Birth", value: profileData.dateOfBirth },
    { label: "Faculty", value: profileData.faculty },
    { label: "Year of Entry", value: profileData.yearOfEntry },
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
          >
            Edit Profile
          </button>
        }
      />

      <ProfileIdentityCard
        profile={profileData}
        onEdit={() => console.log("Edit profile")}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <PersonalInformation fields={infoFields} />

          <SkillsInterests skills={profileData.skills} />
        </div>

        <div className="space-y-5">
          <JourneySummary journey={profileData.journey} />

          <AccountSettings settings={profileData.accountSettings} />
        </div>
      </div>
    </div>
  );
};

export default Profile;