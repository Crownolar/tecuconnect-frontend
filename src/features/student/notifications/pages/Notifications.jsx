import { Link } from "react-router-dom";
import NotificationTabs from "../components/NotificationTabs";

const tabs = ["All", "Unread", "Mentorship", "Milestones"];

const groups = [
  {
    label: "Today",
    items: [
      {
        tone: "success",
        category: "Innovation & product",
        title: "Milestone Approved: Built Functional Prototype",
        text: "Your milestone has been verified and approved by the review committee.",
        time: "2 hours ago",
      },
      {
        tone: "info",
        category: "Mentorship",
        title: "Upcoming Session Reminder",
        text: "Pitch Deck Review Session with Dr. Amina Oladipo starts tomorrow at 2:00 PM.",
        time: "4 hours ago",
      },
      {
        tone: "info",
        category: "Mentorship recommendation",
        title: "New Mentor Recommendation",
        text: "Based on your progress, we recommend connecting with Prof. Emeka Nwakwuh for Technology guidance.",
        time: "6 hours ago",
      },
    ],
  },
  {
    label: "Earlier this week",
    items: [
      {
        tone: "success",
        category: "Milestones",
        title: "Evidence Submission Feedback",
        text: "Your evidence for Business Model Canvas milestone needs minor revisions. Check the details.",
        time: "Sep 2, 2026",
      },
      {
        tone: "muted",
        category: "System update",
        title: "Level Up: Practicing Stage",
        text: "Congratulations! You have advanced to Level 4 — Practicing in your entrepreneurial journey.",
        time: "Sep 1, 2026",
      },
    ],
  },
  {
    label: "Earlier",
    items: [
      {
        tone: "info",
        category: "Mentorship",
        title: "Session Completed",
        text: "Your Business Model Review session with Dr. Amina Oladipo has been marked as completed.",
        time: "Aug 25, 2026",
      },
      {
        tone: "success",
        category: "Milestones",
        title: "New Milestone Available",
        text: "A new milestone is ready for submission in your journey board.",
        time: "Aug 20, 2026",
      },
    ],
  },
];

export default function Notifications() {
  return (
    <div className='mx-auto w-full max-w-6xl overflow-hidden rounded-xl border border-slate-200 bg-[#f7f9f9] shadow-sm'>
      <header className='flex flex-col gap-4 px-4 pb-3 pt-5 sm:px-7 sm:pt-6 md:flex-row md:items-start md:justify-between md:gap-6'>
        <div className='min-w-0 flex-1'>
          <h1 className='m-0 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl'>
            Notifications
          </h1>
          <p className='mt-2 text-base text-slate-500'>
            Stay updated with your entrepreneurial journey.
          </p>
        </div>

        <button className='inline-flex items-center outline-none justify-center whitespace-nowrap rounded-xl border   border-none bg-white px-0 py-0 text-[0.85rem] font-medium  transition hover:bg-slate-50 text-accent'>
          Mark all as read
        </button>
      </header>

      <nav
        aria-label='Notification categories'
        className='flex items-center gap-2.5 overflow-x-auto px-4 pb-4 sm:px-7'
      >
        {tabs.map((tab, index) => (
          <Link
            key={tab}
            className={` border  px-3.5 py-2 text-sm transition ${
              index === 0
                ? " border-0 border-b-2 border-b-emerald-700  bg-[#eef9f6] text-emerald-700"
                : " border-0 border-b-2  border-b-transparent  text-slate-600 hover:bg-slate-100"
            }`}
          >
            {tab}
          </Link>
        ))}
      </nav>

      <div className='px-4 pb-6 sm:px-7 sm:pb-7'>
        {groups.map((group) => (
          <section key={group.label} className='pt-3 first:pt-0'>
            <span className='mb-2.5 block text-xs font-bold uppercase tracking-[0.12em] text-slate-500'>
              {group.label}
            </span>
            <div className=' bg-white/10 gap-2.5 mt-2.5  flex flex-col'>
              {group.items.map((item) => (
                <NotificationTabs group={group} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
