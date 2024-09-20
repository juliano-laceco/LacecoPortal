// TimeSheetUtils.js

import { addDays, format } from 'date-fns';
import { isUUID } from '../sheet/SheetUtils';

// Generate week days starting from the given date
export function generateWeekDays(startDate) {
    return Array.from({ length: 7 }, (_, i) => {
        const day = addDays(startDate, i);
        return {
            day: format(day, 'd'),
            dayOfWeek: (
                <div className="flex flex-col justify-center items-center">
                    <span>{format(day, 'EEE')}</span>
                    <span>{format(day, 'd')}</span>
                </div>
            ),
            fullDate: format(day, 'yyyy-MM-dd'),
        };
    });
}

// Organize timesheet data by type
export function organizeTimesheetByType(timesheet) {
    return timesheet.reduce((acc, current) => {
        const { type } = current;
        if (type) {
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(current);
        }
        return acc;
    }, {});
}

// Get status for a specific day
export function getStatusForDay(date, nonWorkingDays, projectTimeSheet, developmentTimeSheet) {
    let status = null;
    let rejectionReason = null;
    let has_data = false;

    // Check if the date is a non-working day
    const nonWorkingDay = nonWorkingDays.find((nwd) => nwd.date === date);

    if (nonWorkingDay && (isUUID(nonWorkingDay.non_working_day_id) || nonWorkingDay.newNonWorking)) {
        status = 'New Non Working';
        return { status, rejectionReason, has_data };
    }

    // Process project timesheets
    projectTimeSheet.forEach((project) => {
        project.phases.forEach((phase) => {
            phase.assignments.forEach((assignment) => {
                if (assignment.work_day === date) {
                    if (assignment.hours_worked != '') has_data = true;
                    if (assignment.status === 'Rejected') {
                        status = 'Rejected';
                        rejectionReason = assignment.rejection_reason;
                    } else if (assignment.status === 'Pending' && status !== 'Rejected') {
                        status = 'Pending';
                    } else if (!status) {
                        status = assignment.status;
                    }
                }
            });
        });
    });

    // Process development timesheets
    developmentTimeSheet.forEach((development) => {
        if (development.work_day === date) {
            if (development.hours_worked != '') has_data = true;
            if (development.status === 'Rejected') {
                status = 'Rejected';
                rejectionReason = development.rejection_reason;
            } else if (development.status === 'Pending' && status !== 'Rejected') {
                status = 'Pending';
            } else if (!status) {
                status = development.status;
            }
        }
    });

    // Process non-working days
    nonWorkingDays.forEach((nwd) => {
        if (nwd.date === date) {
            if (nwd.status === 'Rejected') {
                status = 'Rejected';
                rejectionReason = nwd.rejection_reason;
            } else if (nwd.status === 'Pending' && status !== 'Rejected') {
                status = 'Pending';
            } else if (!status) {
                status = nwd.status;
            }
        }
    });

    return { status, rejectionReason, has_data };
}

// Sanitize development data
export function sanitizeDevelopmentData(developmentTimeSheet) {
    return developmentTimeSheet.filter((developmentItem) => developmentItem.display_date != null);
}

// Sanitize assignments
export function sanitizeAssignments(assignments) {
    return assignments.filter(() => true);
}

// Sanitize phases
export function sanitizePhases(phases) {
    return phases
        .map((phase) => {
            const sanitizedAssignments = sanitizeAssignments(phase.assignments);

            // Only include phases with updated assignments
            if (sanitizedAssignments.length > 0) {
                return {
                    ...phase,
                    assignments: sanitizedAssignments,
                };
            }
            return null; // Exclude phases without updated assignments
        })
        .filter((phase) => phase !== null); // Remove null phases
}

// Sanitize projects
export function sanitizeProjects(projectTimeSheet) {
    return projectTimeSheet
        .map((project) => {
            const sanitizedPhases = sanitizePhases(project.phases);

            // Only include projects with updated phases
            if (sanitizedPhases.length > 0) {
                return {
                    ...project,
                    phases: sanitizedPhases,
                };
            }
            return null; // Exclude projects without updated phases
        })
        .filter((project) => project !== null); // Remove null projects
}

