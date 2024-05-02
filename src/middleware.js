import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";


export default withAuth(
    async function middleware(req) {

        const page = req.nextUrl.pathname

        const role = req.nextauth.token?.role

        switch (page) {

        }
    },
    {
        pages: {
            signIn: "/login",
        }
      
    }

)

