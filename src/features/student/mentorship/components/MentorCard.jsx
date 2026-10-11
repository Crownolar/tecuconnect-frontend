const MentorCard = ({ mentor, onRequest, onViewProfile }) => {
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
              ?.split(" ")
              .map((name) => name[0])
              .slice(0, 2)
              .join("")
          )}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-text-primary">
            {mentor.name}
          </h3>

          <p className="truncate text-xs text-text-secondary">{mentor.role}</p>
        </div>
      </div>

      {/* Bio */}
      <p className="mt-4 text-xs leading-5 text-text-secondary">
        {mentor.bio || "No bio available."}
      </p>

      {/* Expertise */}
      <div className="mt-4 flex flex-wrap gap-2">
        {mentor.expertise?.map((skill) => (
          <span
            key={skill}
            className="rounded-md bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => onRequest?.(mentor)}
          disabled={!mentor.isAcceptingApplications}
          className="w-full rounded-md border border-primary px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:border-border disabled:bg-transparent disabled:text-text-secondary disabled:hover:bg-transparent disabled:hover:text-text-secondary"
        >
          {mentor.isAcceptingApplications
            ? "Request Mentorship"
            : "Not Accepting"}
        </button>

        <button
          type="button"
          onClick={() => onViewProfile?.(mentor)}
          className="w-full rounded-md border border-border px-3 py-2 text-xs font-semibold text-text-secondary transition hover:bg-slate-50 sm:w-auto sm:min-w-[110px]"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default MentorCard;
