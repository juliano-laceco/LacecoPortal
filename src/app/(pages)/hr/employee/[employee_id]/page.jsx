import EmployeeForm from "@/app/components/forms/Employee/EmployeeForm";
import getDropdownData from "@/data/dynamic/NewEmployeeDDOptions";
import { getEmployeeData } from "@/utilities/employee/employee-utils";

async function EditEmployee({ params }) {

    const optionsData = await getDropdownData()
    let employeeData;
    let employeeCount;

    if (params?.employee_id) {
        const employee_id = params?.employee_id
        const employeeRes = await getEmployeeData(employee_id)
        const employeeDataRes = employeeRes.data ?? []


        employeeCount = employeeDataRes.length
        employeeData = employeeDataRes[0]
    }

    return (
        employeeCount > 0 ?
            <EmployeeForm isEdit={true} defaultValues={employeeData} optionsData={optionsData} />
            :
            <div>No Employee Found</div>

    )

}

export default EditEmployee
