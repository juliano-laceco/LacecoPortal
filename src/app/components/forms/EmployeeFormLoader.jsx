import Employee from '@/app/components/forms/EmployeeForm'
import React from 'react'
import { getEmployeeData } from '@/utilities/db-utils'
import getDropdownData from '@/data/dynamic/dropdownOptions'

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
        isEdit ? employeeCount > 0 ? <Employee isEdit={isEdit} defaultValues={employeeData} optionsData={optionsData} /> : <div>No Employee Found</div> : <Employee isEdit={isEdit} defaultValues={employeeData} optionsData={optionsData} />
    )
}

export default EmployeeFormLoader
