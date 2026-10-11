import { AlertCircle, RefreshCw, UserCircle2 } from "lucide-react";

import ProfileHeader from "./components/ProfileHeader";
import ProfessionalInformation from "./components/ProfessionalInformation";
import MentorshipOverview from "./components/MentorshipOverview";

import {
  useStaffProfile,
  useStaffProfileAssessments,
  useStaffProfilePendingReviews,
  useStaffProfileSessions,
  useStaffProfileStudents,
} from "./hooks";

export default function Profile() {
  const profileQuery = useStaffProfile();
  const studentsQuery = useStaffProfileStudents();
  const reviewsQuery = useStaffProfilePendingReviews();
  const sessionsQuery = useStaffProfileSessions();
  const assessmentsQuery = useStaffProfileAssessments();

  const isLoading = profileQuery.isLoading;
  const hasError = profileQuery.isError;

  const profile = profileQuery.data?.user ?? profileQuery.data;
  const students = studentsQuery.data ?? [];
  const pendingReviews = reviewsQuery.data?.items ?? [];
  const sessions = sessionsQuery.data ?? [];
  const assessments = assessmentsQuery.data?.items ?? [];

  const refresh = () => {
    profileQuery.refetch();
    studentsQuery.refetch();
    reviewsQuery.refetch();
    sessionsQuery.refetch();
    assessmentsQuery.refetch();
  };

  return (
    <div className='space-y-6 pb-8'>
      <header className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.18em] text-primary'>
            Staff Portal
          </p>

          <div className='mt-1 flex items-center gap-2'>
            <UserCircle2 className='h-6 w-6 text-primary' />

            <h1 className='text-2xl font-bold tracking-tight text-text-primary'>
              My Profile
            </h1>
          </div>

          <p className='mt-1 text-sm text-text-secondary'>
            View your staff identity, account information, and live mentorship
            activity.
          </p>
        </div>

        <button
          type='button'
          onClick={refresh}
          disabled={profileQuery.isFetching}
          className='inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-text-primary hover:bg-slate-50 disabled:opacity-60'
        >
          <RefreshCw
            className={`h-4 w-4 ${
              profileQuery.isFetching ? "animate-spin" : ""
            }`}
          />
          Refresh
        </button>
      </header>

      {hasError ? (
        <div className='rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
          <div className='flex items-start gap-3'>
            <AlertCircle className='mt-0.5 h-5 w-5 shrink-0' />

            <div>
              <div className='font-semibold'>Unable to load your profile.</div>

              <div className='mt-1'>
                Refresh the page and try again. Your authenticated session may
                also need to be renewed.
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isLoading ? (
        <div className='space-y-6'>
          <div className='h-32 animate-pulse rounded-2xl border border-border bg-white' />
          <div className='h-56 animate-pulse rounded-2xl border border-border bg-white' />
        </div>
      ) : profile ? (
        <>
          <ProfileHeader user={profile} />

          <ProfessionalInformation user={profile} />

          <MentorshipOverview
            students={students}
            pendingReviews={pendingReviews}
            sessions={sessions}
            assessments={assessments}
          />

          {studentsQuery.isError ||
          reviewsQuery.isError ||
          sessionsQuery.isError ||
          assessmentsQuery.isError ? (
            <div className='rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800'>
              Some mentorship statistics could not be loaded. The profile itself
              is available; use Refresh to retry the activity data.
            </div>
          ) : null}
        </>
      ) : (
        <div className='rounded-xl border border-dashed border-border bg-white p-10 text-center text-sm text-text-secondary'>
          No authenticated mentor profile was returned.
        </div>
      )}
    </div>
  );
}
