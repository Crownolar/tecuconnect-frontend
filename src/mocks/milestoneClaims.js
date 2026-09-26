const STORAGE_KEY = "tec_trak_milestone_claims";

const initialClaims = [
  {
    id: "claim-001",
    studentId: "student-001",
    student: "Yusuf Abdulrahman",

    category: "Communication & Pitch",
    milestone: "Venture Pitch Assessment",

    description:
      "Completed a venture pitch assessment and presented the product proposition, target customer and validation evidence.",

    achievementDate: "2026-09-21",

    evidence: [
      {
        type: "file",
        name: "venture-pitch.pdf",
        size: "2.4 MB",
      },
      {
        type: "link",
        name: "Pitch recording",
        url: "https://example.com/pitch",
      },
    ],

    status: "PENDING_REVIEW",

    submittedAt: "2026-09-21",

    mentorFeedback: null,
  },

  {
    id: "claim-002",
    studentId: "student-002",
    student: "Aisha Bello",

    category: "Innovation & Product",
    milestone: "Validated Customer Need",

    description:
      "Submitted interview notes and a summary of customer validation activities.",

    achievementDate: "2026-09-20",

    evidence: [
      {
        type: "file",
        name: "customer-validation.pdf",
        size: "1.1 MB",
      },
    ],

    status: "PENDING_REVIEW",

    submittedAt: "2026-09-20",

    mentorFeedback: null,
  },
];

export function getMilestoneClaims() {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(initialClaims)
    );

    return initialClaims;
  }

  try {
    return JSON.parse(stored);
  } catch {
    return initialClaims;
  }
}

export function saveMilestoneClaims(claims) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(claims)
  );

  return claims;
}

export function addMilestoneClaim(claim) {
  const claims = getMilestoneClaims();

  const updatedClaims = [
    ...claims,
    claim,
  ];

  saveMilestoneClaims(updatedClaims);

  return claim;
}

export function updateMilestoneClaim(
  claimId,
  updates
) {
  const claims = getMilestoneClaims();

  const updatedClaims = claims.map((claim) =>
    claim.id === claimId
      ? {
          ...claim,
          ...updates,
        }
      : claim
  );

  saveMilestoneClaims(updatedClaims);

  return updatedClaims.find(
    (claim) => claim.id === claimId
  );
}

export function resubmitMilestoneClaim(claimId, updates) {
  const claims = getMilestoneClaims();

  const existingClaim = claims.find(
    (claim) => claim.id === claimId
  );

  if (!existingClaim) {
    throw new Error("Milestone claim not found.");
  }

  const updatedClaim = {
    ...existingClaim,
    ...updates,
    status: "PENDING_REVIEW",
    mentorFeedback: null,
    resubmittedAt: new Date().toISOString(),
    reviewedAt: null,
  };

  const updatedClaims = claims.map((claim) =>
    claim.id === claimId ? updatedClaim : claim
  );

  saveMilestoneClaims(updatedClaims);

  return updatedClaim;
}

