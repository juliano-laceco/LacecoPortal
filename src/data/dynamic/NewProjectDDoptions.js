import { getClients, getDisciplines, getEmployees, getPhaseNames } from "@/utilities/lookups/lookup-utils"
import interventions from "../static/interventions"
import project_statuses from "../static/project-statuses"
import sectors from "../static/sectors"
import typologies from "../static/typologies"
import countries from "../static/countries"

export default async function getDropdownData() {
    const clientsRes = await getClients()
    const clients = clientsRes.data

    const disciplinesRes = await getDisciplines(8)
    const disciplines = disciplinesRes.data

    const employeesRes = await getEmployees()
    const employees = employeesRes.data

    const phaseNamesRes = await getPhaseNames()
    const phaseNames = phaseNamesRes.data

  
    return { projectInfoDropdowns: { clients, interventions, project_statuses, sectors, typologies, disciplines, employees, countries, phaseNames }, phaseCreationDropdowns: phaseNames }
}
