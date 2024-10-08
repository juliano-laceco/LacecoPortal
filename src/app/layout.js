import "./globals.css";
import Header from "./components/header/Header";
import AuthProvider from "../providers/AuthProvider"; // Import your AuthProvider component
import Sidebar from "./components/sidebar/Sidebar";
import { getSession } from "../utilities/auth/auth-utils";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';


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
    { id: crypto.randomUUID(), icon: <Image src="/resources/icons/add-employee.svg" height="30" width="30" alt="nav-icon" />, label: "Add Employee", redirectTo: "/hr/employee/add" },
    { id: crypto.randomUUID(), icon: <Image src="/resources/icons/employee-list.svg" height="30" width="30" alt="nav-icon" />, label: "Employee Management", redirectTo: "/hr/employee/all" },
    { id: crypto.randomUUID(), icon: <Image src="/resources/icons/calendar-off.svg" height="30" width="30" alt="nav-icon" />, label: "Employee Leaves", redirectTo: "/hr/employee/leaves" },
  ];


  const PlanningAdminOptions = [
    { id: crypto.randomUUID(), icon: <Image src="/resources/icons/new-project.svg" height="30" width="30" alt="nav-icon" />, label: "New Project", redirectTo: "/planning/project/add" },
    { id: crypto.randomUUID(), icon: <Image src="/resources/icons/project-list.svg" height="30" width="30" alt="nav-icon" />, label: "Project List", redirectTo: "/planning/project/all" },
  ]

  switch (userRole) {
    case "HR":
      navItems = [...commonOptions, ...HROptions]
      break;
    case "Planning Administrator":
      navItems = [...commonOptions, ...PlanningAdminOptions]
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
              <div className="w-full mr-4 mob:w-11/12 mob:mx-auto tablet:w-11/12 tablet:mx-auto panel lap:pl-24 desk:pl-24  mob:mt-24 tablet:mt-28 lap:mt-28 desk:mt-28">
                {children}
              </div>
            </div>
        </AuthProvider>
        <ToastContainer />
      </body>
    </html >
  );
}