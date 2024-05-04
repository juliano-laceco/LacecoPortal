import { NextResponse } from 'next/server';
import { handleEmployeeLogin } from '../../utilities/db-utils';

export async function POST(request) {
    try {
        const data = await request.json();
        const { email, google_sub } = data;
        console.log(data);

        if (!email || !google_sub) {
            return NextResponse.json(
                { error: 'Missing email address or sub in request body' },
                { status: 400 }
            );
        }

        const result = await handleEmployeeLogin(email, google_sub);
        console.log(result);

        if (result.res === 'success') {
            return NextResponse.json({ message: 'Employee login successful' });
        } else {
            return NextResponse.json({ error: 'Failed to log in the employee' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'An error occurred while logging in the employee' }, { status: 500 });
    }
}