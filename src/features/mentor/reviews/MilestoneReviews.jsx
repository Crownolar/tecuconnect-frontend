import { ExternalLink, FileText, ShieldCheck } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import PageHeader from "../../../components/shared/PageHeader";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import StatusBadge from "../../../components/shared/StatusBadge";
import Loading from "../../../components/ui/Loading";
import ReviewList from "../components/ReviewList";
import { usePendingReviews, useReviewMilestone } from "../hooks";

export default function MilestoneReviews() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [comment, setComment] = useState("");

  const { data: reviews = [], isLoading } = usePendingReviews();

  const reviewMilestone = useReviewMilestone();

  const selectedId = searchParams.get("claim");

  const selected = useMemo(
    () => reviews.find((review) => review.id === selectedId) ?? reviews[0],
    [reviews, selectedId],
  );

  const handleVerify = async () => {
    if (!selected) return;

    const result = await reviewMilestone.mutateAsync({
      claimId: selected.id,

      payload: {
        status: "VERIFIED",
        feedback: comment.trim() || "Milestone evidence verified.",
      },
    });

    console.log("TEC-TRAK system evaluation:", result?.systemEvaluation);

    setComment("");
    setSearchParams({});
  };

  const handleRequestChanges = async () => {
    if (!selected) return;

    if (!comment.trim()) {
      return;
    }

    await reviewMilestone.mutateAsync({
      claimId: selected.id,
      payload: {
        status: "CHANGES_REQUESTED",
        feedback: comment.trim(),
      },
    });

    setComment("");
    setSearchParams({});
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Milestone Reviews"
        description="Review student evidence and process verification decisions."
      />

      {isLoading ? (
        <Loading text="Loading milestone reviews..." />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)]">
          <div>
            <ReviewList reviews={reviews} />
          </div>

          <Card className="h-fit xl:sticky xl:top-4">
            {!selected ? (
              <div className="py-10 text-center">
                <ShieldCheck
                  className="mx-auto text-text-secondary"
                  size={26}
                />
                <p className="mt-3 text-sm font-semibold">
                  Select a claim to review
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-text-secondary">
                      {selected.category}
                    </p>
                    <h2 className="mt-1 text-lg font-bold text-text-primary">
                      {selected.milestone}
                    </h2>
                    <p className="mt-1 text-xs text-text-secondary">
                      {selected.student} · {selected.submittedAt}
                    </p>
                  </div>
                  <StatusBadge status={selected.status} />
                </div>

                <div className="mt-5 rounded-lg bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-text-primary">
                    Achievement description
                  </p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {selected.description}
                  </p>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-semibold text-text-primary">
                    Evidence
                  </p>
                  <div className="mt-3 space-y-2">
                    {selected.evidence.map((item) =>
                      item.type === "file" ? (
                        <div
                          key={item.name}
                          className="flex items-center gap-3 rounded-lg border border-border p-3"
                        >
                          <FileText
                            size={18}
                            className="shrink-0 text-primary"
                          />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-text-primary">
                              {item.name}
                            </p>
                            <p className="text-xs text-text-secondary">
                              {item.size}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <a
                          key={item.name}
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 rounded-lg border border-border p-3 text-primary hover:bg-slate-50"
                        >
                          <ExternalLink size={18} className="shrink-0" />
                          <span className="truncate text-sm font-medium">
                            {item.name}
                          </span>
                        </a>
                      ),
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <Input
                    label="Review comment"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="Add feedback for the student..."
                  />
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <Button
                    variant="danger"
                    disabled={reviewMilestone.isPending}
                    onClick={handleRequestChanges}
                  >
                    Request Changes
                  </Button>

                  <Button
                    disabled={reviewMilestone.isPending}
                    onClick={handleVerify}
                  >
                    {reviewMilestone.isPending
                      ? "Saving..."
                      : "Verify Milestone"}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
