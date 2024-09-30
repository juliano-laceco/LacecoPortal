import { getSession } from "@/utilities/auth/auth-utils";

import { getApprovalData } from "@/utilities/timesheet-utils";
import PendingActions from "./components/dashboard/PendingActions";

export default async function Home() {

  const session = await getSession()
  const isHoD = session?.user?.isHoD
  if (isHoD) {

  }
  const disciplines = session?.user?.disciplines
  const res = await getApprovalData(disciplines)

  return (
    <>
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl mb-4">Dashboard</h1>
        <PendingActions approvals={res} />
      </div>

    </>

  );
}
