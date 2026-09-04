import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import PageHeader from "../../../../components/shared/PageHeader";

import MentorshipStats from "../components/MentorshipStats";
import UpcomingSessionCard from "../components/UpcomingSessionCard";
import MentorGrid from "../components/MentorGrid";
import RecentSessions from "../components/RecentSessions";
import RecommendedMentorship from "../components/RecommendedMentorship";

import { mentorshipData } from "../../../../mocks/mentorship";

const expertiseFilters = [
  "All Expertise",
  "Product",
  "Business Strategy",
  "Funding",
  "Technology",
];

const Mentorship = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Expertise");

  const {
    stats,
    upcomingSession,
    mentors,
    recentSessions,
  } = mentorshipData;

  const filteredMentors = useMemo(() => {
    const searchTerm = searchQuery.toLowerCase().trim();

    return mentors.filter((mentor) => {
      const matchesSearch =
        mentor.name.toLowerCase().includes(searchTerm) ||
        mentor.role.toLowerCase().includes(searchTerm) ||
        mentor.expertise.some((skill) =>
          skill.toLowerCase().includes(searchTerm)
        );

      const matchesFilter =
        activeFilter === "All Expertise" ||
        mentor.expertise.some(
          (skill) =>
            skill.toLowerCase() === activeFilter.toLowerCase()
        );

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter, mentors]);

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb="Mentorship"
        title="Mentorship"
        description="Connect with experienced mentors and grow your entrepreneurial journey."
      />

      {/* Stats */}
      <MentorshipStats stats={stats} />

      {/* Upcoming Session */}
      <UpcomingSessionCard session={upcomingSession} />

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Find Mentor */}
        <section className="rounded-xl border border-border bg-white p-5 lg:col-span-2">
          <div>
            <h2 className="text-base font-semibold text-text-primary">
              Find a Mentor
            </h2>

            <p className="mt-1 text-sm text-text-secondary">
              Connect with industry experts and experienced entrepreneurs.
            </p>
          </div>

          {/* Search */}
          <div className="relative mt-5">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
            />

            <input
              type="text"
              placeholder="Search mentors by name or expertise"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              className="w-full rounded-lg border border-border py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary"
            />
          </div>

          {/* Filters */}
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

          {/* Mentor Grid */}
          <div className="mt-5">
            <MentorGrid mentors={filteredMentors} />
          </div>
        </section>

        {/* Right Column */}
        <aside className="space-y-4">
          <RecentSessions sessions={recentSessions} />

          <RecommendedMentorship />
        </aside>
      </div>
    </div>
  );
};

export default Mentorship;