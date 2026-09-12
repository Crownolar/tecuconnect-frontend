import {
  Award,
  CheckCircle2,
  PencilLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { profileData } from "../profile.data";

const infoFields = [
  { label: "Full Name", value: profileData.name },
  { label: "Phone Number", value: profileData.phoneNumber },
  { label: "Department", value: profileData.department },
  { label: "Date of Birth", value: profileData.dateOfBirth },
  { label: "Faculty", value: profileData.faculty },
  { label: "Year of Entry", value: profileData.yearOfEntry },
];

const accountSettings = profileData.accountSettings;

function StatPill({ label, value }) {
  return (
    <div className='rounded-xl border border-slate-200 bg-white px-3 py-2 text-left shadow-sm'>
      <div className='text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500'>
        {label}
      </div>
      <div className='mt-1 text-sm font-semibold text-slate-800'>{value}</div>
    </div>
  );
}

function ProgressBar({ value }) {
  return (
    <div className='mt-3 h-2.5 w-full overflow-hidden rounded-full bg-emerald-100'>
      <div
        className='h-full rounded-full bg-linear-to-r from-emerald-500 to-emerald-400'
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function Profile() {
  return (
    <div className='space-y-6 pb-8 '>
      <section className='overflow-hidden rounded-[20px]   shadow-sm'>
        <div className='px-6 py-5 sm:px-8'>
          <div className='flex flex-col text-[#0F172A] gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <p className='text-[10px]  font-semibold uppercase tracking-[0.22em] '>
                TEC Connect
              </p>
              <h1 className='mt-2 text-3xl font-bold tracking-tight '>
                My Profile
              </h1>
              <p className='mt-2 text-sm '>
                Manage your account and track your entrepreneurial progress.
              </p>
            </div>

            <button
              type='button'
              className='inline-flex items-center justify-center rounded-xl border border-white/20 bg-[#0A3B25] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/15'
            >
              {/* <PencilLine className='mr-2 h-4 w-4' /> */}
              Edit Profile
            </button>
          </div>
        </div>

        <div className='bg-slate-50 p-5 sm:p-6'>
          <div className='flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex items-center gap-4'>
              <div className='flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-emerald-500 text-xl font-bold text-white shadow-sm'>
                {profileData.initials}
              </div>

              <div>
                <div className='flex flex-wrap items-center gap-2'>
                  <h2 className='text-2xl font-bold tracking-tight text-slate-900'>
                    {profileData.name}
                  </h2>
                  <span className='inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700'>
                    {profileData.role}
                  </span>
                </div>

                <div className='mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600'>
                  <div className='flex items-center gap-2'>
                    <span className='text-[#94A3B8]'>{"Matric No: "} </span>
                    <span>{profileData.matricNumber}</span>
                  </div>
                  <span>•</span>
                  <div className='flex items-center gap-2'>
                    <span className='text-[#94A3B8]'>{"Department: "} </span>
                    <span>{profileData.department}</span>
                  </div>
                  <span>•</span>
                  <div className='flex items-center gap-2'>
                    <span className='text-[#94A3B8]'>{"Level: "} </span>
                    <span>{profileData.level}</span>
                  </div>
                </div>

                <div className='mt-2 text-sm text-slate-500'>
                  {profileData.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-[1.5fr_1fr]'>
        {/* personal information and skills section */}
        <div className='flex flex-col gap-5'>
          <section className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6'>
            <h3 className='text-xl font-semibold text-slate-900'>
              Personal Information
            </h3>

            <div className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 '>
              {infoFields.map((field) => (
                <div key={field.label} className=' pb-3'>
                  <div className='text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500'>
                    {field.label}
                  </div>
                  <div className='mt-2 text-base font-medium text-slate-800'>
                    {field.value}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6'>
            <h4 className=' text-xl font-semibold text-slate-900tracking-[0.14em]'>
              Skills & Interests
            </h4>

            <div className='mt-4 flex flex-wrap gap-2'>
              {profileData.skills.map((skill) => (
                <span
                  key={skill}
                  className='rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700'
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
        {/* journey section */}
        <section className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6'>
          <h3 className='text-xl font-semibold text-slate-900'>
            Entrepreneurship Journey
          </h3>

          <div className='mt-5 space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-start justify-between flex-col'>
                <span className='text-sm font-medium text-slate-600'>
                  Current Level:
                </span>
                <span className='text-sm font-semibold text-slate-900'>
                  {profileData.journey.currentLevel}
                </span>
              </div>
              <div>
                <span className='inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold  tracking-[0.12em] text-emerald-500'>
                  Active Stage
                </span>
              </div>
            </div>

            <div className='flex items-center justify-between text-sm'>
              <span className='text-slate-500'>Progress to Next Level</span>
              <span className='font-semibold text-emerald-500'>
                {profileData.journey.progress}%
              </span>
            </div>
            <ProgressBar value={profileData.journey.progress} />

            <div className='grid grid-cols-1 gap-3 pt-1 text-sm text-slate-700'>
              <div className='flex items-center justify-between rounded-xl  px-3 py-2.5'>
                <span>Milestones Achieved</span>
                <span className='font-semibold text-slate-900'>
                  {profileData.journey.milestonesAchieved.completed} of{" "}
                  {profileData.journey.milestonesAchieved.total} verified
                </span>
              </div>

              <div className='flex items-center justify-between rounded-xl px-3 py-2.5'>
                <span>Mentorship Sessions</span>
                <span className='font-semibold text-slate-900'>
                  {profileData.journey.mentorshipSessions.completed} completed
                </span>
              </div>

              <div className='flex items-center justify-between rounded-xl  px-3 py-2.5'>
                <span>TEIS Score</span>
                <span className='font-semibold text-emerald-500'>
                  {profileData.journey.teisScore}
                </span>
              </div>
            </div>
          </div>
        </section>
        {/* Account section */}
        <section className=' col-start-auto col-end-auto rounded-2xl border  md:ol-start-2 md:col-end-3 border-slate-200 bg-white p-5 shadow-sm sm:p-6'>
          <h3 className='text-xl font-semibold text-slate-900'>
            Account Settings
          </h3>

          <div className='mt-5 space-y-3'>
            {accountSettings.map((item) => (
              <div
                key={item.id}
                className='flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between'
              >
                <div className='flex items-start gap-3'>
                  <div className='mt-0.5 rounded-lg bg-emerald-100 p-2 text-emerald-700'>
                    {item.id === "notifications" ? (
                      <Sparkles className='h-4 w-4' />
                    ) : item.id === "security" ? (
                      <ShieldCheck className='h-4 w-4' />
                    ) : (
                      <CheckCircle2 className='h-4 w-4' />
                    )}
                  </div>

                  <div>
                    <div className='font-medium text-slate-800'>
                      {item.title}
                    </div>
                    <div className='text-sm text-slate-500'>
                      {item.description}
                    </div>
                  </div>
                </div>

                <button
                  type='button'
                  className='inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-slate-100'
                >
                  {item.action}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
