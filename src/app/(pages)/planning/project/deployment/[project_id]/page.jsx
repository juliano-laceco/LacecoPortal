import DepartmentTile from '@/app/components/DepartmentTile';
import ProjectDetails from '@/app/components/ProjectDetails';
import Sheet from '@/app/components/Sheet/Sheet';
import { getAllEmployees } from '@/utilities/employee/employee-utils';
import { getDisciplines } from '@/utilities/lookups/lookup-utils';
import { getProjectData } from '@/utilities/project/project-utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


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

  const disciplines_data = project_response.data.projectInfo.disciplines

  const { title, code, first_name, last_name, position_name } = project_data;

  const filtered_employee_data = employeeData.map(({ employee_id, first_name, last_name, discipline_id, grade_code }) => {
    return {
      value: employee_id,
      label: first_name + " " + last_name,
      discipline_id: discipline_id,
      grade_code,
    };
  });

  const project_start_date = project_data.initialDeployment ? project_data.planned_startdate : project_data.minDate
  const project_end_date = project_data.initialDeployment ? project_data.planned_enddate : project_data.maxDate

  return (
    <div className="space-y-12">

      <ProjectDetails
        project_data={project_data}
      />

      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Deployment Sheet</h1>
        <Sheet employee_data={filtered_employee_data} discipline_data={disciplines_data} project_start_date={project_start_date} project_end_date={project_end_date} deployment_data={project_response.data.phases} start_date={start ?? null} end_date={end ?? null} project_data={project_data} />
      </div>
    </div>
  );
}

export default ProjectDeployment;
