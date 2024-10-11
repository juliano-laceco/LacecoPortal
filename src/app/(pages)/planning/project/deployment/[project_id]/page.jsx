import HandsonSheet from '@/app/components/sheet/HandsonSheet';
import ProjectDetails from '@/app/components/sheet/ProjectDetails';
import Sheet from '@/app/components/sheet/Sheet';
import { getAllEmployees } from '@/utilities/employee/employee-utils';
import { getProjectData } from '@/utilities/project/project-utils';
import React from 'react';

export const metadata = {
  title: "Deployment Sheet",
  description: "Deployment sheet page",
};

async function ProjectDeployment({ params, searchParams }) {

  const project_id = params.project_id;
  const searchParameters = searchParams
  let { start, end } = searchParameters;


  // Fetching Project Data
  let project_response = await getProjectData(project_id);

  let project_data;
  let phase_data;

  let project_found = false;

  if (project_response.res) {
    project_data = project_response.data.projectInfo;
    project_found = true;
    phase_data = project_response.data.phases
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

  // Setting dynamic metadata title
  const pageTitle = `Deployment - ${project_data.title}`;

  return (
    <>
      <title>{pageTitle}</title>
      <div className="space-y-12 mob:hidden tablet:hidden">
        <ProjectDetails
          project_data={project_data}
          phase_data={phase_data}
        />
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">Deployment Sheet</h1>
          <Sheet employee_data={filtered_employee_data} discipline_data={disciplines_data} project_start_date={project_start_date} project_end_date={project_end_date} deployment_data={project_response.data.phases} start_date={start ?? null} end_date={end ?? null} project_data={project_data} />
        </div>
      </div>
      <div className="lap:hidden desk:hidden">Unable to view this content on your current device. Kindly switch to a larger display to edit the deployment sheet</div>
    </>
  );
}

export default ProjectDeployment;
