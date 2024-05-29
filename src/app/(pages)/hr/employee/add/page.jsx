import EmployeeFormLoader from "@/app/components/forms/Employee/EmployeeFormLoader"

async function AddEmployee({ params }) {

  return (
    <EmployeeFormLoader params={params} />
  )

}

export default AddEmployee
