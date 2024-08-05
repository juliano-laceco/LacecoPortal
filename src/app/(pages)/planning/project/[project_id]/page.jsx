import ProjectForm from "@/app/components/forms/Project/ProjectForm";
import getDropdownData from "@/data/dynamic/NewProjectDDoptions";
import { getProjectData } from "@/utilities/project/project-utils";

export const metadata = {
    title: "Edit Project",
    description: "Description about the project info",
};

async function ProjectPage({ params }) {
    
    const project_id = params.project_id;

    const projectDropdowns = await getDropdownData();

    let projectDetails = {};
    let projectCount = 0;

    if (project_id) {
        projectDetails = await getProjectData(project_id);
        projectCount = projectDetails.data ? 1 : 0;
    }

    return (

        projectCount > 0 ?
            <ProjectForm isEdit={true} defaultData={{ ...(projectDetails.data), project_id }} projectDropdowns={projectDropdowns} />
            :
            <div>No Project Found</div>


    );
}

export default ProjectPage
