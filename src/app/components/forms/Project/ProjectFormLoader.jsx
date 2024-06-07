import React from 'react'
import ProjectForm from './ProjectForm'
import getDropdownData from '@/data/dynamic/NewProjectDDoptions';
import { getProjectData } from '@/utilities/project/project-utils';

async function ProjectFormLoader({ params, isEdit }) {

  const project_id = params.project_id
  const projectDropdowns = await getDropdownData();

  let projectDetails = {};
  let projectCount = 0;

  if (project_id && isEdit) {
    projectDetails = await getProjectData(project_id)
  }

  return (
    <ProjectForm isEdit={isEdit} defaultData={projectDetails.data} projectDropdowns={projectDropdowns} />
  )
}

export default ProjectFormLoader
