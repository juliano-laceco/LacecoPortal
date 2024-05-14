import { NextResponse } from 'next/server';

export function success_res(status = null, message = null, data = []) {
    const response = { message: message || 'success', data: [...data] }; // Include optional data object
    const init = status ? { status } : {};
    return NextResponse.json(response, init);
}

export function failed_res(status = null, error = null) {
    const data = { error: error || 'failed' };
    const init = status ? { status } : {};
    return NextResponse.json(data, init);
}

export function success() {
    return { res: true };
}

export function success_data(data) {
    return { res: true, data: data };
}

export function failed() {
    return { res: false };
}

export function failed_data(data) {
    return { res: false, data: data };
}

