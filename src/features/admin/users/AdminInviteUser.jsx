import { useState } from "react";
import { Check, Copy, Mail, X } from "lucide-react";
import { useAdminInviteUser } from "../hooks";

const roles = [
  {
    value: "MENTOR",
    label: "Mentor",
  },
  {
    value: "STAFF",
    label: "Staff",
  },
  {
    value: "STAKEHOLDER",
    label: "Stakeholder",
  },
];

export default function AdminInviteUser({
  defaultRole = "MENTOR",
  onClose,
  onSuccess,
}) {
  const inviteMutation = useAdminInviteUser();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState(defaultRole);
  const [inviteResult, setInviteResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const errorMessage =
    inviteMutation.error?.data?.message ||
    inviteMutation.error?.data?.error ||
    inviteMutation.error?.message ||
    "Unable to create invite.";

  const handleSubmit = async (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) return;

    try {
      const response = await inviteMutation.mutateAsync({
        email: normalizedEmail,
        role,
      });

      const result = response?.data ?? response;

      setInviteResult(result);

      onSuccess?.(result);
    } catch {
      // Error is exposed through inviteMutation.error.
    }
  };

  const handleCopy = async () => {
    if (!inviteResult?.inviteLink) return;

    try {
      await navigator.clipboard.writeText(inviteResult.inviteLink);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Invite User
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Send an invitation to a platform user.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {!inviteResult ? (
          <form onSubmit={handleSubmit} className="space-y-5 p-6">
            <div>
              <label
                htmlFor="invite-email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email address
              </label>

              <input
                id="invite-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="user@example.com"
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
            </div>

            <div>
              <label
                htmlFor="invite-role"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Role
              </label>

              <select
                id="invite-role"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              >
                {roles.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {inviteMutation.isError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={inviteMutation.isPending}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Mail size={16} />

                {inviteMutation.isPending
                  ? "Creating invite..."
                  : "Create Invite"}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-5 p-6">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-emerald-100 p-2 text-emerald-700">
                  <Check size={18} />
                </div>

                <div>
                  <p className="font-semibold text-emerald-900">
                    Invitation created
                  </p>

                  <p className="mt-1 text-sm text-emerald-700">
                    The invitation has been created successfully.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Invite link
              </label>

              <div className="flex gap-2">
                <input
                  readOnly
                  value={inviteResult.inviteLink || ""}
                  className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700"
                />

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}

                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            {inviteResult.expiresAt && (
              <p className="text-xs text-slate-500">
                Expires: {new Date(inviteResult.expiresAt).toLocaleString()}
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
