import "./globals.css";
import Header from "./components/header/Header";
import AuthProvider from "../providers/AuthProvider"; // Import your AuthProvider component
import Sidebar from "./components/sidebar/Sidebar";
import { getSession } from "../utilities/auth-utils";
import Image from "next/image";


export const metadata = {
  title: "Laceco Portal",
  description: "Laceco's Intranet Portal",
};

export default async function RootLayout({ children }) {

  const session = await getSession()

  const navItems = [
    { id: crypto.randomUUID(), icon: <Image src="/resources/icons/home.svg" height="30" width="30" alt="nav-icon" />, label: "Home Page", redirectTo: "/hr" },
    { id: crypto.randomUUID(), icon: <Image src="/resources/icons/add-employee.svg" height="30" width="30" alt="nav-icon" />, label: "Add Employee", redirectTo: "/hr/add-employee" },
    { id: crypto.randomUUID(), icon: <Image src="/resources/icons/employee-list.svg" height="30" width="30" alt="nav-icon" />, label: "Employee Management", redirectTo: "/hr/employee-management" },
  ];

  return (
    <html lang="en">
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
      </head>
      <body className="flex flex-col gap-4 h-screen text-pri-txtc">
        <AuthProvider>
          <Header burgerNavItems={navItems} />
          <div className="flex gap-5 h-full">
            {!!session && <Sidebar sidebarItems={navItems} />}
            <div className="w-3/5 mx-auto  mob:w-10/12 tablet:w-11/12 desk:w-3/5">
              {children}
            </div>

          </div>
        </AuthProvider>
      </body>
    </html>
  );
}