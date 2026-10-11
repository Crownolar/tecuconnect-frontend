import { useStaffReports } from "../hooks";

export default function StaffReports() {
  const { data = [], isLoading, isError } = useStaffReports();
  console.log(data);
  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-bold text-slate-900'>Reports</h1>

      <p className='text-sm text-slate-500'>
        View programme participation and student activity reports.
      </p>

      <div className='rounded-2xl border border-slate-200 bg-white p-6'>
        <p className='text-sm text-slate-600'>
          Reporting and export functionality will be connected to the reporting
          API.
        </p>
      </div>
    </div>
  );
}
