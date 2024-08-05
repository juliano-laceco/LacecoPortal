import EmployeeForm from "@/app/components/forms/Employee/EmployeeForm"
import getDropdownData from "@/data/dynamic/NewEmployeeDDOptions"

async function AddEmployee() {

  const optionsData = await getDropdownData()

  return (
    <EmployeeForm isEdit={false} defaultValues={{}} optionsData={optionsData} />
  )
}

export default AddEmployee
