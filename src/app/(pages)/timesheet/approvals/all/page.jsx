import TitleComponent from "@/app/components/custom/Other/TitleComponent";
import AllApprovals from "@/app/components/dashboard/Approvals/AllApprovals";
import { getSession } from "@/utilities/auth/auth-utils";
import { getApprovalData } from "@/utilities/timesheet-utils";

export default async function AllApprovalsPage() {
    // Get session details for filtering
    const session = await getSession();
    const disciplines = session?.user?.disciplines || [];

    // Fetch all approval data (e.g., limit 100 or more)
    const approvals = await getApprovalData(disciplines, 100); // Or however many you need

    return (
        <>
            <TitleComponent>
                All Timesheet Approvals
            </TitleComponent>
            <div className="p-3">
                {/* Pass data to the client component */}
                <AllApprovals approvals={approvals} />
            </div>
        </>
    );
}
