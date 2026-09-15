import { journey } from "../../../mocks/journey";

import JourneyTracker from "./components/JourneyTracker";
import CurrentLevelCard from "./components/CurrentLevelCard";
import DevelopmentAreas from "./components/DevelopmentAreas";
import NextRequirement from "./components/NextRequirement";
import AchievementList from "./components/AchievementList";

import Button from "../../../components/ui/Button";

export default function MyJourney() {
  return (
    <div className="min-h-screen w-full space-y-5 bg-slate-50 sm:space-y-6 lg:space-y-7">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-[24px] font-bold leading-tight text-[#142033] sm:text-[26px] lg:text-[28px]">
          My Journey
        </h1>

        <p className="max-w-2xl text-[13px] font-normal leading-5 text-[#53657D] sm:text-[14px]">
          Track your entrepreneurial development, competencies and progress.
        </p>
      </div>

      {/* Journey Tracker */}
      <JourneyTracker
        orientation="horizontal"
        stages={journey.stages}
      />

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
        {/* Left Column */}
        <div className="min-w-0 space-y-5 lg:space-y-6">
          <CurrentLevelCard
            currentLevel={journey.currentLevel}
            progress={journey.progress}
          />

          <DevelopmentAreas
            areas={journey.developmentAreas}
          />
        </div>

        {/* Right Column */}
        <div className="min-w-0 space-y-5 lg:space-y-6">
          <NextRequirement
            progress={journey.progress}
            nextLevel={journey.nextLevel}
          />

          <AchievementList
            achievements={journey.achievements}
          />
        </div>
      </div>

      {/* Action Nudge */}
      <div className="flex flex-col gap-5 rounded-lg border-l-4 border-solid border-[#a7f3d0] bg-[#ecfdf5] p-4 sm:p-5 md:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#10b981] text-base font-bold text-white sm:h-12 sm:w-12 sm:text-lg">
            🏆
          </div>

          <div className="min-w-0 space-y-1">
            <h3 className="text-[13px] font-bold leading-5 text-[#0a3b25] sm:text-[14px]">
              Next Requirement: Venture Pitch Assessment
            </h3>

            <p className="max-w-3xl text-[12px] font-normal leading-5 text-[#53657D] sm:text-[13px]">
              Complete your Venture Pitch Assessment to advance to the
              Entrepreneurial level. This is your primary milestone for
              progressing to Level 5.
            </p>
          </div>
        </div>

        <Button
          size="lg"
          className="w-full whitespace-nowrap rounded-[11.873px] bg-[#0a3b25] font-semibold text-white hover:bg-[#082f20] sm:w-auto"
        >
          Start Assessment →
        </Button>
      </div>
    </div>
  );
}