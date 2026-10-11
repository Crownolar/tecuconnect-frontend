import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import PageHeader from "../../../../components/shared/PageHeader";

import MentorshipStats from "../components/MentorshipStats";
import UpcomingSessionCard from "../components/UpcomingSessionCard";
import MentorGrid from "../components/MentorGrid";
import RecentSessions from "../components/RecentSessions";
import RecommendedMentorship from "../components/RecommendedMentorship";
import RequestMentorshipModal from "../components/RequestMentorshipModal";

import {
  useMentorshipOverview,
  useMentors,
  useRequestMentorship,
  useMentorshipRequests,
} from "../hook/useMentorship";
import MentorProfileModal from "../components/MentorProfileModal";

const Mentorship = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Expertise");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [profileMentorId, setProfileMentorId] = useState(null);

  const requestMentorshipMutation = useRequestMentorship();

  // const handleRequestMentorship = (mentor) => {
  //   setSelectedMentor(mentor);
  // };

  const getRequestStatus = (status) => {
    switch (status) {
      case "PENDING":
        return {
          label: "Pending",
          className: "border-amber-200 bg-amber-50 text-amber-700",
        };

      case "ACCEPTED":
        return {
          label: "Accepted",
          className: "border-emerald-200 bg-emerald-50 text-emerald-700",
        };

      case "REJECTED":
        return {
          label: "Rejected",
          className: "border-red-200 bg-red-50 text-red-700",
        };

      default:
        return {
          label: status || "Unknown",
          className: "border-border bg-slate-50 text-text-secondary",
        };
    }
  };

  const handleSubmitMentorship = async (payload) => {
    try {
      await requestMentorshipMutation.mutateAsync(payload);
      setSelectedMentor(null);
    } catch (error) {
      console.error("Mentorship request failed:", error);
    }
  };

  const {
    data: overview,
    isLoading: overviewLoading,
    isError: overviewError,
    error: overviewErrorData,
  } = useMentorshipOverview();

  const {
    data: mentorsResponse,
    isLoading: mentorsLoading,
    isError: mentorsError,
  } = useMentors({
    acceptingOnly: true,
  });

  const mentors = Array.isArray(mentorsResponse)
    ? mentorsResponse
    : (mentorsResponse?.data ?? []);

  const {
    data: requestsResponse,
    isLoading: requestsLoading,
    isError: requestsError,
  } = useMentorshipRequests();

  const mentorshipRequests = Array.isArray(requestsResponse)
    ? requestsResponse
    : (requestsResponse?.data ?? []);

  const upcomingSessions = overview?.upcomingSessions ?? [];
  const recentSessions = overview?.recentSessions ?? [];

  const stats = [
    {
      id: "active-mentorships",
      label: "Active Mentorships",
      value: overview?.stats?.activeMentorships ?? 0,
    },
    {
      id: "sessions-completed",
      label: "Sessions Completed",
      value: overview?.stats?.sessionsCompleted ?? 0,
    },
    {
      id: "upcoming-sessions",
      label: "Upcoming Sessions",
      value: overview?.stats?.upcomingSessions ?? 0,
    },
  ];

  const upcomingSession = upcomingSessions[0] ?? null;

  const normalizedMentors = useMemo(
    () =>
      mentors.map((mentor) => ({
        ...mentor,
        avatar: mentor.avatarUrl,
        role: mentor.specialization,
        expertise: Array.isArray(mentor.expertise) ? mentor.expertise : [],
      })),
    [mentors],
  );

  const expertiseFilters = useMemo(() => {
    const values = new Set();

    mentors.forEach((mentor) => {
      (mentor.expertise ?? []).forEach((skill) => {
        values.add(skill);
      });
    });

    return ["All Expertise", ...Array.from(values)];
  }, [mentors]);

  const filteredMentors = useMemo(() => {
    const searchTerm = searchQuery.toLowerCase().trim();

    return normalizedMentors.filter((mentor) => {
      const matchesSearch =
        !searchTerm ||
        mentor.name?.toLowerCase().includes(searchTerm) ||
        mentor.role?.toLowerCase().includes(searchTerm) ||
        mentor.expertise.some((skill) =>
          String(skill).toLowerCase().includes(searchTerm),
        );

      const matchesFilter =
        activeFilter === "All Expertise" ||
        mentor.expertise.some(
          (skill) => String(skill).toLowerCase() === activeFilter.toLowerCase(),
        );

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter, normalizedMentors]);

  if (overviewLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          breadcrumb="Mentorship"
          title="Mentorship"
          description="Connect with experienced mentors and grow your entrepreneurial journey."
        />

        <div className="rounded-xl border border-border bg-white p-6">
          <p className="text-sm text-text-secondary">
            Loading mentorship data...
          </p>
        </div>
      </div>
    );
  }

  if (overviewError) {
    return (
      <div className="space-y-6">
        <PageHeader
          breadcrumb="Mentorship"
          title="Mentorship"
          description="Connect with experienced mentors and grow your entrepreneurial journey."
        />

        <div className="rounded-xl border border-red-200 bg-white p-6">
          <h2 className="font-semibold text-text-primary">
            Unable to load mentorship
          </h2>

          <p className="mt-1 text-sm text-text-secondary">
            {overviewErrorData?.message ||
              "Something went wrong while loading your mentorship data."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb="Mentorship"
        title="Mentorship"
        description="Connect with experienced mentors and grow your entrepreneurial journey."
      />

      <MentorshipStats stats={stats} />

      <section className="rounded-xl border border-border bg-white p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-text-primary">
              My Mentorship Requests
            </h2>

            <p className="mt-1 text-xs text-text-secondary">
              Track the mentorship requests you have submitted.
            </p>
          </div>

          {!requestsLoading && mentorshipRequests.length > 0 && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-text-secondary">
              {mentorshipRequests.length}
            </span>
          )}
        </div>

        {requestsLoading ? (
          <div className="mt-4 rounded-lg border border-dashed border-border bg-slate-50 px-4 py-5 text-center">
            <p className="text-sm text-text-secondary">
              Loading your mentorship requests...
            </p>
          </div>
        ) : requestsError ? (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-5">
            <p className="text-sm font-medium text-red-700">
              Unable to load your mentorship requests.
            </p>

            <p className="mt-1 text-xs text-red-600">Please try again later.</p>
          </div>
        ) : mentorshipRequests.length === 0 ? (
          <div className="mt-4 rounded-lg border border-dashed border-border bg-slate-50 px-4 py-5 text-center">
            <p className="text-sm font-medium text-text-primary">
              No mentorship requests yet
            </p>

            <p className="mt-1 text-xs text-text-secondary">
              Browse the mentor directory below to find a mentor.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {mentorshipRequests.map((request) => {
              const status = getRequestStatus(request.status);

              const mentorFirstName = request.mentor?.user?.firstName || "";

              const mentorLastName = request.mentor?.user?.lastName || "";

              const mentorFullName =
                [mentorFirstName, mentorLastName].filter(Boolean).join(" ") ||
                request.mentor?.name ||
                "Mentor";

              return (
                <div
                  key={request.id}
                  className="rounded-xl border border-border bg-slate-50 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-text-primary">
                        {request.topic || "Mentorship Request"}
                      </h3>

                      <p className="mt-1 text-xs text-text-secondary">
                        {mentorFullName}
                      </p>
                    </div>

                    <span
                      className={`inline-flex w-fit rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-2 text-xs text-text-secondary sm:grid-cols-2">
                    <div>
                      <span className="font-medium text-text-primary">
                        Requested:
                      </span>{" "}
                      {request.requestedAt
                        ? new Date(request.requestedAt).toLocaleDateString()
                        : "—"}
                    </div>

                    <div>
                      <span className="font-medium text-text-primary">
                        Preferred date:
                      </span>{" "}
                      {request.preferredDate
                        ? new Date(request.preferredDate).toLocaleString([], {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "—"}
                    </div>
                  </div>

                  {request.notes && (
                    <div className="mt-3 rounded-lg border border-border bg-white px-3 py-2.5">
                      <p className="text-[11px] font-semibold text-text-primary">
                        Your request
                      </p>

                      <p className="mt-1 text-xs leading-5 text-text-secondary">
                        {request.notes}
                      </p>
                    </div>
                  )}

                  {request.responseNote && (
                    <div className="mt-3 rounded-lg border border-border bg-white px-3 py-2.5">
                      <p className="text-[11px] font-semibold text-text-primary">
                        Mentor response
                      </p>

                      <p className="mt-1 text-xs leading-5 text-text-secondary">
                        {request.responseNote}
                      </p>
                    </div>
                  )}

                  {request.respondedAt && (
                    <p className="mt-3 text-[11px] text-text-secondary">
                      Responded{" "}
                      {new Date(request.respondedAt).toLocaleString([], {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {upcomingSession ? (
        <UpcomingSessionCard session={upcomingSession} />
      ) : (
        <div className="rounded-xl border border-border bg-white p-5">
          <div>
            <h2 className="text-base font-semibold text-text-primary">
              Upcoming Session
            </h2>

            <p className="mt-1 text-sm text-text-secondary">
              Your scheduled mentorship sessions will appear here.
            </p>
          </div>

          <div className="mt-4 rounded-lg border border-dashed border-border bg-slate-50 px-4 py-5 text-center">
            <p className="text-sm font-medium text-text-primary">
              No upcoming session
            </p>

            <p className="mt-1 text-xs text-text-secondary">
              Once a mentor accepts your request and a session is scheduled, it
              will appear here.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="rounded-xl border border-border bg-white p-5 lg:col-span-2">
          <div>
            <h2 className="text-base font-semibold text-text-primary">
              Find a Mentor
            </h2>

            <p className="mt-1 text-sm text-text-secondary">
              Connect with industry experts and experienced entrepreneurs.
            </p>
          </div>

          <div className="relative mt-5">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
            />

            <input
              type="text"
              placeholder="Search mentors by name or expertise"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-lg border border-border py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {expertiseFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  activeFilter === filter
                    ? "bg-primary text-white"
                    : "border border-border bg-white text-text-secondary hover:border-primary hover:text-primary"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mt-5">
            {mentorsLoading ? (
              <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-border">
                <p className="text-sm text-text-secondary">
                  Loading available mentors...
                </p>
              </div>
            ) : mentorsError ? (
              <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-red-200">
                <p className="text-sm text-red-600">
                  Unable to load available mentors.
                </p>
              </div>
            ) : (
              <MentorGrid
                mentors={filteredMentors}
                onViewProfile={(mentor) => setProfileMentorId(mentor.id)}
                onRequest={(mentor) => setSelectedMentor(mentor)}
              />
            )}
          </div>
          {profileMentorId && (
            <MentorProfileModal
              mentorId={profileMentorId}
              onClose={() => setProfileMentorId(null)}
              onRequest={(mentor) => {
                setProfileMentorId(null);
                setSelectedMentor(mentor);
              }}
            />
          )}
        </section>

        <aside className="space-y-4">
          <RecentSessions sessions={recentSessions} />
          <RecommendedMentorship />
        </aside>
      </div>

      {selectedMentor && (
        <RequestMentorshipModal
          mentor={selectedMentor}
          onClose={() => setSelectedMentor(null)}
          onSubmit={handleSubmitMentorship}
          isSubmitting={requestMentorshipMutation.isPending}
        />
      )}
    </div>
  );
};

export default Mentorship;
