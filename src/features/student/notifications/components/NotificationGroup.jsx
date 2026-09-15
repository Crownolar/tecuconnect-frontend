import NotificationItem from "./NotificationItem";

const NotificationGroup = ({ label, items }) => {
  return (
    <section className="space-y-3">
      <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-text-secondary">
        {label}
      </h2>

      <div className="space-y-2.5">
        {items.map((item, index) => (
          <NotificationItem
            key={`${item.title}-${index}`}
            item={item}
          />
        ))}
      </div>
    </section>
  );
};

export default NotificationGroup;