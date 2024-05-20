import { formatDate } from "@/utilities/date/date-utils"
import { getAllEmployees } from "@/utilities/employee/employee-utils"
import EmployeeTable from "./EmployeeTable"

async function page() {

  const results = await getAllEmployees({})
  const data = results.data
  
  return (
    <EmployeeTable data={data} />
  )
}

export default page
