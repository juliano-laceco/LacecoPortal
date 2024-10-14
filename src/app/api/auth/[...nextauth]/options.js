import { checkIfHod, getLoggedInRole, handleEmployeeLogin } from "@/utilities/employee/employee-utils";
import { logError } from "@/utilities/misc-utils";
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: "490632785003-uncrgfjfimke37ddslfpp6nrenpuvmlf.apps.googleusercontent.com",
            clientSecret: "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"
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {

                try {
                    const login_res = await handleEmployeeLogin(user.email, user.sub)
                    if (login_res.res) {
                        const roleRes = await getLoggedInRole(token?.sub);
                        const { isHoD, disciplines } = await checkIfHod(token?.sub);

                        if (roleRes?.res) {
                            const { role_name, role_id, employee_id } = roleRes.data;

                            token = {
                                ...token,
                                role_name,
                                role_id,
                                employee_id,
                                ...(isHoD ? { isHoD, disciplines } : {}) // Spread only if isHoD is true
                            };
                        }
                    }

                   // console.log(token)

                } catch (error) {
                    await logError(error, "Error during JWT callback")
                }
              //  console.log(token)
            }

            return token
        },
        async session({ session, token }) {

            if (session?.user) {
                session.user.role_name = token.role_name
                session.user.role_id = token.role_id
                session.user.employee_id = token.employee_id
                session.user.image = token.image
                session.user.sub = token.sub
                session.user.isHoD = token.isHoD
                token.isHoD && (session.user.disciplines = token.disciplines)
               // console.log("Session", session)
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
    }

};