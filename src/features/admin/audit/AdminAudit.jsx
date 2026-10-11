import {
  ClipboardList,
  RefreshCw,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState } from "react";

import { useAdminAuditLogs } from "../hooks";

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

function formatValue(value) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (typeof value !== "string") {
    return JSON.stringify(value, null, 2);
  }

  try {
    return JSON.stringify(JSON.parse(value), null, 2);
  } catch {
    return value;
  }
}

function InfoItem({ label, value, mono = false }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>

      <p
        className={[
          "mt-2 break-words text-sm font-medium text-slate-800",
          mono ? "font-mono text-xs" : "",
        ].join(" ")}
      >
        {value || "—"}
      </p>
    </div>
  );
}

function ValueBlock({ title, value }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        {title}
      </p>

      <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-slate-950 p-4 text-xs leading-5 text-slate-100">
        {formatValue(value)}
      </pre>
    </div>
  );
}

function AuditDetailModal({ audit, onClose }) {
  if (!audit) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="audit-detail-title"
    >
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
              Audit Event
            </p>

            <h2
              id="audit-detail-title"
              className="mt-1 text-xl font-bold text-slate-900"
            >
              {audit.action || "Administrative action"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {formatDate(audit.createdAt)}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close audit details"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-6 p-5">
          {/* Actor */}
          <section>
            <h3 className="text-sm font-semibold text-slate-900">
              Actor
            </h3>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <InfoItem
                label="User Name"
                value={audit.userName}
              />

              <InfoItem
                label="User Email"
                value={audit.userEmail}
              />

              <InfoItem
                label="User ID"
                value={audit.userId}
                mono
              />

              <InfoItem
                label="IP Address"
                value={audit.ipAddress}
                mono
              />
            </div>
          </section>

          {/* Action */}
          <section>
            <h3 className="text-sm font-semibold text-slate-900">
              Action
            </h3>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <InfoItem
                label="Action"
                value={audit.action}
              />

              <InfoItem
                label="Entity"
                value={audit.entity}
              />

              <InfoItem
                label="Entity ID"
                value={audit.entityId}
                mono
              />

              <InfoItem
                label="Timestamp"
                value={formatDate(audit.createdAt)}
              />
            </div>
          </section>

          {/* Change history */}
          <section>
            <h3 className="text-sm font-semibold text-slate-900">
              Change History
            </h3>

            <div className="mt-3 space-y-4">
              <ValueBlock
                title="Previous Value"
                value={audit.oldValue}
              />

              <ValueBlock
                title="New Value"
                value={audit.newValue}
              />
            </div>
          </section>

          {/* Close */}
          <div className="flex justify-end border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminAudit() {
  const [entity, setEntity] = useState("");
  const [action, setAction] = useState("");
  const [userId, setUserId] = useState("");
  const [page, setPage] = useState(1);
  const [selectedAudit, setSelectedAudit] = useState(null);

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useAdminAuditLogs({
    entity: entity.trim() || undefined,
    action: action.trim() || undefined,
    userId: userId.trim() || undefined,
    page,
    limit: 20,
  });

  const logs = data?.items ?? [];
  const meta = data?.meta ?? null;

  const totalPages = meta?.totalPages ?? 1;

  const resetFilters = () => {
    setEntity("");
    setAction("");
    setUserId("");
    setPage(1);
  };

  return (
    <>
      <div className="space-y-6 pb-8">
        {/* Page header */}
        <div>
          <p className="text-sm font-medium text-emerald-600">
            Administration
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Audit Logs
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Review administrative actions recorded across the
            TEC-TRAK platform.
          </p>
        </div>

        {/* Filters */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_auto_auto] lg:items-end">
            {/* Entity */}
            <div>
              <label
                htmlFor="audit-entity"
                className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"
              >
                Entity
              </label>

              <input
                id="audit-entity"
                value={entity}
                onChange={(event) => {
                  setEntity(event.target.value);
                  setPage(1);
                }}
                placeholder="e.g. Milestone"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* Action */}
            <div>
              <label
                htmlFor="audit-action"
                className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"
              >
                Action
              </label>

              <input
                id="audit-action"
                value={action}
                onChange={(event) => {
                  setAction(event.target.value);
                  setPage(1);
                }}
                placeholder="e.g. VERIFIED_MILESTONE"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* User ID */}
            <div>
              <label
                htmlFor="audit-user-id"
                className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"
              >
                User ID
              </label>

              <input
                id="audit-user-id"
                value={userId}
                onChange={(event) => {
                  setUserId(event.target.value);
                  setPage(1);
                }}
                placeholder="User UUID"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* Reset */}
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <Search size={16} />
              Reset
            </button>

            {/* Refresh */}
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A3B25] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#082f1d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={16}
                className={isFetching ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>
        </section>

        {/* Error */}
        {isError && (
          <section className="rounded-2xl border border-red-200 bg-red-50 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck
                className="mt-0.5 shrink-0 text-red-600"
                size={20}
              />

              <div>
                <h2 className="font-semibold text-red-900">
                  Unable to load audit logs
                </h2>

                <p className="mt-1 text-sm leading-6 text-red-700">
                  {error?.data?.message ||
                    error?.data?.error ||
                    error?.message ||
                    "The audit log request could not be completed."}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Audit table */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div className="flex items-center gap-2">
              <ClipboardList
                size={19}
                className="text-slate-600"
              />

              <h2 className="font-semibold text-slate-900">
                Administrative Activity
              </h2>
            </div>

            {meta && (
              <span className="text-sm text-slate-500">
                {meta.total ?? 0} event
                {meta.total === 1 ? "" : "s"}
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="p-10 text-center text-sm text-slate-500">
              Loading audit logs…
            </div>
          ) : logs.length === 0 ? (
            <div className="p-10 text-center">
              <ClipboardList
                size={30}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 font-medium text-slate-700">
                No audit events found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Try changing the filters or check again later.
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-[1100px] w-full">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr className="text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      <th className="px-5 py-3">
                        Date & Time
                      </th>

                      <th className="px-5 py-3">
                        User
                      </th>

                      <th className="px-5 py-3">
                        Action
                      </th>

                      <th className="px-5 py-3">
                        Entity
                      </th>

                      <th className="px-5 py-3">
                        Entity ID
                      </th>

                      <th className="px-5 py-3">
                        Details
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {logs.map((audit) => (
                      <tr
                        key={audit.id}
                        className="text-sm transition hover:bg-slate-50"
                      >
                        {/* Date */}
                        <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                          {formatDate(audit.createdAt)}
                        </td>

                        {/* User */}
                        <td className="max-w-64 px-5 py-4">
                          <div className="font-medium text-slate-800">
                            {audit.userName || "System"}
                          </div>

                          {audit.userEmail &&
                            audit.userEmail !== "—" && (
                              <div className="mt-1 truncate text-xs text-slate-500">
                                {audit.userEmail}
                              </div>
                            )}

                          <div className="mt-1 truncate font-mono text-[11px] text-slate-400">
                            ID: {audit.userId || "—"}
                          </div>
                        </td>

                        {/* Action */}
                        <td className="px-5 py-4">
                          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                            {audit.action || "—"}
                          </span>
                        </td>

                        {/* Entity */}
                        <td className="px-5 py-4 text-slate-700">
                          {audit.entity || "—"}
                        </td>

                        {/* Entity ID */}
                        <td className="max-w-52 truncate px-5 py-4 font-mono text-xs text-slate-500">
                          {audit.entityId || "—"}
                        </td>

                        {/* Details */}
                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedAudit(audit)
                            }
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-slate-500">
                  Page {meta?.page ?? page} of{" "}
                  {totalPages}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={!meta?.hasPrev}
                    onClick={() =>
                      setPage((current) =>
                        Math.max(1, current - 1)
                      )
                    }
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    disabled={!meta?.hasNext}
                    onClick={() =>
                      setPage((current) => current + 1)
                    }
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </div>

      {/* Details modal */}
      <AuditDetailModal
        audit={selectedAudit}
        onClose={() => setSelectedAudit(null)}
      />
    </>
  );
}