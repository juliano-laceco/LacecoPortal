import { getDisciplines } from '../../../utilities/db-utils';
import * as res from '../../../utilities/response-utils';

export async function GET() {
    const result = await getDisciplines();

    console.log(result.data)
    if (result.res) {
        const data = result.data;
        const message = (data.length > 0) ? "Disciplines List" : "No Disciplines Found"
        return res.success_res(200, message, result.data)
    }

    return res.failed_res()

}