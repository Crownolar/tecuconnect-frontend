import { ArrowRight, FileCheck2 } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../../components/ui/Card";
import StatusBadge from "../../../components/shared/StatusBadge";

export default function ReviewList({ reviews = [], limit }) {
  const items = limit ? reviews.slice(0, limit) : reviews;

  if (!items.length) {
    return (
      <Card>
        <div className="py-8 text-center">
          <FileCheck2 className="mx-auto text-text-secondary" size={24} />
          <p className="mt-3 text-sm font-semibold text-text-primary">No pending reviews</p>
          <p className="mt-1 text-xs text-text-secondary">You're up to date with milestone verification.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead className="border-b border-border bg-slate-50">
            <tr className="text-xs font-semibold text-text-secondary">
              <th className="px-5 py-3">Student</th>
              <th className="px-5 py-3">Milestone</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Submitted</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((review) => (
              <tr key={review.id} className="text-sm">
                <td className="px-5 py-4 font-semibold text-text-primary">{review.student}</td>
                <td className="px-5 py-4 text-text-primary">{review.milestone}</td>
                <td className="px-5 py-4 text-text-secondary">{review.category}</td>
                <td className="px-5 py-4 text-text-secondary">{review.submittedAt}</td>
                <td className="px-5 py-4"><StatusBadge status={review.status} /></td>
                <td className="px-5 py-4 text-right">
                  <Link
                    to={`/mentor/reviews?claim=${review.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    Review <ArrowRight size={14} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
