import { journey } from "../../../mocks/journey";

import JourneyTracker from "./components/JourneyTracker";
import CurrentLevelCard from "./components/CurrentLevelCard";
import DevelopmentAreas from "./components/DevelopmentAreas";
import NextRequirement from "./components/NextRequirement";
import AchievementList from "./components/AchievementList";
import Button from "../../../components/ui/Button";

import { useStudentJourney } from "./hooks";

const LEVEL_LABELS = {
  LEVEL_1_EXPOSED: "Level 1 — Exposed",
  LEVEL_2_TRAINED: "Level 2 — Trained",
  LEVEL_3_APPLIED: "Level 3 — Applied",
  LEVEL_4_VALIDATED: "Level 4 — Validated",
  LEVEL_5_INTEGRATED: "Level 5 — Integrated",
  LEVEL_6_INDEPENDENT: "Level 6 — Independent",
  LEVEL_7_CAPABLE: "Level 7 — Capable",
  LEVEL_8_ADVANCED: "Level 8 — Advanced",
  LEVEL_9_LEADERSHIP: "Level 9 — Leadership",
  LEVEL_10_MASTERY: "Level 10 — Mastery",
};

export default function MyJourney() {
  const { data: journeyData, isLoading, isError, error } = useStudentJourney();

  const currentLevel = {
    label:
      journeyData?.currentLevelLabel ??
      LEVEL_LABELS[journeyData?.currentLevel] ??
      "—",

    ordinal: journeyData?.currentOrdinal ?? null,

    code: journeyData?.currentLevel ?? null,
  };

  const progress = journeyData?.progress ?? null;

  const levelProgress =
    typeof progress?.progressPct === "number"
      ? Math.min(Math.max(progress.progressPct, 0), 100)
      : 0;

  /*
   * Backend:
   * { area: "Technical", score: 0 }
   *
   * UI:
   * { name: "Technical", progress: 0 }
   */
  const developmentAreas = (journeyData?.developmentAreas ?? []).map(
    (area) => ({
      id: area.area,
      name: area.area,
      progress:
        typeof area.score === "number"
          ? Math.min(Math.max(area.score, 0), 100)
          : 0,
    }),
  );

  const achievements = journeyData?.recentAchievements ?? [];

  const nextLevel = {
    code: progress?.targetLevel ?? null,
    label: LEVEL_LABELS[progress?.targetLevel] ?? progress?.targetLevel ?? "—",
  };

  const remainingRequirements = progress?.remaining ?? [];

  const journeyStages = journey?.stages ?? [];

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-slate-50 p-4 sm:p-6 lg:p-7">
        <div className="animate-pulse space-y-6">
          <div className="space-y-2">
            <div className="h-8 w-48 rounded bg-slate-200" />
            <div className="h-4 w-full max-w-2xl rounded bg-slate-200" />
          </div>

          <div className="h-28 rounded-xl bg-white" />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="h-64 rounded-xl bg-white" />
            <div className="h-64 rounded-xl bg-white" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen w-full bg-slate-50 p-4 sm:p-6 lg:p-7">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <h2 className="font-semibold text-red-800">
            Unable to load your journey
          </h2>

          <p className="mt-1 text-sm text-red-600">
            {error?.message ||
              "We couldn't retrieve your journey. Please try again."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full space-y-5 bg-slate-50 sm:space-y-6 lg:space-y-7">
      {/* PAGE HEADER */}
      <div className="space-y-1">
        <h1 className="text-[24px] font-bold leading-tight text-[#142033] sm:text-[26px] lg:text-[28px]">
          My Journey
        </h1>

        <p className="max-w-2xl text-[13px] font-normal leading-5 text-[#53657D] sm:text-[14px]">
          Track your entrepreneurial development, competencies and progress.
        </p>
      </div>

      {/* JOURNEY TRACKER */}
      <JourneyTracker
        orientation="horizontal"
        stages={journeyStages}
        currentLevel={currentLevel.code}
        currentOrdinal={currentLevel.ordinal}
      />

      {/* TWO COLUMN CONTENT */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
        {/* LEFT */}
        <div className="min-w-0 space-y-5 lg:space-y-6">
          <CurrentLevelCard currentLevel={currentLevel} />

          <DevelopmentAreas areas={developmentAreas} />
        </div>

        {/* RIGHT */}
        <div className="min-w-0 space-y-5 lg:space-y-6">
          <NextRequirement
            progress={levelProgress}
            nextLevel={nextLevel}
            requirements={remainingRequirements}
          />

          <AchievementList achievements={achievements} />
        </div>
      </div>

      {/* CURRENT JOURNEY STATUS */}
      <div className="flex flex-col gap-5 rounded-lg border-l-4 border-solid border-[#a7f3d0] bg-[#ecfdf5] p-4 sm:p-5 md:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#10b981] text-base font-bold text-white sm:h-12 sm:w-12 sm:text-lg">
            🏆
          </div>

          <div className="min-w-0 space-y-1">
            <h3 className="text-[13px] font-bold leading-5 text-[#0a3b25] sm:text-[14px]">
              Current Maturity: {currentLevel.label}
            </h3>

            <p className="max-w-3xl text-[12px] font-normal leading-5 text-[#53657D] sm:text-[13px]">
              You are {levelProgress}% through your current journey requirement.
            </p>
          </div>
        </div>

        <Button
          size="lg"
          className="w-full whitespace-nowrap rounded-[11.873px] bg-[#0a3b25] font-semibold text-white hover:bg-[#082f20] sm:w-auto"
        >
          View Milestones →
        </Button>
      </div>
    </div>
  );
}
