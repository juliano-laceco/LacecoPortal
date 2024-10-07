import TitleComponent from "@/app/components/custom/Other/TitleComponent";
import ProjectForm from "@/app/components/forms/Project/ProjectForm";
import getDropdownData from "@/data/dynamic/NewProjectDDoptions";

export const metadata = {
    title: "New Project",
    description: "New project creation",
};

async function ProjectPage() {
    const projectDropdowns = await getDropdownData();

    return (
        <>
            <TitleComponent>New Project</TitleComponent>
            <ProjectForm isEdit={false} projectDropdowns={projectDropdowns} />
        </>
    );
}

export default ProjectPage