// Check if current date is in allowed range
export function currentInAllowedRange(startDate, endDate, allowed_range) {
    if (!allowed_range || !allowed_range.week_start || !allowed_range.week_end) {
        // If allowed_range or its boundaries are not defined, assume it's within the range
        return true;
    }

    const rangeStart = new Date(allowed_range.week_start);
    const rangeEnd = new Date(allowed_range.week_end);

    const isStartWithinRange = new Date(startDate) >= rangeStart && new Date(startDate) <= rangeEnd;
    const isEndWithinRange = new Date(endDate) >= rangeStart && new Date(endDate) <= rangeEnd;

    // Check if both start and end dates are within the allowed range
    return isStartWithinRange && isEndWithinRange;
}

// Count enabled days
export function countEnabledDays(weekDays, allowed_range, getStatusForDay) {
    const today = new Date();
    let enabledDays = 0;

    weekDays.forEach((day) => {
        const { status } = getStatusForDay(day.fullDate);
        const dayDate = new Date(day.fullDate);

        const isWithinAllowedRange =
            allowed_range && allowed_range.week_start && allowed_range.week_end
                ? dayDate >= new Date(allowed_range.week_start) && dayDate <= today
                : dayDate <= today; // Check only up to today

        // A day is enabled if it's within the allowed range and its status is either null or Rejected
        if (isWithinAllowedRange && (status === null || status === 'Rejected')) {
            enabledDays++;
        }
    });

    return { enabledDays };
}

// Check for gaps in filled days
export function checkForGapsInFilledDays(weekDays, getStatusForDay) {
    let lastFilledDay = null;
    let hasGap = false;

    for (let i = 0; i < weekDays.length; i++) {
        const day = weekDays[i];
        const { status } = getStatusForDay(day.fullDate);

        // Only consider 'Approved', 'Pending', or 'New Non Working' as filled days
        if (status === 'Approved' || status === 'Pending' || status === 'New Non Working') {
            if (lastFilledDay && hasGap) {
                return false; // Invalid, there is a gap between filled days with specified statuses
            }
            lastFilledDay = day.fullDate; // Update last filled day with valid status
            hasGap = false; // Reset gap tracker when a filled day is found
        } else if (status === null) {
            // Check if there's a filled day before and after the current day
            if (lastFilledDay) {
                // Look ahead to see if there's a filled day later in the week
                for (let j = i + 1; j < weekDays.length; j++) {
                    const futureDayStatus = getStatusForDay(weekDays[j].fullDate).status;
                    if (futureDayStatus === 'Approved' || futureDayStatus === 'Pending' || futureDayStatus === 'New Non Working') {
                        hasGap = true; // Mark that a gap exists between two filled days
                        break;
                    }
                    if (futureDayStatus !== null) {
                        break; // No need to check further if we find a filled day that breaks the gap
                    }
                }
            }
        }
    }

    return true; // No gaps found
}

// Calculate total hours for a specific date
export function calculateTotalHours(date, projectTimeSheet, developmentTimeSheet) {
    const projectHours = projectTimeSheet.reduce((total, project) => {
        return (
            total +
            project.phases.reduce((phaseTotal, phase) => {
                const assignment = phase.assignments.find((assignment) => assignment.work_day === date);
                return phaseTotal + (assignment ? parseFloat(assignment.hours_worked || 0) : 0);
            }, 0)
        );
    }, 0);

    const developmentHours = developmentTimeSheet.reduce((total, assignment) => {
        return total + (assignment.work_day === date ? parseFloat(assignment.hours_worked || 0) : 0);
    }, 0);

    return projectHours + developmentHours;
}

// Calculate total week hours
export function calculateTotalWeekHours(weekDays, projectTimeSheet, developmentTimeSheet) {
    return weekDays.reduce((total, day) => {
        return total + calculateTotalHours(day.fullDate, projectTimeSheet, developmentTimeSheet);
    }, 0);
}
