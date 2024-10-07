import { differenceInDays } from "date-fns";

export function determineDayStatus(approval) {
    const {
        min_rejected_date,
        last_approved_before_rejected,
        last_approved_date,
        min_pending_date
    } = approval;

    // Determine the final date based on approval data
    const final_date = min_rejected_date && !last_approved_before_rejected
        ? min_rejected_date
        : last_approved_before_rejected || last_approved_date || min_pending_date;

    if (!final_date) {
        return { status: min_pending_date ? "Pending Approval" : "Unknown", final_date: null };
    }

    const daysDifference = differenceInDays(new Date(), new Date(final_date));

    let status;
    if (final_date === last_approved_before_rejected || final_date === min_rejected_date) {
        status = daysDifference <= 2 ? "Approved Up To Date" : "Missing Days";
    } else if (final_date === last_approved_date) {
        if (min_pending_date) {
            status = "Pending Approval";
        } else {
            status = daysDifference <= 2 ? "Approved Up To Date" : "Missing Days";
        }
    } else if (final_date === min_pending_date) {
        status = "Pending Approval";
    } else {
        status = "Unknown";
    }

    return { status, final_date };
};