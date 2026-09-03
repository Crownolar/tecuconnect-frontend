import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Breadcrumb({
  items = [],
}) {
  return (
    <nav className="mb-4 flex items-center gap-1 text-xs text-text-secondary">
      
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-1"
        >
          {item.to ? (
            <Link
              to={item.to}
              className="hover:text-primary"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-text-primary">
              {item.label}
            </span>
          )}

          {index < items.length - 1 && (
            <ChevronRight size={14} />
          )}
        </div>
      ))}

    </nav>
  );
}