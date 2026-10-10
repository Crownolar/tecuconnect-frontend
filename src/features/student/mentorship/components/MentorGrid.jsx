import MentorCard from "./MentorCard";

const MentorGrid = ({ mentors, onRequest, onViewProfile }) => {
  if (!mentors.length) {
    return (
      <div className="rounded-2xl border bg-white p-8 text-center">
        <h3 className="font-semibold text-gray-900">No mentors found</h3>

        <p className="mt-2 text-sm text-gray-500">
          Try adjusting your search or expertise filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {mentors.map((mentor) => (
        <MentorCard key={mentor.id} mentor={mentor} onRequest={onRequest} onViewProfile={onViewProfile} />
      ))}
    </div>
  );
};

export default MentorGrid;
