import { getClients } from '../../../utilities/db-utils';
import * as res from '../../../utilities/response-utils';

export async function GET() {
    const result = await getClients();
    if (result.res === "success") {

        const data = result.data;
        const message = (data.length > 0) ? "Clients List" : "No Clients Found"
        return res.success_res(200, message, result.data)
    }

    return res.failed_res()

}