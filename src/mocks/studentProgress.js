const STORAGE_KEY = "tec_trak_student_progress";

const initialProgress = {
  studentId: "student-001",

  maturity: {
    currentLevel: 3,
    previousLevel: 3,
    changed: false,
    lastEvaluatedAt: null,
  },

  teis: {
    score: 68.6,
    previousScore: 68.6,
    changed: false,
    lastRecalculatedAt: null,
  },

  milestones: {
    verifiedCount: 0,
  },

  lastSystemEvent: null,
};

export function getStudentProgress() {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(initialProgress),
    );

    return initialProgress;
  }

  try {
    return JSON.parse(stored);
  } catch {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(initialProgress),
    );

    return initialProgress;
  }
}

export function saveStudentProgress(progress) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(progress),
  );

  return progress;
}

export function updateStudentProgress(updates) {
  const current = getStudentProgress();

  const updated = {
    ...current,
    ...updates,
    maturity: {
      ...current.maturity,
      ...(updates.maturity || {}),
    },
    teis: {
      ...current.teis,
      ...(updates.teis || {}),
    },
    milestones: {
      ...current.milestones,
      ...(updates.milestones || {}),
    },
  };

  return saveStudentProgress(updated);
}