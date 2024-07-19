import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";


export default withAuth(
    async function middleware(req) {

        const page = req.nextUrl.pathname
        const role = req.nextauth.token?.role_name

        //  console.log("THIS IS THE ROLE :", role)
        //  console.log("THIS IS THE PATHNAME :", page)

        switch (role) {
            case /^\/hr(\/|$)/.test(page):
                if (role !== "HR") return NextResponse.redirect(new URL("/forbidden", req.url))
            case /^\/planning(\/|$)/.test(page):
                if (role !== "Planning Administrator") return NextResponse.redirect(new URL("/forbidden", req.url))
        }
    },
    {
        pages: {
            signIn: "/login",
        }

    }

)

export const config = {
    matcher: ['/((?!resources|_next/static|_next/image|favicon.ico).*)']
}

