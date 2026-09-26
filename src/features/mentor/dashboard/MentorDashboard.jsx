import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Users,
} from "lucide-react";

import MentorMetricCard from "../components/MentorMetricCard";
import ReviewList from "../components/ReviewList";
import { useMentorDashboard } from "../hooks";

export default function MentorDashboard() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useMentorDashboard();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-56 animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-4 w-80 animate-pulse rounded bg-slate-100" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-2xl border border-slate-200 bg-white"
            />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="h-80 animate-pulse rounded-2xl border border-slate-200 bg-white xl:col-span-2" />
          <div className="h-80 animate-pulse rounded-2xl border border-slate-200 bg-white" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-base font-semibold text-red-800">
          Unable to load mentor dashboard
        </h2>

        <p className="mt-2 text-sm text-red-700">
          {error?.message ||
            "Something went wrong while loading your dashboard."}
        </p>
      </div>
    );
  }

  const stats = data?.stats || [];
  const upcomingSessions = data?.upcomingSessions || [];
  const activity = data?.activity || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Mentor Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Review your students, milestone claims and mentorship activity.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <MentorMetricCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            detail={stat.detail}
          />
        ))}
      </div>

      {/* Main dashboard */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Pending reviews */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Pending Reviews
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Milestone claims waiting for your verification.
              </p>
            </div>

            <Clock3 className="h-5 w-5 text-slate-400" />
          </div>

          <ReviewList />
        </section>

        {/* Upcoming sessions */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Upcoming Sessions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your next mentorship sessions.
              </p>
            </div>

            <CalendarDays className="h-5 w-5 text-slate-400" />
          </div>

          {upcomingSessions.length === 0 ? (
            <div className="flex min-h-40 flex-col items-center justify-center text-center">
              <CalendarDays className="h-8 w-8 text-slate-300" />

              <p className="mt-3 text-sm font-medium text-slate-600">
                No upcoming sessions
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Your scheduled mentorship sessions will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {session.title}
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    {session.student}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                    <CalendarDays className="h-3.5 w-3.5" />
                    <span>{session.date}</span>
                    <span>•</span>
                    <span>{session.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Activity */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Recent Activity
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Recent student and mentorship activity.
            </p>
          </div>

          <CheckCircle2 className="h-5 w-5 text-slate-400" />
        </div>

        {activity.length === 0 ? (
          <div className="flex min-h-32 flex-col items-center justify-center text-center">
            <Users className="h-7 w-7 text-slate-300" />

            <p className="mt-3 text-sm font-medium text-slate-600">
              No recent activity
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {activity.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100">
                    <CheckCircle2 className="h-4 w-4 text-slate-500" />
                  </div>

                  <p className="text-sm text-slate-700">
                    {item.text}
                  </p>
                </div>

                <span className="shrink-0 text-xs text-slate-400">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}