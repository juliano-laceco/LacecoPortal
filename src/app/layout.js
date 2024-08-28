import "./globals.css";
import Header from "./components/header/Header";
import AuthProvider from "../providers/AuthProvider"; // Import your AuthProvider component
import Sidebar from "./components/sidebar/Sidebar";
import { getSession } from "../utilities/auth/auth-utils";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import { getEmployeeAssignments, getEmployeeLinkOptions } from "@/utilities/employee/employee-utils";
import { NextUIProvider } from "@nextui-org/react";

export const metadata = {
  title: "Laceco Portal",
  description: "Laceco's Intranet Portal",
};

export default async function RootLayout({ children }) {

  const session = await getSession()

  let navItems = []
  let userRoleId;

  if (!!session) {
    userRoleId = session?.user?.role_id
  }



  const optionsRes = await getEmployeeLinkOptions(userRoleId)

  if (optionsRes.res) {
    const options = optionsRes.data

    options.map((option) =>
      navItems.push({ id: option.sidebar_link_id, icon: <Image src={`/resources/icons/${option.icon_name}.svg`} height="30" width="30" alt="nav-icon" />, label: option.label, redirectTo: option.redirects_to })
    )
  }

  return (
    <html lang="en">
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
      </head>
      <body className="flex flex-col gap-4 min-h-screen text-pri-txtc bg-gray-100">
        <NextUIProvider>
          <AuthProvider>
            <Header burgerNavItems={navItems} />
            <div className="flex gap-5 h-full sticky left-0">
              {!!session && <Sidebar sidebarItems={navItems} />}
              <div className="w-full mr-4 mob:w-11/12 mob:mx-auto tablet:w-11/12 tablet:mx-auto panel lap:pl-24 desk:pl-24  mob:mt-24 tablet:mt-28 lap:mt-28 desk:mt-28">
                {children}
              </div>
            </div>
          </AuthProvider>
        </NextUIProvider>
        <ToastContainer />
      </body>
    </html >
  );
}