import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";

import MentorshipStats from "./components/MentorshipStats";
import MentorshipRequestList from "./components/MentorshipRequestList";
import RequestDetailModal from "./components/RequestDetailModal";
import RequestDecisionModal from "./components/RequestDecisionModal";
import SessionList from "./components/SessionList";
import {
  useMentorshipRequests,
  useMentorshipSessions,
  useUpdateMentorshipRequest,
} from "./hooks";

const tabs = [
  { id: "requests", label: "Requests" },
  { id: "upcoming", label: "Upcoming Sessions" },
  { id: "recent", label: "Recent Sessions" },
];

export default function Mentorship() {
  const [activeTab, setActiveTab] = useState("requests");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [decision, setDecision] = useState(null);
  const [decisionError, setDecisionError] = useState("");

  const requestsQuery = useMentorshipRequests();
  const sessionsQuery = useMentorshipSessions();
  const updateRequest = useUpdateMentorshipRequest();

  const requests = Array.isArray(requestsQuery.data) ? requestsQuery.data : [];
  const sessions = Array.isArray(sessionsQuery.data) ? sessionsQuery.data : [];

  // The `/mentorship/me` endpoint is student-scoped and returns 403 for mentors.
  // Mentor stats are therefore derived from the mentor-authorized request/session
  // endpoints instead of making a role-incompatible overview request.
  const pendingRequests = requests.filter(
    (request) => request.status === "PENDING",
  ).length;

  const activeMentorships = useMemo(() => {
    const accepted = requests.filter(
      (request) => request.status === "ACCEPTED",
    );
    return new Set(
      accepted
        .map((request) => request.studentId || request.student?.id)
        .filter(Boolean),
    ).size;
  }, [requests]);

  const upcomingSessions = useMemo(
    () => sessions.filter((session) => session.status === "SCHEDULED"),
    [sessions],
  );

  const recentSessions = useMemo(
    () => sessions.filter((session) => session.status !== "SCHEDULED"),
    [sessions],
  );

  const sessionsCompleted = useMemo(
    () => sessions.filter((session) => session.status === "COMPLETED").length,
    [sessions],
  );

  const stats = {
    activeMentorships,
    pendingRequests,
    upcomingSessions: upcomingSessions.length,
    sessionsCompleted,
  };

  const hasError = requestsQuery.isError || sessionsQuery.isError;

  const handleDecision = async (payload) => {
    if (!decision?.request?.id) return;

    setDecisionError("");

    try {
      await updateRequest.mutateAsync({
        requestId: decision.request.id,
        payload,
      });

      setDecision(null);
      setSelectedRequest(null);
    } catch (error) {
      setDecisionError(
        error?.data?.message ||
          error?.message ||
          "We could not update this mentorship request.",
      );
    }
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Mentor Portal
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-text-primary">
            Mentorship
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Manage student mentorship requests and sessions assigned to you.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            requestsQuery.refetch();
            sessionsQuery.refetch();
          }}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-white px-3 py-2 text-sm font-semibold text-text-primary hover:bg-slate-50"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      <MentorshipStats stats={stats} />

      {hasError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          We could not load one or more mentorship sections. Refresh the page
          and try again.
        </div>
      ) : null}

      <section className="rounded-xl border border-border bg-white">
        <div className="border-b border-border px-4 pt-4 sm:px-5">
          <div className="flex gap-5 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap border-b-2 px-1 pb-3 text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-text-secondary hover:text-text-primary"
                }`}
              >
                {tab.label}
                {tab.id === "requests" && stats.pendingRequests > 0 ? (
                  <span className="ml-2 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">
                    {stats.pendingRequests}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-5">
          {activeTab === "requests" ? (
            requestsQuery.isLoading ? (
              <Loading />
            ) : (
              <MentorshipRequestList
                requests={requests}
                onView={setSelectedRequest}
                onAccept={(request) => setDecision({ request, mode: "accept" })}
                onReject={(request) => setDecision({ request, mode: "reject" })}
              />
            )
          ) : null}

          {activeTab === "upcoming" ? (
            sessionsQuery.isLoading && !upcomingSessions.length ? (
              <Loading />
            ) : (
              <SessionList
                sessions={upcomingSessions}
                emptyMessage="Accepted mentorship requests with scheduled dates will appear here."
              />
            )
          ) : null}

          {activeTab === "recent" ? (
            sessionsQuery.isLoading && !recentSessions.length ? (
              <Loading />
            ) : (
              <SessionList
                sessions={recentSessions}
                emptyMessage="Completed mentorship sessions will appear here."
              />
            )
          ) : null}
        </div>
      </section>

      <RequestDetailModal
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
      />

      <RequestDecisionModal
        request={decision?.request}
        mode={decision?.mode}
        isSubmitting={updateRequest.isPending}
        error={decisionError}
        onClose={() => {
          if (!updateRequest.isPending) {
            setDecisionError("");
            setDecision(null);
          }
        }}
        onSubmit={handleDecision}
      />
    </div>
  );
}

function Loading() {
  return (
    <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-text-secondary">
      Loading mentorship data...
    </div>
  );
}
