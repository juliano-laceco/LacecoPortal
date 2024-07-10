import Sheet from '@/app/components/new/Sheet';
import { getAllEmployees } from '@/utilities/employee/employee-utils';
import { getDisciplines } from '@/utilities/lookups/lookup-utils';
import { getProjectData } from '@/utilities/project/project-utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import DateRangePicker from '../../../../../components/custom/Pickers/DateRangePicker'


async function ProjectDeployment({ params, searchParams }) {
  const project_id = params.project_id;
  const searchParameters = searchParams
  let { start, end } = searchParameters;


  // Fetching Project Data
  let project_response = await getProjectData(project_id);
  let project_data;
  let project_found = false;

  if (project_response.res) {
    project_data = project_response.data.projectInfo;
    project_found = true;
  }

  if (!project_found) {
    return (
      <div>
        Project Not Found
      </div>
    );
  }

  const employeeRes = await getAllEmployees();
  const employeeData = employeeRes.data;

  const disciplinesRes = await getDisciplines();
  const disciplines_data = disciplinesRes.data;

  const { title, code, first_name, last_name, position_name } = project_data;

  const filtered_employee_data = employeeData.map(({ employee_id, first_name, last_name, discipline_id, grade_code }) => {
    return {
      value: employee_id,
      label: first_name + " " + last_name,
      discipline_id: discipline_id,
      grade_code,
    };
  });

  const project_start_date = "03 April 2024"
  const project_end_date = "04 December 2024"

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="w-full flex items-center gap-5 bg-gray-400 shadow-xl p-5 rounded-md">
          <Link title="Edit Project" href={`/planning/project/${project_id}`}>
            <Image
              src="/resources/icons/edit.svg"
              height="35"
              width="35"
              alt="edit"
            />
          </Link>
          <h1 className="font-bold text-5xl text-white flex items-center gap-6">
            {title} <i className="text-lg text-black font-semibold"> Code : {code} </i>
          </h1>
        </div>
        <div className="flex gap-5">
          <div className="py-8 px-8 w-fit bg-white rounded-xl shadow-2xl space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
            <div class="relative w-10 h-10 overflow-hidden bg-red-100 rounded-full dark:bg-gray-600">
              <svg class="absolute w-12 h-12 text-red-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
            </div>
            <div className="text-center space-y-2 sm:text-left">
              <div className="space-y-0.5">
                <p className="text-lg text-black font-semibold">{first_name} {last_name}</p>
                <p className="text-slate-500 font-medium">{position_name}</p>
              </div>
            </div>
          </div>
          <div className="py-8 px-8 w-fit bg-white rounded-xl shadow-2xl space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
            <Image src="/resources/icons/budget-hours.png" height="50" width="50" />
            <div className="text-center space-y-2 sm:text-left">
              <div className="">
                <p className="text-xl text-black font-semibold">456</p>
                <p className="text-slate-500 font-medium">Budget Hours</p>
              </div>
            </div>
          </div>
          <div className="py-8 px-8 w-fit bg-white rounded-xl shadow-2xl space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
            <Image src="/resources/icons/variance.png" height="50" width="50" />
            <div className="text-center space-y-2 sm:text-left">
              <div className="space-y-0.5">
                <p className="text-xl text-red-500 font-semibold"> -30% </p>
                <p className="text-slate-500 font-medium">Variance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">Deployment Sheet</h1>

        <Sheet employee_data={filtered_employee_data} discipline_data={disciplines_data} project_start_date={project_start_date} project_end_date={project_end_date} start_date={start ?? null} end_date={end ?? null} />
      </div>
    </div>
  );
}

export default ProjectDeployment;
