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
  let navItems = []
  let userRole;

  if (!!session) {
    userRole = (session?.user?.role_name).trim();
  }



  const commonOptions = [{ id: crypto.randomUUID(), icon: <Image src="/resources/icons/home.svg" height="30" width="30" alt="nav-icon" />, label: "Home Page", redirectTo: "/" }]
  const HROptions = [
    { id: crypto.randomUUID(), icon: <Image src="/resources/icons/add-employee.svg" height="30" width="30" alt="nav-icon" />, label: "Add Employee", redirectTo: "/hr/add-employee" },
    { id: crypto.randomUUID(), icon: <Image src="/resources/icons/employee-list.svg" height="30" width="30" alt="nav-icon" />, label: "Employee Management", redirectTo: "/hr/employee-management" },
  ];


  switch (userRole) {
    case "HR":
      navItems = [...commonOptions, ...HROptions]
      break;
    default:
      navItems = [...commonOptions]

  }

  return (
    <html lang="en">
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
      </head>
      <body className="flex flex-col gap-4 h-screen text-pri-txtc bg-gray-100">
        <AuthProvider>
          <Header burgerNavItems={navItems} />
          <div className="flex gap-5 h-full sticky left-0">
            {!!session && <Sidebar sidebarItems={navItems} />}
            <div className="w-4/5 mx-auto mob:w-11/12 tablet:w-11/12 panel">
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}