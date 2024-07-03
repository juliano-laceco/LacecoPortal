import Sheet from '@/app/components/new/Sheet'
import { getAllEmployees } from '@/utilities/employee/employee-utils'
import { getDisciplines } from '@/utilities/lookups/lookup-utils'
import { getProjectData } from '@/utilities/project/project-utils'
import React from 'react'

async function ProjectDeployment({ params }) {

  const project_id = params.project_id

  // Fetching Project Data
  const project_data = await getProjectData(project_id)

  const employeeRes = await getAllEmployees();
  const employeeData = employeeRes.data;

  const disciplinesRes = await getDisciplines();
  const disciplines_data = disciplinesRes.data;

  const filtered_employee_data = employeeData.map(({ employee_id, first_name, last_name, discipline_id , grade_name}) => {
    return {
      value: employee_id,
      label: first_name + " " + last_name,
      discipline_id: discipline_id,
      grade_name
    };
  });

  return (
    <div>
      {project_id}
      <Sheet employee_data={filtered_employee_data} discipline_data={disciplines_data} />
    </div>
  )
}

export default ProjectDeployment
