import { addNotification } from "./notifications";

export function handleMilestoneReviewed(
  claim,
) {
  if (!claim) return null;

  if (claim.status === "VERIFIED") {
    return addNotification({
      userId: claim.studentId,
      type: "MILESTONE_VERIFIED",
      category: "Milestones",
      title: "Milestone verified",
      message: `Your ${claim.milestone} milestone has been verified by your mentor.`,
      metadata: {
        claimId: claim.id,
        milestone: claim.milestone,
      },
    });
  }

  if (
    claim.status ===
    "CHANGES_REQUESTED"
  ) {
    return addNotification({
      userId: claim.studentId,
      type: "CHANGES_REQUESTED",
      category: "Milestones",
      title: "Changes requested",
      message:
        claim.mentorFeedback ||
        `Your mentor requested changes to your ${claim.milestone} milestone.`,
      metadata: {
        claimId: claim.id,
        milestone: claim.milestone,
      },
    });
  }

  return null;
}