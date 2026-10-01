// import Card from "../../../../components/ui/Card";
// import Avatar from "../../../../components/ui/Avatar";
// import Button from "../../../../components/ui/Button";

// export default function MentorshipCard({
//   mentorship,
// }) {
//   if (!mentorship) return null;

//   const { title, date, time, mentor } = mentorship;

//   return (
//     <Card>
//       <h3 className="text-sm font-semibold text-slate-800">
//         Upcoming Mentorship
//       </h3>

//       <div className="mt-5">
//         <h4 className="text-sm font-semibold text-slate-700">
//           {title}
//         </h4>

//         <p className="mt-2 text-xs text-slate-500">
//           {date} · {time}
//         </p>
//       </div>

//       <div className="mt-5 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <Avatar
//             name={mentor.name}
//             size="sm"
//           />

//           <div>
//             <p className="text-xs font-medium text-slate-700">
//               {mentor.name}
//             </p>

//             <span className="text-[11px] text-slate-400">
//               {mentor.role}
//             </span>
//           </div>
//         </div>

//         <Button size="sm">
//           View Session
//         </Button>
//       </div>
//     </Card>
//   );
// }


import Card from "../../../../components/ui/Card";
import Avatar from "../../../../components/ui/Avatar";
import Button from "../../../../components/ui/Button";

export default function MentorshipCard({
  mentorship,
}) {
  if (!mentorship) {
    return (
      <Card>
        <h3 className="text-sm font-semibold text-slate-800">
          Upcoming Mentorship
        </h3>

        <p className="mt-4 text-sm text-slate-500">
          You don't have an upcoming mentorship session.
        </p>
      </Card>
    );
  }

  const {
    title,
    date,
    time,
    mentor,
  } = mentorship;

  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-800">
        Upcoming Mentorship
      </h3>

      <div className="mt-5">
        <h4 className="text-sm font-semibold text-slate-700">
          {title}
        </h4>

        <p className="mt-2 text-xs text-slate-500">
          {date}
          {time ? ` · ${time}` : ""}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar
            name={mentor?.name || "TEC Mentor"}
            size="sm"
          />

          <div>
            <p className="text-xs font-medium text-slate-700">
              {mentor?.name || "TEC Mentor"}
            </p>

            <span className="text-[11px] text-slate-400">
              {mentor?.role || "TEC Mentor"}
            </span>
          </div>
        </div>

        <Button size="sm">
          View Session
        </Button>
      </div>
    </Card>
  );
}