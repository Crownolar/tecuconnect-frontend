import { useMemo, useState } from "react";
import {
  useStaffMilestones,
  useReviewStaffMilestone,
  useResolveStaffMilestone,
} from "../hooks";

const STATUS_META = {
  PENDING: {
    label: "Pending review",
    className: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  VERIFIED: {
    label: "Verified",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  REJECTED: {
    label: "Rejected",
    className: "bg-rose-50 text-rose-700 ring-rose-200",
  },
  FLAGGED_FOR_REVIEW: {
    label: "Flagged for review",
    className: "bg-violet-50 text-violet-700 ring-violet-200",
  },
};

function normalizeMilestone(raw, index = 0) {
  const student = raw?.student || raw?.studentInfo || {};
  const user = student?.user || raw?.user || {};

  const evidenceItems = Array.isArray(raw?.evidence)
    ? raw.evidence
    : raw?.evidence
      ? [raw.evidence]
      : [];

  const latestEvidence = evidenceItems[evidenceItems.length - 1] || {};
  const review = raw?.review || raw?.reviewDetails || {};

  const firstName = user?.firstName?.trim() || "";
  const lastName = user?.lastName?.trim() || "";

  const nestedStudentName = [firstName, lastName].filter(Boolean).join(" ");

  const studentName =
    raw?.studentName ||
    student?.fullName ||
    student?.name ||
    nestedStudentName ||
    "Student name unavailable";

  const fullId = String(
    raw?.id ?? raw?.milestoneId ?? raw?._id ?? `milestone-${index}`,
  );

  return {
    // Keep the complete ID for API operations.
    id: fullId,

    // Show a shorter reference in the UI.
    displayId: `MS-${fullId.slice(0, 8).toUpperCase()}`,

    studentName,

    // Do not display matric numbers or student UUIDs.
    studentReference: "Student submission",

    milestone:
      raw?.title ||
      raw?.milestoneTitle ||
      raw?.name ||
      raw?.milestone?.title ||
      "Untitled milestone",

    submittedAt:
      raw?.claimedAt ||
      raw?.submittedAt ||
      raw?.submissionDate ||
      raw?.createdAt ||
      raw?.updatedAt ||
      null,

    status: String(raw?.status || "UNKNOWN").toUpperCase(),

    reviewer:
      raw?.reviewerName ||
      raw?.reviewer?.name ||
      review?.reviewerName ||
      [raw?.verifiedBy?.user?.firstName, raw?.verifiedBy?.user?.lastName]
        .filter(Boolean)
        .join(" ") ||
      "Unassigned",

    evidence:
      latestEvidence?.description ||
      latestEvidence?.fileUrl ||
      raw?.evidenceDescription ||
      "No evidence description supplied",

    evidenceItems,

    description:
      raw?.description ||
      raw?.milestone?.description ||
      "No milestone description supplied.",

    feedback:
      raw?.verificationNote ||
      raw?.staffReviewNote ||
      raw?.feedback ||
      raw?.reviewerFeedback ||
      review?.feedback ||
      "",

    raw,
  };
}

function extractList(response) {
  if (Array.isArray(response)) return response;
  const candidates = [
    response?.data,
    response?.data?.data,
    response?.data?.items,
    response?.data?.milestones,
    response?.items,
    response?.milestones,
    response?.results,
  ];
  return candidates.find(Array.isArray) || [];
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}

function StatusBadge({ status }) {
  const meta = STATUS_META[status] || {
    label: status.replaceAll("_", " "),
    className: "bg-slate-100 text-slate-600 ring-slate-200",
  };
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${meta.className}`}
    >
      {meta.label}
    </span>
  );
}

function MetricCard({ label, value, note, accent }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={`mt-1 h-2.5 w-2.5 rounded-full ${accent}`} />
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-500">{note}</p>
    </div>
  );
}

function MilestoneDetails({ milestone, onClose, onAction, isSaving }) {
  const [reason, setReason] = useState("");
  if (!milestone) return null;
  const canReview = milestone.status === "PENDING";
  const canResolve = milestone.status === "FLAGGED_FOR_REVIEW";
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-0 sm:items-center sm:p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="milestone-detail-title"
        className="max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:max-w-2xl sm:rounded-3xl"
      >
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-5 sm:px-7">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Milestone submission · {milestone.displayId}
            </p>

            <h2
              id="milestone-detail-title"
              className="mt-2 break-words text-xl font-bold text-slate-900"
            >
              {milestone.milestone}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Submitted by {milestone.studentName}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>
        <div className="space-y-6 px-5 py-6 sm:px-7">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={milestone.status} />
            <span className="text-sm text-slate-500">
              Submitted {formatDate(milestone.submittedAt)}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Milestone objective
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {milestone.description}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Submitted evidence
            </h3>
            {milestone.evidenceItems.length ? (
              <ul className="mt-2 space-y-2">
                {milestone.evidenceItems.map((item, index) => (
                  <li
                    key={`${item?.id ?? item?.fileUrl ?? "evidence"}-${index}`}
                    className="text-sm text-slate-600"
                  >
                    {item?.fileUrl ? (
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-emerald-800 underline underline-offset-2"
                      >
                        {item.description || item.fileName || item.fileUrl}
                      </a>
                    ) : (
                      item?.description || item?.fileName || String(item)
                    )}
                    {item?.fileType && (
                      <span className="ml-2 text-xs text-slate-400">
                        ({item.fileType})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-slate-600">
                {milestone.evidence}
              </p>
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Reviewer / feedback
            </h3>
            <p className="mt-1 text-sm text-slate-600">{milestone.reviewer}</p>
            {milestone.feedback ? (
              <p className="mt-2 rounded-xl bg-slate-50 p-3 text-sm leading-5 text-slate-600">
                {milestone.feedback}
              </p>
            ) : (
              <p className="mt-2 text-sm text-slate-400">
                No reviewer feedback recorded.
              </p>
            )}
          </div>
          {(canReview || canResolve) && (
            <div className="border-t border-slate-100 pt-5">
              <label
                htmlFor="review-reason"
                className="text-sm font-semibold text-slate-900"
              >
                {canResolve
                  ? "Resolution note (optional)"
                  : "Feedback / reason (required when rejecting)"}
              </label>
              <textarea
                id="review-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                placeholder="Add a note for the milestone record…"
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
              />
              <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                {canReview && (
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={() => onAction(milestone, "FLAG", reason)}
                    className="rounded-xl border border-violet-200 px-4 py-2.5 text-sm font-semibold text-violet-700 hover:bg-violet-50 disabled:opacity-50"
                  >
                    Flag for review
                  </button>
                )}
                {canReview && (
                  <button
                    type="button"
                    disabled={isSaving || !reason.trim()}
                    onClick={() => onAction(milestone, "REJECT", reason)}
                    className="rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Reject
                  </button>
                )}
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => onAction(milestone, "VERIFY", reason)}
                  className="rounded-xl bg-[#0A3B25] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0d4c30] disabled:opacity-50"
                >
                  {isSaving
                    ? "Saving…"
                    : canResolve
                      ? "Resolve & verify"
                      : "Verify"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function StaffMilestones() {
  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useStaffMilestones();
  const reviewMutation = useReviewStaffMilestone();
  const resolveMutation = useResolveStaffMilestone();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("ALL");
  const [selectedId, setSelectedId] = useState(null);
  const [notice, setNotice] = useState("");
  const [actionError, setActionError] = useState("");

  const milestones = useMemo(
    () => extractList(response).map(normalizeMilestone),
    [response],
  );
  const selected = milestones.find((item) => item.id === selectedId) || null;
  const isSaving = reviewMutation.isPending || resolveMutation.isPending;
  const counts = useMemo(
    () => ({
      total: milestones.length,
      pending: milestones.filter((item) => item.status === "PENDING").length,
      verified: milestones.filter((item) => item.status === "VERIFIED").length,
      rejected: milestones.filter((item) => item.status === "REJECTED").length,
      flagged: milestones.filter((item) => item.status === "FLAGGED_FOR_REVIEW")
        .length,
    }),
    [milestones],
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const cutoff =
      dateFilter === "7"
        ? new Date(Date.now() - 7 * 86400000)
        : dateFilter === "30"
          ? new Date(Date.now() - 30 * 86400000)
          : null;
    return milestones.filter((item) => {
      const matchesSearch =
        !query ||
        [item.studentName, item.milestone, item.displayId].some((value) =>
          String(value || "")
            .toLowerCase()
            .includes(query),
        );
      const matchesStatus =
        statusFilter === "ALL" || item.status === statusFilter;
      const submitted = item.submittedAt ? new Date(item.submittedAt) : null;
      const matchesDate =
        !cutoff ||
        (submitted &&
          !Number.isNaN(submitted.getTime()) &&
          submitted >= cutoff);
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [milestones, search, statusFilter, dateFilter]);

  async function handleAction(milestone, action, reason) {
    setActionError("");
    try {
      if (milestone.status === "FLAGGED_FOR_REVIEW") {
        if (action === "FLAG" || action === "REJECT") return;
        await resolveMutation.mutateAsync({
          id: milestone.id,
          action,
          feedback: reason.trim() || undefined,
        });
      } else {
        await reviewMutation.mutateAsync({
          id: milestone.id,
          action,
          feedback: reason.trim() || undefined,
        });
      }
      setSelectedId(null);
      setNotice(
        `Milestone ${action === "VERIFY" ? "verified" : action === "REJECT" ? "rejected" : "flagged"} successfully.`,
      );
    } catch (err) {
      setActionError(
        err?.message || "The milestone action failed. Please try again.",
      );
    }
  }

  return (
    <div className="min-w-0 space-y-6 pb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            TEC-TRAK Staff Portal
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Milestone Review
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Review student submissions, inspect evidence, and track milestones
            that need staff attention.
          </p>
        </div>
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50 sm:self-auto"
        >
          <span aria-hidden="true">↻</span>
          {isFetching ? "Refreshing…" : "Refresh"}
        </button>
      </div>
      {notice && (
        <div
          role="status"
          className="flex items-start justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
        >
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss message"
          >
            ✕
          </button>
        </div>
      )}
      {actionError && (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
        >
          {actionError}
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          label="All submissions"
          value={counts.total}
          note="Across all statuses"
          accent="bg-slate-400"
        />
        <MetricCard
          label="Pending review"
          value={counts.pending}
          note="Awaiting a decision"
          accent="bg-amber-500"
        />
        <MetricCard
          label="Verified"
          value={counts.verified}
          note="Accepted submissions"
          accent="bg-emerald-500"
        />
        <MetricCard
          label="Rejected"
          value={counts.rejected}
          note="Feedback provided"
          accent="bg-rose-500"
        />
        <MetricCard
          label="Flagged"
          value={counts.flagged}
          note="Needs further review"
          accent="bg-violet-500"
        />
      </div>
      <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Student submissions
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Search by student, matric number, milestone, or submission ID.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:flex">
              <label className="relative block">
                <span className="sr-only">Search submissions</span>
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  ⌕
                </span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search submissions…"
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 lg:w-64"
                />
              </label>
              <label>
                <span className="sr-only">Filter by status</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-700 sm:min-w-40"
                >
                  <option value="ALL">All statuses</option>
                  <option value="PENDING">Pending review</option>
                  <option value="VERIFIED">Verified</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="FLAGGED_FOR_REVIEW">Flagged for review</option>
                </select>
              </label>
              <label>
                <span className="sr-only">Filter by submission date</span>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-700 sm:min-w-36"
                >
                  <option value="ALL">Any date</option>
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                </select>
              </label>
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="p-12 text-center text-sm text-slate-500">
            Loading milestone submissions…
          </div>
        ) : isError ? (
          <div className="p-8">
            <p className="font-semibold text-rose-800">
              Unable to load milestone submissions.
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {error?.message || "Check your connection and try again."}
            </p>
            <button
              onClick={() => refetch()}
              className="mt-4 rounded-lg bg-[#0A3B25] px-4 py-2 text-sm font-semibold text-white"
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left">
              <thead className="bg-slate-50">
                <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3.5">Student</th>
                  <th className="px-5 py-3.5">Milestone</th>
                  <th className="px-5 py-3.5">Submitted</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Reviewer</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="transition hover:bg-slate-50/70">
                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap text-sm font-semibold text-slate-900">
                        {item.studentName}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.studentReference}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-800">
                        {item.milestone}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Reference: {item.displayId}
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                      {formatDate(item.submittedAt)}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {item.reviewer}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedId(item.id)}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-700 hover:text-emerald-800"
                      >
                        View details
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-14 text-center">
                      <p className="font-semibold text-slate-800">
                        No matching submissions
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your search or filters.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSearch("");
                          setStatusFilter("ALL");
                          setDateFilter("ALL");
                        }}
                        className="mt-4 text-sm font-semibold text-emerald-800 underline underline-offset-4"
                      >
                        Clear filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {!isLoading && !isError && (
          <div className="flex flex-col gap-2 border-t border-slate-100 px-5 py-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing {filtered.length} of {milestones.length} submissions
            </span>
            <span>Records supplied by the Staff milestones API.</span>
          </div>
        )}
      </section>
      <MilestoneDetails
        milestone={selected}
        onClose={() => setSelectedId(null)}
        onAction={handleAction}
        isSaving={isSaving}
      />
    </div>
  );
}
