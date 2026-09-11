import { Bell } from "lucide-react";

function NotificationIcon({ tone }) {
  const palette = {
    success: "bg-emerald-50 text-emerald-700",
    info: "bg-emerald-50 text-emerald-700",
    muted: "bg-slate-200/70 text-slate-500",
  };

  return (
    <div
      className={`grid h-6 w-6 place-items-center rounded-lg ${palette[tone] ?? palette.info}`}
    >
      <Bell />
    </div>
  );
}
function NotificationTabs({ group, item }) {
  return (
    <>
      <article
        key={`${group.label}-${item.title}`}
        className={`grid gap-3 rounded-2xl  bg-[#10B98108] border border-slate-200/80 p-4 first:border-t-0 sm:gap-4 md:grid-cols-[26px_minmax(0,1fr)_auto] md:py-5 ${
          item.tone === "muted" ? "text-slate-500" : "text-slate-800"
        }`}
      >
        <NotificationIcon tone={item.tone} />

        <div className='min-w-0'>
          <span
            className={`mb-1.5 inline-block text-[0.7rem] font-bold uppercase tracking-[0.12em] ${
              item.tone === "muted" ? "text-slate-500" : "text-emerald-700"
            }`}
          >
            {item.category}
          </span>
          <h2 className='m-0 text-base font-semibold leading-6 text-slate-900'>
            {item.title}
          </h2>
          <p className='mt-1.5 text-base leading-6 text-slate-600'>
            {item.text}
          </p>
        </div>

        <div className='whitespace-nowrap text-xs text-slate-500 md:pt-1.5'>
          {item.time}
        </div>
      </article>
    </>
  );
}

export default NotificationTabs;
