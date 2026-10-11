import { useMemo } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  HeartPulse,
  History,
  Mail,
  MapPin,
  Phone,
  Rocket,
  School,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useAdminStudent } from "../hooks";

function valueOrDash(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "—";
  }

  return value;
}

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatCurrency(value) {
  if (value === null || value === undefined) {
    return "—";
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatLevel(value) {
  if (!value) return "—";

  return String(value)
    .replace(/^LEVEL_\d+_/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function Section({
  icon: Icon,
  title,
  description,
  children,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-6 py-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            <Icon size={18} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-sm text-slate-500">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        {children}
      </div>
    </section>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-800">
        {valueOrDash(value)}
      </p>
    </div>
  );
}

function MetricCard({
  label,
  value,
  suffix = "",
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-xl font-semibold text-slate-900">
        {valueOrDash(value)}
        {value !== null &&
        value !== undefined &&
        value !== ""
          ? suffix
          : ""}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  const active =
    String(status || "").toUpperCase() === "ACTIVE";

  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
        active
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-600",
      ].join(" ")}
    >
      {status || "—"}
    </span>
  );
}

function CompetencyTable({ student }) {
  const rows = [
    {
      label: "Confidence",
      baseline: student?.baselineConfidence,
      current: student?.currentConfidence,
    },
    {
      label: "Self-Efficacy",
      baseline: student?.baselineSelfEfficacy,
      current: student?.currentSelfEfficacy,
    },
    {
      label: "Problem Solving",
      baseline: student?.baselineProblemSolving,
      current: null,
    },
    {
      label: "Creativity",
      baseline: student?.baselineCreativity,
      current: null,
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[500px] text-left">
        <thead className="border-b border-slate-200">
          <tr className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            <th className="px-4 py-3">
              Competency
            </th>
            <th className="px-4 py-3">
              Baseline
            </th>
            <th className="px-4 py-3">
              Current
            </th>
            <th className="px-4 py-3">
              Change
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => {
            const change =
              row.current !== null &&
              row.current !== undefined &&
              row.baseline !== null &&
              row.baseline !== undefined
                ? row.current - row.baseline
                : null;

            return (
              <tr key={row.label}>
                <td className="px-4 py-4 text-sm font-medium text-slate-800">
                  {row.label}
                </td>

                <td className="px-4 py-4 text-sm text-slate-600">
                  {valueOrDash(row.baseline)}
                </td>

                <td className="px-4 py-4 text-sm font-medium text-slate-800">
                  {valueOrDash(row.current)}
                </td>

                <td className="px-4 py-4 text-sm font-semibold">
                  {change === null ? (
                    <span className="text-slate-400">
                      —
                    </span>
                  ) : (
                    <span
                      className={
                        change >= 0
                          ? "text-emerald-600"
                          : "text-red-600"
                      }
                    >
                      {change > 0 ? "+" : ""}
                      {change}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function BusinessProfiles({ profiles }) {
  if (!profiles?.length) {
    return (
      <p className="text-sm text-slate-500">
        No business profile has been recorded.
      </p>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {profiles.map((business) => (
        <div
          key={business.id}
          className="rounded-xl border border-slate-200 p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-slate-900">
                {valueOrDash(business.businessName)}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {valueOrDash(business.sector)}
              </p>
            </div>

            <StatusBadge
              status={
                business.isActive
                  ? "ACTIVE"
                  : "INACTIVE"
              }
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            {valueOrDash(business.description)}
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field
              label="Business Model"
              value={business.businessModel}
            />

            <Field
              label="Registration Number"
              value={business.registrationNumber}
            />

            <Field
              label="Registered"
              value={
                business.isRegistered
                  ? "Yes"
                  : "No"
              }
            />

            <Field
              label="Date Established"
              value={formatDate(
                business.dateEstablished,
              )}
            />

            <Field
              label="Monthly Revenue"
              value={formatCurrency(
                business.monthlyRevenue,
              )}
            />

            <Field
              label="Gross Profit"
              value={formatCurrency(
                business.grossProfit,
              )}
            />

            <Field
              label="Net Profit"
              value={formatCurrency(
                business.netProfit,
              )}
            />

            <Field
              label="Employees"
              value={business.numberOfEmployees}
            />

            <Field
              label="Customers"
              value={business.numberOfCustomers}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillsSection({ skills }) {
  if (!skills?.length) {
    return (
      <p className="text-sm text-slate-500">
        No skills or interests recorded.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-slate-200 p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-slate-800">
                {item.label ||
                  item.skill?.name ||
                  "Unnamed skill"}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {item.skill?.category ||
                  "Student interest"}
              </p>
            </div>

            {item.isInterest && (
              <span className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-700">
                Interest
              </span>
            )}
          </div>

          {item.skill?.description && (
            <p className="mt-3 text-sm leading-5 text-slate-500">
              {item.skill.description}
            </p>
          )}

          <p className="mt-3 text-xs text-slate-400">
            Added {formatDate(item.createdAt)}
          </p>
        </div>
      ))}
    </div>
  );
}

function MentorAssignments({ assignments }) {
  if (!assignments?.length) {
    return (
      <p className="text-sm text-slate-500">
        No mentor assignment has been recorded.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {assignments.map((assignment) => {
        const mentor = assignment.mentor;
        const mentorUser = mentor?.user;

        return (
          <div
            key={assignment.id}
            className="rounded-xl border border-slate-200 p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <UserRound size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {[
                        mentorUser?.firstName,
                        mentorUser?.lastName,
                      ]
                        .filter(Boolean)
                        .join(" ") ||
                        "Unnamed mentor"}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {mentorUser?.email || "—"}
                    </p>
                  </div>

                  <StatusBadge
                    status={
                      assignment.isActive
                        ? "ACTIVE"
                        : "ENDED"
                    }
                  />
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Specialization"
                    value={mentor?.specialization}
                  />

                  <Field
                    label="Max Mentees"
                    value={mentor?.maxMentees}
                  />

                  <Field
                    label="Assigned"
                    value={formatDate(
                      assignment.assignedAt,
                    )}
                  />

                  <Field
                    label="Ended"
                    value={formatDate(
                      assignment.endedAt,
                    )}
                  />

                  <Field
                    label="Assignment End Reason"
                    value={assignment.endReason}
                  />

                  <Field
                    label="Accepting Applications"
                    value={
                      mentor?.isAcceptingApplications
                        ? "Yes"
                        : "No"
                    }
                  />
                </div>

                {mentor?.expertise?.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Expertise
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {mentor.expertise.map(
                        (expertise) => (
                          <span
                            key={expertise}
                            className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                          >
                            {expertise}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {mentor?.bio && (
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {mentor.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MaturityHistory({ history }) {
  if (!history?.length) {
    return (
      <p className="text-sm text-slate-500">
        No maturity history available.
      </p>
    );
  }

  return (
    <div className="relative space-y-0">
      {history.map((item, index) => (
        <div
          key={item.id}
          className="relative flex gap-4 pb-7 last:pb-0"
        >
          {index !== history.length - 1 && (
            <div className="absolute left-[7px] top-4 h-full w-px bg-slate-200" />
          )}

          <div className="relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full border-4 border-emerald-100 bg-emerald-500" />

          <div className="min-w-0 flex-1 rounded-xl border border-slate-200 p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="font-semibold text-slate-900">
                {formatLevel(item.previousLevel)}
                <span className="mx-2 text-slate-400">
                  →
                </span>
                {formatLevel(item.newLevel)}
              </div>

              <span className="text-xs text-slate-400">
                {formatDate(item.createdAt)}
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-600">
              {valueOrDash(item.reason)}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Triggered by:{" "}
              {valueOrDash(item.triggeredById)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function TeisHistory({ history }) {
  if (!history?.length) {
    return (
      <p className="text-sm text-slate-500">
        No TEIS history available.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((item) => (
        <details
          key={item.id}
          className="group rounded-xl border border-slate-200"
        >
          <summary className="cursor-pointer list-none p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-slate-900">
                  TEIS Score: {item.totalScore}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Calculated {formatDate(item.calculatedAt)}
                </p>
              </div>

              <span className="text-xs font-medium text-slate-400 group-open:hidden">
                View breakdown
              </span>
            </div>
          </summary>

          <div className="border-t border-slate-100 p-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field
                label="Technical Competence"
                value={item.technicalCompetence}
              />

              <Field
                label="Entrepreneurial Competence"
                value={item.entrepreneurialCompetence}
              />

              <Field
                label="Innovation / Product Development"
                value={item.innovationProductDev}
              />

              <Field
                label="Enterprise Creation"
                value={item.enterpriseCreation}
              />

              <Field
                label="Income Generation"
                value={item.incomeGeneration}
              />

              <Field
                label="Employment Creation"
                value={item.employmentCreation}
              />

              <Field
                label="Market Performance"
                value={item.marketPerformance}
              />

              <Field
                label="Professional Networking"
                value={item.professionalNetworking}
              />

              <Field
                label="Personal Development"
                value={item.personalDevelopment}
              />

              <Field
                label="Social / Environmental Impact"
                value={item.socialEnvironmentalImpact}
              />
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

export default function AdminStudentDetail() {
  const navigate = useNavigate();
  const { studentId } = useParams();

  const query = useAdminStudent(studentId);

  const student = query.data;

  const displayName = useMemo(() => {
    if (student?.name) {
      return student.name;
    }

    return [
      student?.firstName,
      student?.lastName,
    ]
      .filter(Boolean)
      .join(" ") || "Unnamed student";
  }, [student]);

  if (query.isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-5">
          <div className="h-6 w-32 rounded bg-slate-200" />
          <div className="h-32 rounded-2xl bg-slate-200" />
          <div className="h-64 rounded-2xl bg-slate-200" />
          <div className="h-64 rounded-2xl bg-slate-200" />
        </div>
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="p-6">
        <button
          type="button"
          onClick={() => navigate("/admin/students")}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to students
        </button>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h1 className="font-semibold text-red-900">
            Unable to load student
          </h1>

          <p className="mt-2 text-sm text-red-700">
            {query.error?.data?.message ||
              query.error?.data?.error ||
              query.error?.message ||
              "Unable to load student details."}
          </p>

          <button
            type="button"
            onClick={() => query.refetch()}
            className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="p-6 text-sm text-slate-500">
        Student record not found.
      </div>
    );
  }

  const summary = student.summary ?? {};

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate("/admin/students")}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={16} />
        Back to students
      </button>

      {/* Header */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white/10">
              <UserRound size={34} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <h1 className="text-2xl font-semibold">
                  {displayName}
                </h1>

                <StatusBadge
                  status={student.status}
                />
              </div>

              <div className="mt-3 flex flex-col gap-2 text-sm text-slate-300 sm:flex-row sm:flex-wrap sm:gap-x-6">
                <span className="inline-flex items-center gap-2">
                  <Mail size={15} />
                  {student.email}
                </span>

                <span className="inline-flex items-center gap-2">
                  <GraduationCap size={15} />
                  {student.matricNumber}
                </span>

                <span className="inline-flex items-center gap-2">
                  <School size={15} />
                  {student.department}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-xs text-slate-300">
                  Maturity
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {summary.currentMaturityLabel ||
                    formatLevel(
                      student.currentMaturityLevel,
                    )}
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-xs text-slate-300">
                  TEIS
                </p>

                <p className="mt-1 text-xl font-semibold">
                  {summary.teisScore ??
                    student.teisScore ??
                    "—"}
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-xs text-slate-300">
                  Progress
                </p>

                <p className="mt-1 text-xl font-semibold">
                  {summary.progressPct ?? 0}%
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-xs text-slate-300">
                  TRL
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {student.currentTrlLevel || "—"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal */}
      <Section
        icon={UserRound}
        title="Personal Information"
        description="Identity and personal information recorded for the student."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Field
            label="First Name"
            value={student.firstName}
          />

          <Field
            label="Last Name"
            value={student.lastName}
          />

          <Field
            label="Email"
            value={student.email}
          />

          <Field
            label="Phone"
            value={student.phone}
          />

          <Field
            label="Matric Number"
            value={student.matricNumber}
          />

          <Field
            label="Gender"
            value={student.gender}
          />

          <Field
            label="Date of Birth"
            value={formatDate(student.dateOfBirth)}
          />

          <Field
            label="Disability Status"
            value={student.disabilityStatus}
          />

          <Field
            label="Socioeconomic Background"
            value={student.socioeconomicBackground}
          />

          <Field
            label="Rural Student"
            value={
              student.isRural === null ||
              student.isRural === undefined
                ? "—"
                : student.isRural
                  ? "Yes"
                  : "No"
            }
          />
        </div>
      </Section>

      {/* Academic */}
      <Section
        icon={GraduationCap}
        title="Academic Information"
        description="University and enrolment information."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Field
            label="Programme"
            value={student.degreeProgramme}
          />

          <Field
            label="Faculty"
            value={student.faculty}
          />

          <Field
            label="Department"
            value={student.department}
          />

          <Field
            label="Level"
            value={student.level}
          />

          <Field
            label="Admission Year"
            value={student.admissionYear}
          />

          <Field
            label="Expected Graduation"
            value={student.expectedGraduationYear}
          />

          <Field
            label="Enrolled At"
            value={formatDate(student.enrolledAt)}
          />

          <Field
            label="Exited At"
            value={formatDate(student.exitedAt)}
          />

          <Field
            label="Exit Reason"
            value={student.exitReason}
          />
        </div>
      </Section>

      {/* Entrepreneurship */}
      <Section
        icon={Rocket}
        title="Entrepreneurship Progress"
        description="Current maturity, progression and programme activity."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Current Maturity"
            value={
              summary.currentMaturityLabel ||
              formatLevel(student.currentMaturityLevel)
            }
          />

          <MetricCard
            label="Progress"
            value={summary.progressPct}
            suffix="%"
          />

          <MetricCard
            label="TEIS"
            value={
              summary.teisScore ??
              student.teisScore
            }
          />

          <MetricCard
            label="TRL"
            value={student.currentTrlLevel}
          />

          <MetricCard
            label="Attendance"
            value={summary.attendanceRate}
            suffix="%"
          />

          <MetricCard
            label="Verified Milestones"
            value={summary.milestonesVerified}
          />

          <MetricCard
            label="Pending Milestones"
            value={summary.milestonesPending}
          />

          <MetricCard
            label="Needs Changes"
            value={summary.milestonesNeedsChanges}
          />

          <MetricCard
            label="Milestone Target"
            value={summary.milestoneTarget}
          />

          <MetricCard
            label="Skills Assessed"
            value={summary.skillsAssessed}
          />

          <MetricCard
            label="Mentorship Sessions"
            value={summary.mentorshipSessions}
          />

          <MetricCard
            label="Last Activity"
            value={formatDate(summary.lastActivity)}
          />
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center gap-2">
            <Target size={17} className="text-slate-500" />

            <p className="text-sm font-semibold text-slate-800">
              Next Maturity Target
            </p>
          </div>

          <p className="mt-2 text-sm text-slate-600">
            {formatLevel(summary.targetLevel)}
          </p>

          {summary.remaining?.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Remaining Requirements
              </p>

              <ul className="mt-2 space-y-2">
                {summary.remaining.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-slate-600"
                  >
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {summary.remaining?.length === 0 && (
            <p className="mt-2 text-sm font-medium text-emerald-600">
              No remaining requirements recorded.
            </p>
          )}
        </div>
      </Section>

      {/* Competencies */}
      <Section
        icon={TrendingUp}
        title="Competency Development"
        description="Baseline and current competency indicators available in the student record."
      >
        <CompetencyTable student={student} />
      </Section>

      {/* Businesses */}
      <Section
        icon={BriefcaseBusiness}
        title="Business Profile"
        description="Registered student ventures and business performance."
      >
        <BusinessProfiles
          profiles={student.businessProfiles}
        />
      </Section>

      {/* Skills */}
      <Section
        icon={Sparkles}
        title="Skills & Interests"
        description="Skills and areas of interest recorded for the student."
      >
        <SkillsSection
          skills={student.skills}
        />
      </Section>

      {/* Mentor */}
      <Section
        icon={Users}
        title="Mentor Assignment"
        description="Current and historical mentor assignment records."
      >
        <MentorAssignments
          assignments={student.mentorAssignments}
        />
      </Section>

      {/* Maturity history */}
      <Section
        icon={History}
        title="Maturity History"
        description="Historical maturity-level transitions recorded by the system."
      >
        <MaturityHistory
          history={student.maturityHistory}
        />
      </Section>

      {/* TEIS history */}
      <Section
        icon={TrendingUp}
        title="TEIS History"
        description="Historical TEIS calculations and component scores."
      >
        <TeisHistory
          history={student.teisHistory}
        />
      </Section>

      {/* Programme status */}
      <Section
        icon={HeartPulse}
        title="Programme Status"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Field
            label="Status"
            value={student.status}
          />

          <Field
            label="Active"
            value={
              student.isActive
                ? "Yes"
                : "No"
            }
          />

          <Field
            label="Completed"
            value={
              summary.isCompleted
                ? "Yes"
                : "No"
            }
          />

          <Field
            label="Last Activity"
            value={formatDate(
              summary.lastActivity,
            )}
          />
        </div>
      </Section>
    </div>
  );
}