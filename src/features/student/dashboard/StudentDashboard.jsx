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

import { dashboardData } from "../../../mocks/dashboard";

export default function StudentDashboard() {
  const {
    metrics,
    journey,
    nextAction,
    activities,
    mentorship,
  } = dashboardData;

  const metricIcons = [
    BarChart3,
    Gauge,
    Award,
    ChartNoAxesCombined,
  ];

  return (
    <div className="space-y-6 sm:space-y-7">
      {/* =========================================
          WELCOME
          ========================================= */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
          Good morning, Yusuf 👋
        </h1>

        <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
          Here's an overview of your entrepreneurial journey.
        </p>
      </div>

      {/* =========================================
          METRICS
          ========================================= */}
      <section
        className="
          grid grid-cols-1 gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
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

      {/* =========================================
          JOURNEY
          ========================================= */}
      <JourneyTracker stages={journey.stages} />

      {/* =========================================
          NEXT ACTION
          ========================================= */}
      <NextActionCard
        {...nextAction}
        onAction={() => {
          console.log("Continue milestone");
        }}
      />

      {/* =========================================
          ACTIVITY + MENTORSHIP
          ========================================= */}
      <section
        className="
          grid grid-cols-1 gap-5
          lg:grid-cols-2
        "
      >
        <ActivityTimeline activities={activities} />

        <MentorshipCard mentorship={mentorship} />
      </section>
    </div>
  );
}