import { NextResponse } from "next/server"

export function success_res(status = null) {
    if (!!status) return NextResponse({ res: "success" })
    return NextResponse.json({ res: "success" }, { status })
}

export function failed_res(status = null) {
    if (!!status) return NextResponse({ res: "failed" })
    return NextResponse.json({ res: "failed" }, { status })
}

export function success() {
    return { res: "success" }
}

export function failed() {
    return { res: "failed" }
}