const MentorCard = ({ mentor }) => {
  return (
    <div className="rounded-xl border border-border bg-white p-4">
      {/* Mentor Info */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {mentor.avatar ? (
            <img
              src={mentor.avatar}
              alt={mentor.name}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            mentor.name
              .split(" ")
              .map((name) => name[0])
              .slice(0, 2)
              .join("")
          )}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-text-primary">
            {mentor.name}
          </h3>

          <p className="truncate text-xs text-text-secondary">
            {mentor.role}
          </p>
        </div>
      </div>

      {/* Bio */}
      <p className="mt-4 text-xs leading-5 text-text-secondary">
        {mentor.bio}
      </p>

      {/* Expertise */}
      <div className="mt-4 flex flex-wrap gap-2">
        {mentor.expertise.map((skill) => (
          <span
            key={skill}
            className="rounded-md bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Action */}
      <button className="mt-4 w-full rounded-md border border-primary px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white">
        View Profile
      </button>
    </div>
  );
};

export default MentorCard;