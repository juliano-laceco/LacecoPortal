import { getClients } from "@/utilities/lookups/lookup-utils"

export default async function getDropdownData() {
    const clientsRes = await getClients()
    const clients = clientsRes.data

    return { clients }
}

