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
    const disciplinesUnfiltered = disciplinesRes.data

    const disciplines = disciplinesUnfiltered.filter((discipline) => discipline.label != "Proposals")
    disciplines.push({ value: 78, label: "Project Management Unit" })

    const employeesRes = await getEmployees()
    const employees = employeesRes.data

    const phaseNamesRes = await getPhaseNames()
    const phaseNames = phaseNamesRes.data

    


    return { projectInfoDropdowns: { clients, interventions, project_statuses, sectors, typologies, disciplines, employees, countries, phaseNames , project_statuses }, phaseCreationDropdowns: phaseNames }
}

