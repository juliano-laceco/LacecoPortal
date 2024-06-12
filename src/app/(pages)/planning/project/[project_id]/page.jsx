const { default: ProjectFormLoader } = require("@/app/components/forms/Project/ProjectFormLoader");

function ProjectPage(props) {
    return (
       <ProjectFormLoader  {...props} isEdit={true}/>
    )
}

export default ProjectPage
