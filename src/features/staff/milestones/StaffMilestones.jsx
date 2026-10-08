import { useStaffMilestones } from "../hooks";

export default function StaffMilestones() {
  const { data = [], isLoading, isError } = useStaffMilestones();
  console.log(data);

  if (isLoading) {
    return <p className='text-sm text-slate-500'>Loading Milestones...</p>;
  }

  if (isError) {
    return (
      <div className='rounded-xl bg-red-50 p-4 text-sm text-red-700'>
        Unable to load Milestones.
      </div>
    );
  }
  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-bold text-slate-900'>Milestones</h1>

      <p className='text-sm text-slate-500'>
        Monitor student milestone activity and pending submissions.
      </p>

      <div className='rounded-2xl border border-slate-200 bg-white p-6'>
        <p className='text-sm text-slate-600'>
          Milestone monitoring will be connected to the backend milestone
          workflow.
        </p>
      </div>
    </div>
  );
}
