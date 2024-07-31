const { default: ProjectFormLoader } = require("@/app/components/forms/Project/ProjectFormLoader");

function ProjectPage(props) {
    return (
        <ProjectFormLoader  {...props} isEdit={false} />
    )
}

export default ProjectPage