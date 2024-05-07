import { handleEmployeeLogin } from '../../utilities/db-utils';
import * as res from '../../utilities/response-utils';

export async function POST(request) {
    try {
        const data = await request.json();
        const { email, google_sub } = data;

        if (!email || !google_sub) {
            return res.failed_res(400, "Missing email address or sub in request body")
        }

        const result = await handleEmployeeLogin(email, google_sub);

        if (result.res === 'success') {
            return res.success_res(201, "Employee Login Successful")
        } else {
            return res.failed_res(500, "Failed to log in the employee")
        }

    } catch (error) {
        console.error('Error processing request:', error);
        return res.failed_res(500, "An error occurred while logging in the employee")
    }
}