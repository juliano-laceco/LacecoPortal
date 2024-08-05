import getDropdownData from "@/data/dynamic/NewProjectDDoptions";

export const metadata = {
    title: "New Project",
    description: "New project creation",
};

async function ProjectPage() {
    const projectDropdowns = await getDropdownData();

    return (
        <ProjectForm isEdit={false} projectDropdowns={projectDropdowns} />
    );
}

export default ProjectPage