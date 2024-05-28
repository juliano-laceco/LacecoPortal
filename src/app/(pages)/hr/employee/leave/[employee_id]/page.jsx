import EmployeeFormLoader from "@/app/components/forms/EmployeeFormLoader"

async function EditEmployee({ params }) {

    return (
        <div>Taking a leave for employee <b>{params?.employee_id}</b></div>
    )

}

export default EditEmployee
