import React from 'react'
import ProjectForm from './ProjectForm'
import getDropdownData from '@/data/dynamic/NewProjectDDoptions';

async function ProjectFormLoader({ params, isEdit }) {

  const project_id = params.project_id
  const projectDropdowns = await getDropdownData();

  let projectDetails = {};
  let projectCount = 0;

  if (project_id && isEdit) {
    // logic to fetch the project details
  }

  return (
    <ProjectForm isEdit={isEdit} defaultValues={{}} projectDropdowns={projectDropdowns} />
  )
}

export default ProjectFormLoader
