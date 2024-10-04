import { getSession } from "@/utilities/auth/auth-utils";

import { getApprovalData } from "@/utilities/timesheet-utils";
import PendingActions from "./components/dashboard/PendingActions";

export default async function Home() {

  let disciplines;

  const session = await getSession()
  const role = session?.user?.role_name

  if (role === "HoD") {
    disciplines = session?.user?.disciplines
  }
  const approval_data = await getApprovalData(disciplines ?? [])

  return (
    <>
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl mb-4">Dashboard</h1>
        {(role === "HoD" || role === "Planning Administrator") && <PendingActions approvals={approval_data} />}
      </div>

    </>

  );
}
