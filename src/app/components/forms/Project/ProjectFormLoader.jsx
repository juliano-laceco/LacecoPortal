import React from 'react'
import ProjectForm from './ProjectForm'

async function ProjectFormLoader({ params, isEdit }) {

  const project_id = params.project_id

  let projectDetails = {};
  let projectCount = 0;
  
  if (project_id && isEdit) {
    // logic to fetch the project details
  }

  return (
    <ProjectForm isEdit={isEdit} defaultValues={{}} optionsData={[]} />
  )
}

export default ProjectFormLoader
