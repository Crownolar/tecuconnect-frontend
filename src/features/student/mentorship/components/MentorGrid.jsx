import MentorCard from "./MentorCard";

const MentorGrid = ({ mentors }) => {
  if (!mentors.length) {
    return (
      <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-border">
        <p className="text-sm text-text-secondary">
          No mentors found matching your search.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {mentors.map((mentor) => (
        <MentorCard
          key={mentor.id}
          mentor={mentor}
        />
      ))}
    </div>
  );
};

export default MentorGrid;