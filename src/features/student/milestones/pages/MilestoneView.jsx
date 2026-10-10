import { ArrowLeft, ExternalLink } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../../../components/ui/Button";
import MilestoneClaimStatus from "../components/MilestoneClaimStatus";
import ResubmitMilestoneForm from "../components/ResubmitMilestoneForm";
import { useMilestone } from "../hooks";
import { useState } from "react";

const formatLabel = (value) => {
  if (!value) return "—";

  return String(value)
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function MilestoneView() {
  const navigate = useNavigate();
  const { milestoneId } = useParams();
  const [showResubmit, setShowResubmit] = useState(false);

  const {
    data: milestone,
    isLoading,
    isError,
    error,
  } = useMilestone(milestoneId);

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-sm text-slate-500">
        Loading milestone...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/student/milestones")}
        >
          <ArrowLeft size={17} />
          Back to milestones
        </Button>

        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="font-semibold text-red-700">
            Unable to load milestone
          </p>

          <p className="mt-1 text-sm text-red-600">
            {error?.message || "Something went wrong."}
          </p>
        </div>
      </div>
    );
  }

  if (!milestone) {
    return (
      <div className="space-y-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/student/milestones")}
        >
          <ArrowLeft size={17} />
          Back to milestones
        </Button>

        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <p className="font-medium text-slate-700">
            Milestone not found.
          </p>
        </div>
      </div>
    );
  }

  const evidence = Array.isArray(milestone.evidence)
    ? milestone.evidence
    : [];

  return (
    <div className="min-h-screen w-full min-w-0 bg-slate-50 text-slate-900">
      <div className="space-y-6">
        {/* Back */}
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/student/milestones")}
        >
          <ArrowLeft size={17} />
          Back to milestones
        </Button>

        {/* Header */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {formatLabel(milestone.category || milestone.type)}
              </p>

              <h1 className="mt-2 text-2xl font-bold text-slate-900">
                {milestone.title || "Untitled milestone"}
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                {formatLabel(milestone.type)}
              </p>
            </div>

            <MilestoneClaimStatus status={milestone.status} />
          </div>
        </section>

        {milestone.status === "REJECTED" && (
          <section className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="font-semibold text-amber-900">Changes Requested</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-amber-800">
              {milestone.verificationNote || "Your mentor requested updated evidence."}
            </p>
            {!showResubmit && (
              <Button type="button" className="mt-4" onClick={() => setShowResubmit(true)}>
                Submit Updated Evidence
              </Button>
            )}
          </section>
        )}

        {showResubmit && milestone.status === "REJECTED" && (
          <ResubmitMilestoneForm
            claim={milestone}
            onCancel={() => setShowResubmit(false)}
            onComplete={() => { /* the mutation invalidates detail/list queries */ }}
          />
        )}

        {/* Details */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-semibold text-slate-900">
            Milestone Details
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Category
              </p>

              <p className="mt-1 text-sm text-slate-800">
                {formatLabel(milestone.category)}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Milestone Type
              </p>

              <p className="mt-1 text-sm text-slate-800">
                {formatLabel(milestone.type)}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Date of Achievement
              </p>

              <p className="mt-1 text-sm text-slate-800">
                {formatDate(milestone.occurredAt)}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Claimed At
              </p>

              <p className="mt-1 text-sm text-slate-800">
                {formatDate(milestone.claimedAt)}
              </p>
            </div>
          </div>

          {milestone.description && (
            <div className="mt-6 border-t border-slate-100 pt-5">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Description
              </p>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                {milestone.description}
              </p>
            </div>
          )}
        </section>

        {/* Evidence */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Evidence
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Evidence submitted with this milestone claim.
            </p>
          </div>

          {evidence.length === 0 ? (
            <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
              <p className="text-sm font-medium text-slate-700">
                No evidence submitted.
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {evidence.map((item, index) => (
                <div
                  key={item.id || `${item.fileUrl}-${index}`}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-800">
                        Evidence {index + 1}
                      </p>

                      {item.description && (
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {item.description}
                        </p>
                      )}

                      {item.fileUrl && (
                        <a
                          href={item.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex items-center gap-2 break-all text-sm font-medium text-blue-600 hover:underline"
                        >
                          Open evidence
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>

                    <span className="shrink-0 text-xs uppercase text-slate-400">
                      {item.fileType || "link"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}