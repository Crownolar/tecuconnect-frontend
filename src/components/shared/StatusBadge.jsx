import Badge from "@/components/ui/Badge";

const statusMap = {
  verified: {
    label: "Verified",
    variant: "success",
  },

  pending: {
    label: "Pending",
    variant: "warning",
  },

  needs_changes: {
    label: "Needs Changes",
    variant: "danger",
  },

  approved: {
    label: "Approved",
    variant: "success",
  },

  rejected: {
    label: "Rejected",
    variant: "danger",
  },
};

export default function StatusBadge({ status }) {
  const config = statusMap[status];

  if (!config) {
    return (
      <Badge>
        {status}
      </Badge>
    );
  }

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
}