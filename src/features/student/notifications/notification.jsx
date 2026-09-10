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

function NotificationIcon({ tone }) {
  const colors = {
    success: "#0f766e",
    info: "#0f766e",
    muted: "#6b7280",
  };

  return (
    <div className={`notification-icon ${tone}`}>
      <svg viewBox='0 0 24 24' aria-hidden='true'>
        <path d='M12 2.75A6.75 6.75 0 0 1 18.75 9.5v4.43l1.82 3.28A1 1 0 0 1 19.7 19H4.3a1 1 0 0 1-.87-1.79l1.82-3.28V9.5A6.75 6.75 0 0 1 12 2.75Zm0 18.5a2.5 2.5 0 0 1-2.45-2h4.9A2.5 2.5 0 0 1 12 21.25Z' />
      </svg>
    </div>
  );
}

export default function NotificationCenter() {
  return (
    <div className='notification-shell'>
      <style>{`
        * { box-sizing: border-box; }

        .notification-shell {
          width: 100%;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          background: #eef3f5;
          padding: 32px 18px;
          font-family: Inter, 'Segoe UI', sans-serif;
          color: #1f2937;
        }

        .notification-panel {
          width: min(100%, 1180px);
          background: #f7f9f9;
          border: 1px solid #dfe6e7;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 1px 0 rgba(15, 23, 42, 0.03);
        }

        .notification-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 18px;
          padding: 20px 28px 12px;
        }

        .notification-title-wrap {
          flex: 1;
        }

        .notification-title {
          margin: 0;
          font-size: clamp(2rem, 2.6vw, 3rem);
          line-height: 1.1;
          letter-spacing: -0.04em;
          font-weight: 700;
          color: #0f172a;
        }

        .notification-subtitle {
          margin: 8px 0 0;
          color: #5e6d7a;
          font-size: 0.98rem;
        }

        .read-button {
          border: 1px solid #dfe7ec;
          background: #fff;
          color: #1f2937;
          border-radius: 10px;
          padding: 9px 14px;
          font-size: 0.85rem;
          cursor: pointer;
          white-space: nowrap;
        }

        .notification-tabs {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 28px 18px;
        }

        .notification-tab {
          position: relative;
          border: 1px solid transparent;
          background: transparent;
          color: #4b5563;
          border-radius: 10px;
          font-size: 0.9rem;
          padding: 9px 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .notification-tab.active {
          background: #eef9f6;
          color: #0f766e;
          border-color: rgba(15, 118, 110, 0.35);
          box-shadow: inset 0 0 0 1px rgba(15, 118, 110, 0.08);
        }

        .notification-body {
          padding: 0 28px 24px;
        }

        .notification-metrics {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #6b7280;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          padding: 14px 0 10px;
        }

        .notification-list {
          border-top: 1px solid #e2e8f0;
          background: rgba(255, 255, 255, 0.18);
        }

        .notification-section {
          padding-top: 12px;
        }

        .notification-section-title {
          display: block;
          margin: 4px 0 10px;
          color: #64748b;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .notification-item {
          display: grid;
          grid-template-columns: 26px minmax(0, 1fr) auto;
          gap: 14px;
          align-items: flex-start;
          border-top: 1px solid #edf2f3;
          padding: 18px 0 16px;
          background: transparent;
        }

        .notification-item:first-child {
          border-top: none;
        }

        .notification-icon {
          width: 24px;
          height: 24px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          margin-top: 2px;
          background: rgba(15, 118, 110, 0.12);
          color: #0f766e;
        }

        .notification-icon svg {
          width: 14px;
          height: 14px;
          fill: currentColor;
        }

        .notification-icon.muted {
          background: rgba(148, 163, 184, 0.12);
          color: #64748b;
        }

        .notification-copy {
          min-width: 0;
        }

        .notification-category {
          display: inline-block;
          color: #0f766e;
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .notification-item.muted .notification-category {
          color: #64748b;
        }

        .notification-heading {
          margin: 0;
          font-size: 1.06rem;
          line-height: 1.45;
          color: #0f172a;
          font-weight: 600;
        }

        .notification-text {
          margin: 6px 0 0;
          color: #536277;
          font-size: 0.96rem;
          line-height: 1.5;
        }

        .notification-time {
          color: #64748b;
          font-size: 0.8rem;
          white-space: nowrap;
          padding-top: 7px;
        }

        @media (max-width: 760px) {
          .notification-panel {
            border-radius: 12px;
          }

          .notification-header,
          .notification-tabs,
          .notification-body {
            padding-left: 16px;
            padding-right: 16px;
          }

          .notification-header {
            flex-direction: column;
          }

          .notification-tabs {
            overflow-x: auto;
          }

          .notification-item {
            grid-template-columns: 22px 1fr;
          }

          .notification-time {
            grid-column: 2;
            padding-top: 0;
          }
        }
      `}</style>

      <div className='notification-panel'>
        <header className='notification-header'>
          <div className='notification-title-wrap'>
            <h1 className='notification-title'>Notifications</h1>
            <p className='notification-subtitle'>
              Stay updated with your entrepreneurial journey.
            </p>
          </div>

          <button type='button' className='read-button'>
            Mark all as read
          </button>
        </header>

        <nav className='notification-tabs' aria-label='Notification categories'>
          {tabs.map((tab, index) => (
            <button
              key={tab}
              type='button'
              className={`notification-tab ${index === 0 ? "active" : ""}`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className='notification-body'>
          {groups.map((group) => (
            <section key={group.label} className='notification-section'>
              <span className='notification-section-title'>{group.label}</span>

              <div className='notification-list'>
                {group.items.map((item) => (
                  <article
                    key={`${group.label}-${item.title}`}
                    className={`notification-item ${item.tone === "muted" ? "muted" : ""}`}
                  >
                    <NotificationIcon tone={item.tone} />

                    <div className='notification-copy'>
                      <span className='notification-category'>
                        {item.category}
                      </span>
                      <h2 className='notification-heading'>{item.title}</h2>
                      <p className='notification-text'>{item.text}</p>
                    </div>

                    <div className='notification-time'>{item.time}</div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
