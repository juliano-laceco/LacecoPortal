import EmployeeFormLoader from "@/app/components/forms/EmployeeFormLoader"

async function EditEmployee({ params }) {

    return (
        <div>{params?.employee_id}</div>
    )

}

export default EditEmployee
