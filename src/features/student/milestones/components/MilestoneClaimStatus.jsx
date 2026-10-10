export default function MilestoneClaimStatus({ status }) {
  const config = {
    PENDING: {
      label: "Pending Review",
      className: "bg-amber-50 text-amber-700 border-amber-200",
    },
    VERIFIED: {
      label: "Verified",
      className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    REJECTED: {
      label: "Changes Requested",
      className: "bg-red-50 text-red-700 border-red-200",
    },
    FLAGGED_FOR_REVIEW: {
      label: "Staff Review",
      className: "bg-orange-50 text-orange-700 border-orange-200",
    },
  };

  const current = config[status] || {
    label: status || "Unknown",
    className: "bg-slate-50 text-slate-700 border-slate-200",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${current.className}`}>
      {current.label}
    </span>
  );
}
