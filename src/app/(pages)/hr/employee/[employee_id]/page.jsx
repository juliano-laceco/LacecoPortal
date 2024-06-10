import EmployeeFormLoader from "@/app/components/forms/Employee/EmployeeFormLoader"

async function EditEmployee({ params }) {

    return (
        <EmployeeFormLoader params={params} isEdit />
    )

}

export default EditEmployee
