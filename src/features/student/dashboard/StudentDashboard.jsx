import {
  BarChart3,
  Gauge,
  Award,
  ChartNoAxesCombined,
} from "lucide-react";

import MetricCard from "./components/MetricCard";
import JourneyTracker from "./components/JourneyTracker";
import NextActionCard from "./components/NextActionCard";
import ActivityTimeline from "./components/ActivityTimeline";
import MentorshipCard from "./components/MentorshipCard";

import { useStudentDashboard } from "./hooks";

function formatLevel(level) {
  if (!level) return "—";

  return level
    .replace(/^LEVEL_/, "Level ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDateTime(value) {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getActivityStatus(type) {
  if (
    type === "MILESTONE_VERIFIED" ||
    type === "LEVEL_UPGRADE"
  ) {
    return "success";
  }

  if (
    type === "MILESTONE_PENDING" ||
    type === "ATTENDANCE_ALERT" ||
    type === "MENTOR_SESSION_REMINDER"
  ) {
    return "info";
  }

  return "default";
}

function getNextAction(data) {
  const milestones = data?.milestones;

  if (!milestones) {
    return {
      title: "Continue your entrepreneurial journey",
      description:
        "Complete your next available programme activity.",
      action: "View Milestones",
    };
  }

  if (milestones.needsChanges > 0) {
    return {
      title: "Changes requested on a milestone",
      description:
        "Review the mentor feedback and update your milestone evidence.",
      action: "Review Milestone",
    };
  }

  if (milestones.pending > 0) {
    return {
      title: "Milestone awaiting mentor review",
      description:
        "You have submitted milestone evidence that is waiting for review.",
      action: "View Milestones",
    };
  }

  return {
    title: "Continue your entrepreneurial journey",
    description:
      "Claim your next milestone and keep building your verified progress.",
    action: "View Milestones",
  };
}

export default function StudentDashboard() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useStudentDashboard();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-7 w-64 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-80 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-xl bg-slate-200"
            />
          ))}
        </div>

        <div className="h-40 animate-pulse rounded-xl bg-slate-200" />

        <div className="h-24 animate-pulse rounded-xl bg-slate-200" />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="h-64 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-64 animate-pulse rounded-xl bg-slate-200" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5">
        <h2 className="font-semibold text-red-800">
          Unable to load dashboard
        </h2>

        <p className="mt-1 text-sm text-red-600">
          {error?.message ||
            "Something went wrong while loading your dashboard."}
        </p>
      </div>
    );
  }

  const dashboard = data ?? {};

  const milestones = dashboard.milestones ?? {};
  const journey = dashboard.journey ?? {};
  const recentActivity = dashboard.recentActivity ?? [];
  const upcomingSessions = dashboard.upcomingSessions ?? [];

  const metricIcons = [
    BarChart3,
    Gauge,
    Award,
    ChartNoAxesCombined,
  ];

  const metrics = [
    {
      id: "maturity",
      label: "Entrepreneurial Maturity",
      value:
        dashboard.currentMaturityLabel ||
        formatLevel(dashboard.currentMaturityLevel),
      subtitle: dashboard.currentMaturityLevel
        ? formatLevel(dashboard.currentMaturityLevel)
        : "Not available",
    },
    {
      id: "teis",
      label: "TEIS Score",
      value:
        dashboard.teisScore !== null &&
        dashboard.teisScore !== undefined
          ? `${dashboard.teisScore}/100`
          : "—",
      subtitle:
        dashboard.teisDelta !== null &&
        dashboard.teisDelta !== undefined
          ? `${
              dashboard.teisDelta >= 0 ? "+" : ""
            }${dashboard.teisDelta} change`
          : "No previous score",
    },
    {
      id: "milestones",
      label: "Verified Milestones",
      value: milestones.verified ?? 0,
      subtitle: `${milestones.verifiedThisMonth ?? 0} this month`,
    },
    {
      id: "skills",
      label: "Skills Assessed",
      value: dashboard.skillsAssessed ?? 0,
      subtitle: "Competencies assessed",
    },
  ];

  const activities = recentActivity.map((activity) => ({
    id: activity.id,
    title: activity.title,
    time: formatDateTime(activity.createdAt),
    status: getActivityStatus(activity.type),
  }));

  const upcomingSession = upcomingSessions[0];

  const mentorship = upcomingSession
    ? {
        title:
          upcomingSession.title ||
          upcomingSession.sessionType ||
          "Mentorship Session",
        date: formatDateTime(
          upcomingSession.scheduledFor ||
            upcomingSession.sessionDate,
        ),
        time: "",
        mentor: {
          name:
            upcomingSession.mentor?.name ||
            "TEC Mentor",
          role: "TEC Mentor",
        },
      }
    : null;

  const nextAction = getNextAction(dashboard);

  return (
    <div className="space-y-6 sm:space-y-7">
      {/* Welcome */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
          Welcome back 👋
        </h1>

        <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
          Here's an overview of your entrepreneurial journey.
        </p>
      </div>

      {/* Metrics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metricIcons[index];

          return (
            <MetricCard
              key={metric.id}
              {...metric}
              icon={Icon}
            />
          );
        })}
      </section>

      {/* Journey */}
      <JourneyTracker
        currentLevel={dashboard.currentMaturityLevel}
        currentLevelLabel={dashboard.currentMaturityLabel}
        targetLevel={journey.targetLevel}
        progressPct={journey.progressPct}
        met={journey.met}
        total={journey.total}
      />

      {/* Next action */}
      <NextActionCard
        {...nextAction}
        onAction={() => {
          window.location.href = "/student/milestones";
        }}
      />

      {/* Activity + mentorship */}
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ActivityTimeline activities={activities} />

        <MentorshipCard mentorship={mentorship} />
      </section>
    </div>
  );
}