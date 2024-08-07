import { getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/options";

export async function getSession() {
    return await getServerSession(authOptions)
}

export async function getLoggedInId() {

    const session = await getSession()
    const loggedInId = session?.user?.employee_id

    return loggedInId
}