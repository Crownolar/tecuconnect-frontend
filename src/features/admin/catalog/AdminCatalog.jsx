import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Edit3,
  Plus,
  X,
} from "lucide-react";

import {
  useAdminCatalog,
  useCreateSkill,
  useUpdateSkill,
  useAddSkillCompetency,
} from "../hooks";

const CATEGORIES = [
  "TECHNICAL_VOCATIONAL",
  "DIGITAL",
  "CREATIVE",
  "ENTREPRENEURIAL",
  "BUSINESS",
];

const emptySkill = {
  name: "",
  category: "ENTREPRENEURIAL",
  description: "",
  isActive: true,
};

const emptyCompetency = {
  name: "",
  description: "",
  order: 0,
};

function ErrorMessage({ error }) {
  if (!error) return null;

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {error?.data?.message ||
        error?.data?.error ||
        error?.message ||
        "Something went wrong."}
    </div>
  );
}

function SkillModal({ mode, initialValue, onClose, onSubmit, isPending }) {
  const [form, setForm] = useState(initialValue || emptySkill);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) return;

    await onSubmit({
      name: form.name.trim(),
      category: form.category,
      description: form.description.trim(),
      isActive: form.isActive,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {mode === "edit" ? "Edit skill" : "Create skill"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage the entrepreneurial skill catalogue.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Skill name
            </span>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Business Validation"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Category
            </span>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-500"
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </span>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe what this skill covers..."
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
            />
          </label>

          {mode === "edit" && (
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300"
              />

              <span className="text-sm font-medium text-slate-700">
                Skill is active
              </span>
            </label>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
            >
              {isPending
                ? "Saving..."
                : mode === "edit"
                  ? "Save changes"
                  : "Create skill"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CompetencyPanel({ skill, onAdd, isPending }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyCompetency);

  const competencies = skill.competencies || [];

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) return;

    await onAdd(skill.id, {
      name: form.name.trim(),
      description: form.description.trim(),
      order: Number(form.order) || 0,
    });

    setForm(emptyCompetency);
    setOpen(false);
  };

  return (
    <div className="mt-4 border-t border-slate-100 pt-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Competencies ({competencies.length})
        </p>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          <Plus size={13} />
          Add
        </button>
      </div>

      {competencies.length > 0 && (
        <div className="mt-3 space-y-2">
          {competencies
            .slice()
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((competency) => (
              <div
                key={competency.id}
                className="rounded-lg bg-slate-50 px-3 py-2.5"
              >
                <p className="text-sm font-medium text-slate-700">
                  {competency.name}
                </p>

                {competency.description && (
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {competency.description}
                  </p>
                )}
              </div>
            ))}
        </div>
      )}

      {open && (
        <form
          onSubmit={handleSubmit}
          className="mt-3 space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
        >
          <input
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                name: event.target.value,
              }))
            }
            placeholder="Competency name"
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-500"
          />

          <textarea
            value={form.description}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
            placeholder="Competency description"
            rows={3}
            className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-500"
          />

          <input
            type="number"
            min="0"
            value={form.order}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                order: event.target.value,
              }))
            }
            placeholder="Order"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-500"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white disabled:opacity-50"
            >
              {isPending ? "Adding..." : "Add competency"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function AdminCatalog() {
  const { data, isLoading, isError, error } = useAdminCatalog();

  const createSkill = useCreateSkill();
  const updateSkill = useUpdateSkill();
  const addCompetency = useAddSkillCompetency();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [showCreate, setShowCreate] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [expandedSkill, setExpandedSkill] = useState(null);

  const skills = data?.skills ?? [];
  const faculties = data?.faculties ?? [];
  const departments = data?.departments ?? [];

  const filteredSkills = useMemo(() => {
    const term = search.trim().toLowerCase();

    return skills.filter((skill) => {
      const matchesCategory = category === "ALL" || skill.category === category;

      const matchesSearch =
        !term ||
        [skill.name, skill.category, skill.description]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [skills, search, category]);

  const handleCreate = async (payload) => {
    try {
      await createSkill.mutateAsync(payload);
      setShowCreate(false);
    } catch {
      // Mutation error is displayed below.
    }
  };

  const handleUpdate = async (payload) => {
    try {
      await updateSkill.mutateAsync({
        skillId: editingSkill.id,
        payload,
      });

      setEditingSkill(null);
    } catch {
      // Mutation error is displayed below.
    }
  };

  const handleAddCompetency = async (skillId, payload) => {
    try {
      await addCompetency.mutateAsync({
        skillId,
        payload,
      });
    } catch {
      // Mutation error is displayed below.
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-slate-500">Loading catalogue...</div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4 p-6">
        <h1 className="text-xl font-semibold text-slate-900">Catalogue</h1>
        <ErrorMessage error={error} />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-600">Administration</p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">Catalogue</h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage the skills and competencies used throughout TEC-TRAK.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          <Plus size={17} />
          Create Skill
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Faculties" value={faculties.length} />

        <Metric label="Departments" value={departments.length} />

        <Metric label="Skills" value={skills.length} />
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search skills..."
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400"
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
          >
            <option value="ALL">All categories</option>

            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">Skills</h2>

          <p className="mt-1 text-xs text-slate-500">
            {filteredSkills.length} matching skills
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredSkills.map((skill) => {
            const expanded = expandedSkill === skill.id;

            return (
              <div key={skill.id} className="px-5 py-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-slate-900">
                        {skill.name}
                      </h3>

                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                        {skill.category?.replaceAll("_", " ")}
                      </span>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                          skill.isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {skill.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>

                    {skill.description && (
                      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                        {skill.description}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingSkill(skill)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <Edit3 size={14} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setExpandedSkill(expanded ? null : skill.id)
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      {expanded ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                      Competencies
                    </button>
                  </div>
                </div>

                {expanded && (
                  <CompetencyPanel
                    skill={skill}
                    onAdd={handleAddCompetency}
                    isPending={addCompetency.isPending}
                  />
                )}
              </div>
            );
          })}

          {filteredSkills.length === 0 && (
            <div className="p-10 text-center">
              <CheckCircle2 className="mx-auto text-slate-300" size={28} />

              <p className="mt-3 text-sm font-medium text-slate-700">
                No skills found
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Try another search or create a new skill.
              </p>
            </div>
          )}
        </div>
      </section>

      {createSkill.isError && <ErrorMessage error={createSkill.error} />}

      {updateSkill.isError && <ErrorMessage error={updateSkill.error} />}

      {addCompetency.isError && <ErrorMessage error={addCompetency.error} />}

      {showCreate && (
        <SkillModal
          mode="create"
          initialValue={emptySkill}
          onClose={() => setShowCreate(false)}
          onSubmit={handleCreate}
          isPending={createSkill.isPending}
        />
      )}

      {editingSkill && (
        <SkillModal
          mode="edit"
          initialValue={{
            name: editingSkill.name || "",
            category: editingSkill.category || "ENTREPRENEURIAL",
            description: editingSkill.description || "",
            isActive: editingSkill.isActive !== false,
          }}
          onClose={() => setEditingSkill(null)}
          onSubmit={handleUpdate}
          isPending={updateSkill.isPending}
        />
      )}
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>

      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
