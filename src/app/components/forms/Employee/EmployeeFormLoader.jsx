import EmployeeForm from '@/app/components/forms/Employee/EmployeeForm'
import { getEmployeeData } from '@/utilities/employee/employee-utils'
import getDropdownData from '@/data/dynamic/NewEmployeeDDOptions'

async function EmployeeFormLoader({ params, isEdit }) {

    const optionsData = await getDropdownData()
    let employeeData;
    let employeeCount;

    if (params?.employee_id && isEdit) {
        const employee_id = params?.employee_id
        const employeeRes = await getEmployeeData(employee_id)
        const employeeDataRes = employeeRes.data ?? []
        employeeCount = employeeDataRes.length
        employeeData = employeeDataRes[0]
    }

    return (
        isEdit ? employeeCount > 0 ?
            <EmployeeForm isEdit={isEdit} defaultValues={employeeData} optionsData={optionsData} />
            :
            <div>No Employee Found</div>
            :
            <EmployeeForm isEdit={isEdit} defaultValues={employeeData} optionsData={optionsData} />
    )
}

export default EmployeeFormLoader
