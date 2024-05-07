import { getLoggedInRole, handleEmployeeLogin } from "@/app/utilities/db-utils";
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: "490632785003-uncrgfjfimke37ddslfpp6nrenpuvmlf.apps.googleusercontent.com",
            clientSecret: "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",
            profile(profile) {
                return {
                    ...profile,
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                await handleEmployeeLogin(user.email, user.sub)
                const { role_name, role_id } = await getLoggedInRole(token?.sub)
                token = { ...token, role_name, role_id }
            }
            return token
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role_name = token.role_name
                session.user.role_id = token.role_id
                session.user.image = token.image
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
    }

};