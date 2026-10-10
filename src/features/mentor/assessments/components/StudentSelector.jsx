export default function StudentSelector({ students, value, onChange, disabled }) {
  return (
    <div>
      <label htmlFor="assessment-student" className="text-sm font-semibold text-text-primary">
        Student
      </label>
      <select
        id="assessment-student"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
      >
        <option value="">Select an assigned student</option>
        {students.map((student) => (
          <option key={student.id} value={student.id}>
            {student.name || student.email || student.id}
          </option>
        ))}
      </select>
    </div>
  );
}
