import EmployeeFormLoader from "@/app/components/forms/EmployeeFormLoader"

async function AddEmployee({ params }) {

  return (
    <EmployeeFormLoader params={params} />
  )

}

export default AddEmployee
