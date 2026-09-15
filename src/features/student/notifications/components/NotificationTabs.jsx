const NotificationTabs = ({
  tabs,
  activeTab,
  onChange,
}) => {
  return (
    <nav
      aria-label="Notification categories"
      className="flex items-center gap-2 overflow-x-auto"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-primary-light text-primary"
                : "text-text-secondary hover:bg-slate-100 hover:text-text-primary"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </nav>
  );
};

export default NotificationTabs;