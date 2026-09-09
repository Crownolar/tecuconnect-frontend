import { journey } from "../../../mocks/journey";

import JourneyTracker from "./components/JourneyTracker";
import CurrentLevelCard from "./components/CurrentLevelCard";
import DevelopmentAreas from "./components/DevelopmentAreas";
import NextRequirement from "./components/NextRequirement";
import AchievementList from "./components/AchievementList";

import Button from "../../../components/ui/Button";

export default function MyJourney() {
  return (
    <div className="space-y-7 bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div>
        <h1 className="text-[28px] font-bold text-[#142033]">My Journey</h1>

        <p className="mt-1 text-[14px] font-normal text-[#53657D]">
          Track your entrepreneurial development, competencies and progress.
        </p>
      </div>

      {/* Journey Tracker */}
      <JourneyTracker orientation="horizontal" stages={journey.stages} />

      {/* Two-Column Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          <CurrentLevelCard
            currentLevel={journey.currentLevel}
            progress={journey.progress}
          />

          <DevelopmentAreas areas={journey.developmentAreas} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <NextRequirement
            progress={journey.progress}
            nextLevel={journey.nextLevel}
          />

          <AchievementList achievements={journey.achievements} />
        </div>
      </div>

      {/* Action Nudge */}
      <div className="flex flex-col items-start rounded-lg border-l-4 border-solid border-[#a7f3d0] bg-[#ecfdf5] p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#10b981] font-bold text-white">
            🏆
          </div>

          <div className="space-y-1">
            <h3 className="text-[13px] font-bold text-[#0a3b25]">
              Next Requirement: Venture Pitch Assessment
            </h3>

            <p className="text-[13px] font-normal text-[#53657D]">
              Complete your Venture Pitch Assessment to advance to the
              Entrepreneurial level. This is your primary milestone for
              progressing to Level 5.
            </p>
          </div>
        </div>

        <Button className="rounded-lg bg-[#0a3b25] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#082f20]">
          Start Assessment →
        </Button>
      </div>
    </div>
  );
}
