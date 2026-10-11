import { useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  Flag,
  Loader2,
  XCircle,
} from "lucide-react";

import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import StatusBadge from "../../../components/shared/StatusBadge";

import {
  useMentorMilestone,
  useMentorReviewContext,
  usePendingReviews,
  useReviewMilestone,
} from "../hooks";

export default function MilestoneReviews() {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
  reviews,
  isLoading,
  isError,
  error,
  reviewsQuery,
} = useMentorReviewContext();

  const selectedId = searchParams.get("claim");

  // const reviewsQuery = usePendingReviews();
  // const reviews = reviewsQuery.data ?? [];

  const selectedReview = useMemo(() => {
    if (!selectedId) {
      return reviews[0] ?? null;
    }

    return reviews.find((review) => review.id === selectedId) ?? null;
  }, [reviews, selectedId]);

  const milestoneQuery = useMentorMilestone(selectedReview?.id);

  const reviewMilestone = useReviewMilestone();

  const [comment, setComment] = useState("");
  const [actionError, setActionError] = useState("");
  const reviewLock = useRef(false);

  const milestone = milestoneQuery.data ?? selectedReview;

  const isSubmitting = reviewMilestone.isPending;

  const selectReview = (id) => {
    setActionError("");
    setComment("");

    setSearchParams({ claim: id });
  };

  const handleReview = async (action) => {
    if (reviewLock.current || reviewMilestone.isPending) return;
    if (!milestone?.id) {
      setActionError("No milestone has been selected.");
      return;
    }

    if (action === "REJECT" && !comment.trim()) {
      setActionError(
        "Please provide feedback explaining why this milestone was rejected.",
      );
      return;
    }

    if (action === "FLAG_FOR_STAFF_REVIEW" && !comment.trim()) {
      setActionError(
        "Please provide a note explaining why staff review is required.",
      );
      return;
    }

    setActionError("");
    reviewLock.current = true;

    try {
      await reviewMilestone.mutateAsync({
        milestoneId: milestone.id,
        payload: {
          action,
          note: comment.trim(),
        },
      });

      setComment("");

      // The mutation invalidates the pending-review query.
      // Once the refreshed list arrives, select the next pending item.
      const remaining = reviews.filter((review) => review.id !== milestone.id);

      if (remaining.length > 0) {
        setSearchParams({ claim: remaining[0].id });
      } else {
        setSearchParams({});
      }
    } catch (error) {
      setActionError(
        error?.data?.message ||
          error?.data?.error ||
          error?.message ||
          "Unable to update this milestone.",
      );
    } finally {
      reviewLock.current = false;
    }
  };

  if (reviewsQuery.isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={28} />
      </div>
    );
  }

  if (reviewsQuery.isError) {
    return (
      <Card>
        <div className="py-10 text-center">
          <XCircle className="mx-auto text-danger" size={28} />

          <h2 className="mt-3 text-sm font-semibold text-text-primary">
            Unable to load milestone reviews
          </h2>

          <p className="mt-1 text-sm text-text-secondary">
            {reviewsQuery.error?.message ||
              "Something went wrong while loading pending milestones."}
          </p>

          <Button className="mt-5" onClick={() => reviewsQuery.refetch()}>
            Try again
          </Button>
        </div>
      </Card>
    );
  }

  if (!reviews.length) {
    return (
      <Card>
        <div className="py-12 text-center">
          <FileCheck2 className="mx-auto text-text-secondary" size={32} />

          <h2 className="mt-3 text-base font-semibold text-text-primary">
            No pending milestone reviews
          </h2>

          <p className="mx-auto mt-1 max-w-md text-sm text-text-secondary">
            There are currently no student milestone claims waiting for
            verification.
          </p>

          <Link
            to="/mentor/dashboard"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          to="/mentor/dashboard"
          className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary"
        >
          <ArrowLeft size={16} />
          Dashboard
        </Link>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">
              Milestone Reviews
            </h1>

            <p className="mt-1 text-sm text-text-secondary">
              Review student evidence and decide whether each milestone should
              be verified, rejected, or sent to staff review.
            </p>
          </div>

          <div className="text-sm text-text-secondary">
            {reviews.length} pending{" "}
            {reviews.length === 1 ? "review" : "reviews"}
          </div>
        </div>
      </div>

      {/* Review list */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead className="border-b border-border bg-slate-50">
              <tr className="text-xs font-semibold text-text-secondary">
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3">Milestone</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Submitted</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {reviews.map((review) => {
                const active = review.id === milestone?.id;

                return (
                  <tr
                    key={review.id}
                    onClick={() => selectReview(review.id)}
                    className={`cursor-pointer text-sm transition-colors ${
                      active ? "bg-primary/5" : "hover:bg-slate-50"
                    }`}
                  >
                    <td className="px-5 py-4 font-semibold text-text-primary">
                      {review.student || "Unknown student"}
                    </td>

                    <td className="px-5 py-4 text-text-primary">
                      {review.milestone || review.title || "Untitled milestone"}
                    </td>

                    <td className="px-5 py-4 text-text-secondary">
                      {review.category || "—"}
                    </td>

                    <td className="px-5 py-4 text-text-secondary">
                      {review.submittedAt || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={review.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Invalid/stale claim */}
      {selectedId && !selectedReview && (
        <Card>
          <div className="py-8 text-center">
            <XCircle className="mx-auto text-danger" size={28} />

            <h2 className="mt-3 text-sm font-semibold text-text-primary">
              Milestone not found in pending reviews
            </h2>

            <p className="mt-1 text-sm text-text-secondary">
              This milestone may have already been reviewed or the review link
              is no longer valid.
            </p>

            <Button className="mt-5" onClick={() => setSearchParams({})}>
              Show pending reviews
            </Button>
          </div>
        </Card>
      )}

      {/* Selected milestone */}
      {milestone && (
        <Card>
          <div className="space-y-6">
            {/* Milestone heading */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Milestone
                </p>

                <h2 className="mt-1 text-xl font-bold text-text-primary">
                  {milestone.title ||
                    milestone.milestone ||
                    "Untitled milestone"}
                </h2>

                <p className="mt-1 text-sm text-text-secondary">
                  Student:{" "}
                  <span className="font-medium text-text-primary">
                    {milestone.student || "Unknown student"}
                  </span>
                </p>
              </div>

              <StatusBadge status={milestone.status} />
            </div>

            {/* Loading detail */}
            {milestoneQuery.isLoading && (
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Loader2 size={16} className="animate-spin" />
                Loading milestone details...
              </div>
            )}

            {/* Description */}
            {milestone.description && (
              <div>
                <h3 className="text-sm font-semibold text-text-primary">
                  Description
                </h3>

                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-text-secondary">
                  {milestone.description}
                </p>
              </div>
            )}

            {/* Dates */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-text-secondary">
                  Claimed
                </p>

                <p className="mt-1 text-sm text-text-primary">
                  {milestone.claimedAt
                    ? new Date(milestone.claimedAt).toLocaleString()
                    : "—"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-text-secondary">
                  Occurred
                </p>

                <p className="mt-1 text-sm text-text-primary">
                  {milestone.occurredAt
                    ? new Date(milestone.occurredAt).toLocaleString()
                    : "—"}
                </p>
              </div>
            </div>

            {/* Evidence */}
            <div>
              <div className="flex items-center gap-2">
                <FileCheck2 size={18} className="text-primary" />

                <h3 className="text-sm font-semibold text-text-primary">
                  Evidence
                </h3>
              </div>

              {!milestone.evidence?.length ? (
                <p className="mt-3 text-sm text-text-secondary">
                  No evidence was attached to this milestone claim.
                </p>
              ) : (
                <div className="mt-3 space-y-3">
                  {milestone.evidence.map((item, index) => (
                    <div
                      key={item.id || item.fileUrl || item.url || index}
                      className="rounded-lg border border-border p-4"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-text-primary">
                            {item.name || "Evidence"}
                          </p>

                          {item.description && (
                            <p className="mt-1 text-sm text-text-secondary">
                              {item.description}
                            </p>
                          )}
                        </div>

                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline"
                          >
                            Open evidence
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Review action */}
            <div className="border-t border-border pt-6">
              <label
                htmlFor="review-note"
                className="text-sm font-semibold text-text-primary"
              >
                Review note
              </label>

              <textarea
                id="review-note"
                value={comment}
                onChange={(event) => {
                  setComment(event.target.value);
                  setActionError("");
                }}
                rows={4}
                disabled={isSubmitting}
                placeholder="Add feedback or a review note..."
                className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
              />

              {actionError && (
                <p className="mt-2 text-sm font-medium text-danger">
                  {actionError}
                </p>
              )}

              {reviewMilestone.isSuccess && (
                <p className="mt-2 text-sm font-medium text-success">
                  Milestone review submitted successfully.
                </p>
              )}

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleReview("VERIFY")}
                  className="inline-flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <CheckCircle2 size={16} />
                  )}
                  Verify milestone
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  disabled={isSubmitting}
                  onClick={() => handleReview("REJECT")}
                  className="inline-flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <XCircle size={16} />
                  )}
                  Reject
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  disabled={isSubmitting}
                  onClick={() => handleReview("FLAG_FOR_STAFF_REVIEW")}
                  className="inline-flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Flag size={16} />
                  )}
                  Flag for staff review
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
