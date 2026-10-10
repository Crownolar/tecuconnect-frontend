import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Eye,
  History as HistoryIcon,
  RefreshCw,
  Search,
  XCircle,
} from "lucide-react";

import {
  useApproveMaturityOverride,
  useMaturityOverrideStats,
  useMaturityOverrides,
  useRejectMaturityOverride,
} from "../hooks";

function formatLevel(level) {
  if (!level) return "—";

  return String(level)
    .replace(/^LEVEL_\d+_/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function StatusBadge({ status }) {
  const styles = {
    PENDING: "bg-amber-50 text-amber-700",
    APPROVED: "bg-emerald-50 text-emerald-700",
    REJECTED: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status || "—"}
    </span>
  );
}

function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{label}</p>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
          <Icon size={18} />
        </div>
      </div>

      <p className="mt-3 text-2xl font-semibold text-slate-900">{value ?? 0}</p>
    </div>
  );
}

function ReviewModal({ override, mode, onClose, onSubmit, isPending }) {
  const [note, setNote] = useState("");

  const isReadOnly = mode === "view";
  const approve = mode === "approve";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isReadOnly) return;

    await onSubmit(note.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {isReadOnly
                ? "Maturity override details"
                : approve
                  ? "Approve maturity override"
                  : "Reject maturity override"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isReadOnly
                ? "Review the details and decision history for this request."
                : approve
                  ? "This will update the student's maturity level."
                  : "Record why this override request is being rejected."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
            aria-label="Close"
          >
            <XCircle size={18} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Student
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {override?.student?.name ||
                [
                  override?.student?.user?.firstName,
                  override?.student?.user?.lastName,
                ]
                  .filter(Boolean)
                  .join(" ") ||
                override?.studentId}
            </p>

            {override?.student?.matricNumber && (
              <p className="mt-1 text-sm text-slate-500">
                {override.student.matricNumber}
              </p>
            )}

            <div className="mt-4 flex items-center gap-3 text-sm">
              <span className="font-medium text-slate-600">
                {formatLevel(override?.fromLevel)}
              </span>

              <span className="text-slate-400">→</span>

              <span className="font-semibold text-slate-900">
                {formatLevel(override?.toLevel)}
              </span>
            </div>

            {override?.reason && (
              <div className="mt-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Request reason
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {override.reason}
                </p>
              </div>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Status
              </p>

              <div className="mt-2">
                <StatusBadge status={override?.status} />
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Requested
              </p>

              <p className="mt-2 text-sm font-medium text-slate-700">
                {formatDate(override?.createdAt)}
              </p>
            </div>
          </div>

          {override?.reviewedAt && (
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Reviewed
              </p>

              <p className="mt-2 text-sm font-medium text-slate-700">
                {formatDate(override.reviewedAt)}
              </p>

              {override.reviewedById && (
                <p className="mt-1 text-xs text-slate-500">
                  Reviewer: {override.reviewedById}
                </p>
              )}
            </div>
          )}

          {override?.reviewNote && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Review note
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                {override.reviewNote}
              </p>
            </div>
          )}

          {!isReadOnly && (
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-slate-700">
                Review note
              </label>

              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={4}
                placeholder={
                  approve
                    ? "Optional approval note..."
                    : "Explain why this request is being rejected..."
                }
                className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />

              <div className="mt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isPending}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className={[
                    "rounded-xl px-4 py-2.5 text-sm font-semibold text-white",
                    approve
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-red-600 hover:bg-red-700",
                    isPending ? "cursor-not-allowed opacity-60" : "",
                  ].join(" ")}
                >
                  {isPending
                    ? "Processing..."
                    : approve
                      ? "Approve Override"
                      : "Reject Override"}
                </button>
              </div>
            </form>
          )}

          {isReadOnly && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminMaturity() {
  const [status, setStatus] = useState("PENDING");

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [selected, setSelected] = useState(null);

  const [reviewMode, setReviewMode] = useState(null);

  const [actionError, setActionError] = useState("");

  const statsQuery = useMaturityOverrideStats();

  const overridesQuery = useMaturityOverrides({
    status,
    page,
    limit: 20,
  });

  const approveMutation = useApproveMaturityOverride();

  const rejectMutation = useRejectMaturityOverride();

  const overrides = overridesQuery.data?.items ?? [];

  const meta = overridesQuery.data?.meta ?? null;

  const filteredOverrides = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return overrides;

    return overrides.filter((item) => {
      const student = item.student ?? {};

      const studentName =
        student.name ||
        [student.user?.firstName, student.user?.lastName]
          .filter(Boolean)
          .join(" ");

      const searchable = [
        studentName,
        student.email,
        student.matricNumber,
        item.studentId,
        item.reason,
        item.fromLevel,
        item.toLevel,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(term);
    });
  }, [overrides, search]);

  const handleReview = async (note) => {
    if (!selected) return;

    setActionError("");

    try {
      if (reviewMode === "approve") {
        await approveMutation.mutateAsync({
          overrideId: selected.id,
          reviewNote: note,
        });
      } else {
        await rejectMutation.mutateAsync({
          overrideId: selected.id,
          reviewNote: note,
        });
      }

      setSelected(null);
      setReviewMode(null);
    } catch (error) {
      setActionError(
        error?.data?.message ||
          error?.data?.error ||
          error?.message ||
          "Unable to process this override.",
      );
    }
  };

  const isReviewing = approveMutation.isPending || rejectMutation.isPending;

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-600">
              Administration
            </p>

            <h1 className="mt-1 text-2xl font-semibold text-slate-900">
              Maturity Overrides
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Review manual requests to change a student's maturity level.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              statsQuery.refetch();
              overridesQuery.refetch();
            }}
            disabled={statsQuery.isFetching || overridesQuery.isFetching}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={
                statsQuery.isFetching || overridesQuery.isFetching
                  ? "animate-spin"
                  : ""
              }
            />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Pending"
            value={statsQuery.data?.pending ?? 0}
            icon={Clock3}
          />

          <StatCard
            label="Showing"
            value={filteredOverrides.length}
            icon={Eye}
          />

          <StatCard
            label="Total requests"
            value={meta?.total ?? 0}
            icon={HistoryIcon}
          />
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search student, matric number, reason..."
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
            </div>

            <select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(1);
              }}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
            >
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {/* Error */}
        {overridesQuery.isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {overridesQuery.error?.data?.message ||
              overridesQuery.error?.data?.error ||
              overridesQuery.error?.message ||
              "Unable to load maturity overrides."}
          </div>
        )}

        {actionError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {actionError}
          </div>
        )}

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {overridesQuery.isLoading ? (
            <div className="p-10 text-center text-sm text-slate-500">
              Loading maturity overrides...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] text-left">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-4">Student</th>

                    <th className="px-5 py-4">Current Level</th>

                    <th className="px-5 py-4">Requested Level</th>

                    <th className="px-5 py-4">Reason</th>

                    <th className="px-5 py-4">Status</th>

                    <th className="px-5 py-4">Requested</th>

                    <th className="px-5 py-4 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredOverrides.map((item) => {
                    const student = item.student ?? {};

                    const studentName =
                      student.name ||
                      [student.user?.firstName, student.user?.lastName]
                        .filter(Boolean)
                        .join(" ") ||
                      item.studentId;

                    return (
                      <tr key={item.id} className="text-sm hover:bg-slate-50">
                        <td className="px-5 py-4">
                          <p className="font-semibold text-slate-900">
                            {studentName}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {student.matricNumber ||
                              student.user?.email ||
                              item.studentId}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {formatLevel(item.fromLevel)}
                        </td>

                        <td className="px-5 py-4 font-semibold text-slate-800">
                          {formatLevel(item.toLevel)}
                        </td>

                        <td className="max-w-xs px-5 py-4 text-slate-600">
                          <p className="truncate">{item.reason || "—"}</p>
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge status={item.status} />
                        </td>

                        <td className="px-5 py-4 text-slate-500">
                          {formatDate(item.createdAt)}
                        </td>

                        <td className="px-5 py-4 text-right">
                          {item.status === "PENDING" ? (
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelected(item);
                                  setReviewMode("approve");
                                }}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                              >
                                <CheckCircle2 size={14} />
                                Approve
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setSelected(item);
                                  setReviewMode("reject");
                                }}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"
                              >
                                <XCircle size={14} />
                                Reject
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setSelected(item);
                                setReviewMode("view");
                              }}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                            >
                              <Eye size={14} />
                              View
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}

                  {!filteredOverrides.length && (
                    <tr>
                      <td colSpan={7} className="px-5 py-14 text-center">
                        <Clock3 size={28} className="mx-auto text-slate-300" />

                        <p className="mt-3 text-sm font-semibold text-slate-700">
                          No {status.toLowerCase()} overrides
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          No maturity override requests match the current
                          filters.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {meta && meta.totalPages > 1 && (
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4">
            <p className="text-sm text-slate-500">
              Page {meta.page} of {meta.totalPages}
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                disabled={!meta.hasPrev}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:opacity-40"
              >
                Previous
              </button>

              <button
                type="button"
                disabled={!meta.hasNext}
                onClick={() => setPage((value) => value + 1)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {selected && reviewMode && (
        <ReviewModal
          override={selected}
          mode={reviewMode}
          onClose={() => {
            if (!isReviewing) {
              setSelected(null);
              setReviewMode(null);
            }
          }}
          onSubmit={handleReview}
          isPending={isReviewing}
        />
      )}
    </>
  );
}
