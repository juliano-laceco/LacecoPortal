import { NextResponse } from 'next/server';

export function success_res(status = null, message = null) {
    const data = { message: message || 'success' };
    const init = status ? { status } : {};
    return NextResponse.json(data, init);
}

export function failed_res(status = null, error = null) {
    const data = { error: error || 'failed' };
    const init = status ? { status } : {};
    return NextResponse.json(data, init);
}

export function success() {
    return { res: 'success' };
}

export function failed() {
    return { res: 'failed' };
}