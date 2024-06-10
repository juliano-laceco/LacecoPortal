import React from 'react';
import ProjectForm from './ProjectForm';
import getDropdownData from '@/data/dynamic/NewProjectDDoptions';
import { getProjectData } from '@/utilities/project/project-utils';

async function ProjectFormLoader({ params, isEdit }) {
  const project_id = params.project_id;
  const projectDropdowns = await getDropdownData();
  let projectDetails = {};
  let projectCount = 0;

  if (project_id && isEdit) {
    projectDetails = await getProjectData(project_id);
    projectCount = projectDetails.data ? 1 : 0;
  }

  return (
    isEdit ? projectCount > 0 ?
      <ProjectForm isEdit={isEdit} defaultData={{ ...(projectDetails.data), project_id }} projectDropdowns={projectDropdowns} />
      :
      <div>No Project Found</div>
      :
      <ProjectForm isEdit={isEdit} projectDropdowns={projectDropdowns} />
  );
}

export default ProjectFormLoader;