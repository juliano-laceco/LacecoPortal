"use client"

import React, { useState, useEffect, useRef } from 'react';
import { format, startOfWeek } from 'date-fns';
import ProjectSection from './ProjectSection';
import TimeSheetHeader from './TimeSheetHeader';
import TimeSheetFooter from './TimeSheetFooter';
import DayStatus from './DayStatus';
import DevelopmentSection from './DevelopmentSection';
import { development_options } from '@/data/static/development-options';
import Button from '../custom/Other/Button';
import DropdownRegular from '../custom/Dropdowns/DropdownRegular';
import Image from 'next/image';
import { isUUID } from '../sheet/SheetUtils';
import { saveTimeSheet } from '@/utilities/timesheet/timesheet-utils';
import Modal from '../custom/Modals/Modal';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utilities/toast-utils';
import { TimeSheetContext } from './TimeSheetContext';
import {
    generateWeekDays,
    getStatusForDay,
    organizeTimesheetByType,
    sanitizeDevelopmentData,
    sanitizeProjects,
    currentInAllowedRange,
    countEnabledDays,
    checkForGapsInFilledDays,
    calculateTotalHours,
    calculateTotalWeekHours,
} from './TimeSheetUtils';
import DayAction from './DayAction';
import DayType from './DayType';
import { actionTimesheet } from '@/utilities/timesheet-utils';


function TimeSheet({ timesheet_data, start, end, allowed_range, is_readonly = false }) {

    const [projectTimeSheet, setProjectTimeSheet] = useState(timesheet_data?.project_timesheet ?? []);
    const [developmentTimeSheet, setDevelopmentTimeSheet] = useState(
        timesheet_data?.development_timesheet ?? []
    );
    const [nonWorkingDays, setNonWorkingDays] = useState(timesheet_data?.non_working ?? []);
    const [selectedType, setSelectedType] = useState(''); // State to store selected type for new rows
    const [isDevelopmentSectionCollapsed, setIsDevelopmentSectionCollapsed] = useState(false); // State to manage collapse/expand of the section
    const [initialDevelopmentTypes, setInitialDevelopmentTypes] = useState(Object.keys(organizeTimesheetByType(developmentTimeSheet)));
    const [startDate, setStartDate] = useState(startOfWeek(start, { weekStartsOn: 1 }));
    const [loading, setLoading] = useState(true);
    const [weekDays, setWeekDays] = useState(generateWeekDays(startDate));
    const [edited, setEdited] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [dateActions, setDateActions] = useState([])
    const rejection_ref = useRef()

    const router = useRouter();

    useEffect(() => {
        // Perform your heavy processing here asynchronously
        const processData = async () => {
            // Simulate heavy computation
            const processedProjectTimeSheet = timesheet_data?.project_timesheet ?? [];
            const processedDevelopmentTimeSheet = timesheet_data?.development_timesheet ?? [];
            const processedNonWorkingDays = timesheet_data?.non_working ?? [];

            // Update your state with the processed data
            setProjectTimeSheet(processedProjectTimeSheet);
            setDevelopmentTimeSheet(processedDevelopmentTimeSheet);
            setNonWorkingDays(processedNonWorkingDays);

            const types = Object.keys(organizeTimesheetByType(processedDevelopmentTimeSheet));
            setInitialDevelopmentTypes(types);

            setLoading(false); // Processing is done
        };

        processData();
    }, [timesheet_data]);

    useEffect(() => {
        const types = Object.keys(organizeTimesheetByType(developmentTimeSheet));
        setInitialDevelopmentTypes(types);
    }, []);

    useEffect(() => {
        console.log("Date Actions: " + JSON.stringify(dateActions))
    }, [dateActions])

    useEffect(() => {
        setWeekDays(generateWeekDays(startDate));
    }, [startDate]);

    useEffect(() => {
        setStartDate(startOfWeek(start, { weekStartsOn: 1 }));
    }, [start]);

    // Wrap getStatusForDay to pass necessary state
    const getStatusForDayWrapper = (date) => {
        return getStatusForDay(date, nonWorkingDays, projectTimeSheet, developmentTimeSheet);
    };

    const setIsEdited = () => {
        !edited && setEdited(true);
    }

    const handleInputChange = (
        e,
        projectIndex,
        phaseIndex,
        date,
        isDevelopment = false,
        developmentId = null,
        type = null
    ) => {

        console.log(projectIndex, phaseIndex)
        const { value } = e.target;
        const updatedValue = value ? parseFloat(value) : ''; // Set to "" if value is empty
        const { status } = getStatusForDayWrapper(date);

        if (isDevelopment) {
            let newDevelopmentTimesheet = developmentTimeSheet
                .map((item) => {
                    if (item.development_hour_day_id === developmentId && item.work_day === date) {
                        // If the input is empty and it's a UUID, remove the record
                        if (!updatedValue && developmentId && isUUID(developmentId)) {
                            return null;
                        }
                        // Check if the updated value is different from the previous one
                        if (item.hours_worked !== updatedValue) {
                            setEdited(true); // Call setIsEdited if the value has changed
                        }
                        return {
                            ...item,
                            hours_worked: updatedValue,
                            status: status,
                        };
                    }
                    return item;
                })
                .filter((item) => item !== null); // Filter out the null values (deleted items)

            // If no existing record matches, create a new one
            if (developmentId === null && updatedValue !== '') {
                newDevelopmentTimesheet.push({
                    development_hour_day_id: crypto.randomUUID(),
                    work_day: date,
                    display_date: date,
                    hours_worked: updatedValue,
                    status: status, // Default status for new entries
                    rejection_reason: null,
                    type, // Set any default or null type
                });
                setEdited(true); // Set edited if a new entry is added
            }

            setDevelopmentTimeSheet(newDevelopmentTimesheet);
        } else {
            const newProjectTimeSheet = [...projectTimeSheet];
            const assignmentIndex = newProjectTimeSheet[projectIndex].phases[phaseIndex].assignments.findIndex(
                (assignment) => assignment.work_day === date
            );

            if (assignmentIndex !== -1) {
                const currentAssignment = newProjectTimeSheet[projectIndex].phases[phaseIndex].assignments[assignmentIndex];

                // If the input is empty and it's a UUID, remove the record
                if (!updatedValue && isUUID(currentAssignment.employee_work_day_id)) {
                    newProjectTimeSheet[projectIndex].phases[phaseIndex].assignments.splice(assignmentIndex, 1);
                } else {
                    // Check if the updated value is different from the previous one
                    if (currentAssignment.hours_worked !== updatedValue) {
                        setEdited(true); // Call setIsEdited if the value has changed
                    }
                    // If assignment exists, update the hours worked
                    newProjectTimeSheet[projectIndex].phases[phaseIndex].assignments[
                        assignmentIndex
                    ].hours_worked = updatedValue;
                }
            } else if (updatedValue !== '') {
                // Add new assignment if value is not empty
                newProjectTimeSheet[projectIndex].phases[phaseIndex].assignments.push({
                    employee_work_day_id: crypto.randomUUID(),
                    work_day: date,
                    display_date: format(new Date(date), 'dd MMMM yyyy'),
                    hours_worked: updatedValue,
                    status: status, // Default status for new entries
                    rejection_reason: null,
                });
                setEdited(true); // Set edited if a new entry is added
            }

            setProjectTimeSheet(newProjectTimeSheet);
        }
    };

    // Function to delete a development row
    const deleteDevelopmentRow = (type) => {
        setDevelopmentTimeSheet((prevState) => prevState.filter((item) => item.type !== type));
    };

    const addNonWorkingDay = (date) => {
        setIsEdited();

        // Check if there is any project data on this day
        const hasProjectData = projectTimeSheet.some((project) =>
            project.phases.some((phase) =>
                phase.assignments.some(
                    (assignment) => assignment.work_day === date && assignment.hours_worked !== ''
                )
            )
        );

        // Check if there is any development data on this day
        const hasDevelopmentData = developmentTimeSheet.some(
            (development) => development.work_day === date && development.hours_worked !== ''
        );

        if (hasProjectData || hasDevelopmentData) {
            // If there is data, do not allow adding the non-working day and show an alert or modal
            openModal(
                <>
                    <div>Cannot add non-working day while having hours filled.</div>
                    <div>
                        {' '}
                        Date : <span className="font-bold">{date}</span>
                    </div>
                </>,
                'Addition Error'
            );
        } else {
            // Check if the date already exists in nonWorkingDays
            const existingIndex = nonWorkingDays.findIndex((nwd) => nwd.date === date);

            if (existingIndex !== -1) {
                // Date exists, add 'newNonWorking = true' to the existing record
                setNonWorkingDays((prev) => {
                    const updatedDays = [...prev];
                    updatedDays[existingIndex] = {
                        ...updatedDays[existingIndex],
                        newNonWorking: true,
                    };
                    return updatedDays;
                });
            } else {
                // If no data, proceed with adding the non-working day
                let newDay = {
                    non_working_day_id: crypto.randomUUID(),
                    date,
                    status: 'New Non Working',
                };
                setNonWorkingDays((prev) => [...prev, newDay]);
            }
        }
    };

    const removeNonWorkingDay = (date) => {
        setIsEdited();
        setNonWorkingDays((prev) => {
            return prev.reduce((acc, day) => {
                if (day.date === date) {
                    if (day.newNonWorking) {
                        // Remove the 'newNonWorking' property
                        const { newNonWorking, ...rest } = day;
                        acc.push(rest);
                    }
                    // Else, do not add the day to the accumulator (effectively removing it)
                } else {
                    acc.push(day);
                }
                return acc;
            }, []);
        });
    };

    // Function to organize timesheet data by type
    const organizedTimesheet = organizeTimesheetByType(developmentTimeSheet);

    // Filter out already used types for the new row dropdown
    const availableTypesForNewRow = development_options.filter((option) => {
        return !Object.keys(organizedTimesheet).includes(option.value);
    });

    const addNewDevelopmentRow = () => {
        if (selectedType) {
            setDevelopmentTimeSheet((prevState) => [
                ...prevState,
                {
                    development_hour_day_id: crypto.randomUUID(),
                    work_day: null, // This will be filled later by the user
                    display_date: null,
                    hours_worked: 0,
                    status: 'Awaiting Submission',
                    rejection_reason: null,
                    type: selectedType,
                },
            ]);
            setSelectedType(''); // Reset the selected type after adding
        }
    };

    // Handle collapse and expand actions for the whole section
    const toggleDevelopmentSection = () => {
        setIsDevelopmentSectionCollapsed((prevState) => !prevState);
    };

    // Combined state for modal visibility and content
    const [modal, setModal] = useState(null);

    const renderModalContent = (message, buttons, title = '') => (
        <Modal
            open={true}
            onClose={() => {
                setModal(null);
            }}
            title={title}
        >
            <div className="flex items-center gap-4">
                <Image
                    src="/resources/icons/warning.png"
                    height="50"
                    width="50"
                    alt="warning-icon"
                    className="mob:w-12 mob:h-12"
                />
                <div className="mob:text-xs">
                    <div>{message}</div>
                </div>
            </div>
            <div className="flex justify-center gap-4 mb-4 mt-5">
                {buttons.map((button) => (
                    <Button key={crypto.randomUUID()} {...button} />
                ))}
            </div>
        </Modal>
    );

    const openModal = (data = null, type) => {
        let modalContent;

        switch (type) {
            case 'Confirm Deletion':
                modalContent = renderModalContent(
                    'Are you sure you would like to delete this record and all filled information ?',
                    [
                        {
                            variant: 'primary',
                            name: 'Proceed',
                            onClick: () => {
                                deleteDevelopmentRow(data);
                                setModal(null);
                            },
                        },
                        {
                            variant: 'secondary',
                            name: 'Close',
                            onClick: () => setModal(null),
                        },
                    ],
                    'Confirmation'
                );
                break;
            case 'Confirm Save':
                modalContent = renderModalContent(
                    'Are you sure you would like to submit the currently submitted information? This is operation is not reversible.',
                    [
                        {
                            variant: 'primary',
                            name: 'Proceed',
                            onClick: async () => {
                                setIsSaving(true);
                                await submitTimeSheet();
                                setIsSaving(false);
                                router.refresh();
                                setModal(null);
                            },
                            isDisabled: isSaving,
                            loading: isSaving,
                        },
                        {
                            variant: 'secondary',
                            name: 'Close',
                            onClick: () => setModal(null),
                        },
                    ],
                    'Confirmation'
                );
                break;
            case 'Rejection Reason':
                modalContent = renderModalContent(
                    data,
                    [
                        {
                            variant: 'primary',
                            name: 'Close',
                            onClick: () => {
                                setModal(null);
                            },
                        },
                    ],
                    'Submission Rejected'
                );
                break;
            case 'Addition Error':
                modalContent = renderModalContent(
                    data,
                    [
                        {
                            variant: 'primary',
                            name: 'Close',
                            onClick: () => setModal(null),
                        },
                    ],
                    'Error'
                );
                break;
            case 'Unactioned Days':
                modalContent = renderModalContent(
                    data,
                    [
                        {
                            variant: 'primary',
                            name: 'Close',
                            onClick: () => setModal(null),
                        },
                    ],
                    'Unactioned Days'
                );
                break;
            case 'Confirm Day Approve':
                modalContent = renderModalContent(
                    "Are you sure you want to approve this day? This action will clear any previous actions you made on this day.",
                    [
                        {
                            variant: 'primary',
                            name: 'Approve',
                            onClick: () => {
                                approve_day(data)
                                setModal(null)
                            },
                        },
                        {
                            variant: 'secondary',
                            name: 'Close',
                            onClick: () => { setModal(null) },
                        }
                    ],
                    'Confirm'
                );
                break;
            case 'Confirm Day Reject':
                const { rejection_reason } = checkDayAction(data)
                modalContent = renderModalContent(
                    <div>
                        <div className="mb-2">
                            Rejecting this day will clear any previous actions you made.
                        </div>
                        <textarea
                            className="rounded-md resize-none border border-gray-300 text-sm w-full desk:h-24 lap:h-24 focus:border-pric focus:outline-none focus:ring-0"
                            ref={rejection_ref}
                            defaultValue={rejection_reason ? rejection_reason : ""}
                            maxLength={150} // Limits the input to 200 characters
                            onPaste={(e) => e.preventDefault()} // Prevents pasting
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault(); // Prevents pressing the enter key
                                }
                            }}
                        ></textarea>
                        <div className="text-sm mob:text-xs text-gray-500">
                            Max 150 characters
                        </div>
                    </div>,
                    [
                        {
                            variant: 'primary',
                            name: 'Reject',
                            onClick: () => {
                                reject_day(data, rejection_ref.current.value)
                                setModal(null)
                            },
                        },
                        {
                            variant: 'secondary',
                            name: 'Close',
                            onClick: () => { setModal(null) },
                        }
                    ],
                    'Confirm'
                );
                break;
        }
        setModal(modalContent);
    };

    // Main function to sanitize all data
    const submitTimeSheet = async () => {
        const sanitizedDevelopmentData = sanitizeDevelopmentData(developmentTimeSheet);
        const sanitizedProjectData = sanitizeProjects(projectTimeSheet);

        try {
            await saveTimeSheet({
                project_timesheet: sanitizedProjectData,
                development_timesheet: sanitizedDevelopmentData,
                non_working: nonWorkingDays.filter((day) => isUUID(day.non_working_day_id) || day.newNonWorking),
            });
            showToast('success', 'Successfully updated timesheet');
            setEdited(false)
        } catch (error) {
            showToast('failed', 'Error occurred while saving timesheet');
        }
    };

    const calculateTotalHoursWrapper = (date) => {
        return calculateTotalHours(date, projectTimeSheet, developmentTimeSheet);
    };

    const calculateTotalWeekHoursWrapper = () => {
        return calculateTotalWeekHours(weekDays, projectTimeSheet, developmentTimeSheet);
    };

    // Modify countEnabledDays to use the wrapper
    const { enabledDays } = countEnabledDays(weekDays, allowed_range, getStatusForDayWrapper);

    // Modify checkForGapsInFilledDays to use the wrapper
    const noGapsInFilledDays = checkForGapsInFilledDays(weekDays, getStatusForDayWrapper);

    if (loading) {
        // Render a loading indicator while processing
        return (
            <div className="flex justify-center items-center h-full gap-2 mt-1">
                <div role="status">
                    <svg
                        aria-hidden="true"
                        className="inline w-6 h-6  text-gray-300 animate-spin  fill-pric"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 
              22.9766 22.3858 0.59082 50 0.59082C77.6142 
              0.59082 100 22.9766 100 50.5908ZM9.08144 
              50.5908C9.08144 73.1895 27.4013 91.5094 
              50 91.5094C72.5987 91.5094 90.9186 73.1895 
              90.9186 50.5908C90.9186 27.9921 72.5987 
              9.67226 50 9.67226C27.4013 9.67226 9.08144 
              27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 
              38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 
              28.8227 92.871 24.3692 89.8167 20.348C85.8452 
              15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 
              4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 
              0.367541 46.6976 0.446843 41.7345 
              1.27873C39.2613 1.69328 37.813 4.19778 38.4501 
              6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 
              10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 
              10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 
              15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 
              25.841C84.9175 28.9121 86.7997 32.2913 88.1811 
              35.8758C89.083 38.2158 91.5421 39.6781 
              93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                </div>
                <p className="text-sec-textc">Fetching Timesheet information ...</p>
            </div>
        );
    }

    // Check if it's a non-working day within the week
    const hasNonWorkingDay = weekDays.some((day) => {
        return nonWorkingDays.some(nwd => nwd.date === day.fullDate && !isUUID(nwd.non_working_day_id));
    });

    const approve_day = (date) => {
        setDateActions((prevActions = []) => { // Ensure prevActions is initialized as an array
            // Check if the date already exists in the dateActions array
            const existingDayIndex = prevActions.findIndex(day => day.date === date);

            // If the date does not exist, create a new entry and return the updated array
            if (existingDayIndex === -1) {
                return [
                    ...prevActions,
                    {
                        date: date,              // Date to be approved
                        action_status: "Approved",      // Status set to "Approved"
                        rejection_reason: null   // No rejection reason
                    }
                ];
            } else {
                // If the date already exists, update its status and rejection_reason
                const updatedDays = [...prevActions];
                updatedDays[existingDayIndex] = {
                    ...updatedDays[existingDayIndex],
                    action_status: "Approved",
                    rejection_reason: null // Clear the rejection reason when approved
                };
                return updatedDays;
            }
        });
    };

    const reject_day = (date, rejection_reason = "Inaccurate Data") => {
        setDateActions((prevActions = []) => { // Ensure prevActions is initialized as an array
            // Check if the date already exists in the dateActions array
            const existingDayIndex = prevActions.findIndex(day => day.date === date);

            // If the date does not exist, create a new entry with status "Rejected"
            if (existingDayIndex === -1) {
                return [
                    ...prevActions,
                    {
                        date: date,              // Date to be rejected
                        action_status: "Rejected",      // Status set to "Rejected"
                        rejection_reason: rejection_reason   // Rejection reason passed from the param
                    }
                ];
            } else {
                // If the date already exists, update its rejection_reason
                const updatedDays = [...prevActions];
                updatedDays[existingDayIndex] = {
                    ...updatedDays[existingDayIndex],
                    action_status: "Rejected",
                    rejection_reason: rejection_reason // Update with the new rejection reason
                };
                return updatedDays;
            }
        });
    };

    const checkDayAction = (date) => {
        // Assuming dateActions is a state or an array containing day actions
        const dayAction = dateActions.find(day => day.date === date);

        // If the day is found, return its status and rejection reason
        if (dayAction) {
            return {
                action_status: dayAction.action_status,
                rejection_reason: dayAction.rejection_reason
            };
        }

        // If the day is not found, return null for both status and rejection_reason
        return {
            action_status: null,
            rejection_reason: null
        };
    };

    const handleActionTimesheet = async () => {
        try {
            await actionTimesheet(timesheet_data, dateActions);
            showToast("success", "Timesheet actions successfully updated.");
            router.refresh()
        } catch (error) {
            showToast("failed", "Failed to update timesheet actions.");
        }
    };



    return (
        <TimeSheetContext.Provider
            value={{
                weekDays,
                getStatusForDay: getStatusForDayWrapper,
                allowed_range,
                handleInputChange,
                setEdited,
                is_readonly,
                nonWorkingDays
            }}
        >
            <div className="w-fit mob:w-full tablet:w-full mob:space-y-4 tablet:space-y-4 lap:text-sm overflow-hidden desk:border lap:border rounded-lg flex flex-col">
                <h1 className="font-bold text-2xl mt-5 desk:hidden lap:hidden">Projects</h1>
                <TimeSheetHeader weekDays={weekDays} />
                {hasNonWorkingDay && <DayType />}
                {!projectTimeSheet.some((project) => {
                    // Filter the phases to only include those that should be rendered
                    const filteredPhases = project.phases.filter(phase => is_readonly ? (phase.timesheet_exists || hasNonWorkingDay) : (phase.isActive || phase.timesheet_exists || hasNonWorkingDay));
                    return filteredPhases.length > 0
                }) ?
                    <p className="text-pric p-4 w-full flex justify-center items-center mob:justify-start t
                    ablet:justify-start">No Data Found</p>
                    :
                    projectTimeSheet.map((project, projectIndex) => (
                        <ProjectSection key={project.project_id} project={project} projectIndex={projectIndex} />
                    ))
                }

                <h1 className="font-bold text-2xl mt-6 desk:hidden lap:hidden ">Non Billable Hours</h1>
                <div className="bg-gray-400 text-white p-4 flex items-center justify-between">
                    <span className="font-semibold">Non Billable Hours</span>
                    {developmentTimeSheet.length > 0 &&
                        <div className="mobile-version-collapse flex justify-center items-center">
                            <p
                                className="expand-collapse-dev-section cursor-pointer bg-red-500 px-3 py-2 rounded-lg border border-red-300"
                                onClick={toggleDevelopmentSection}
                            >
                                <Image
                                    src={
                                        isDevelopmentSectionCollapsed
                                            ? '/resources/icons/arrow-down.svg'
                                            : '/resources/icons/arrow-up.svg'
                                    }
                                    height="12"
                                    width="12"
                                    alt={isDevelopmentSectionCollapsed ? 'expand' : 'collapse'}
                                />
                            </p>
                        </div>
                    }
                </div>
                {!isDevelopmentSectionCollapsed && (
                    <>
                        <div className="development-section bg-gray-50 flex w-full mob:flex-col tablet:flex-col">
                            {(is_readonly && developmentTimeSheet.length > 0) ?

                                (<div className="project-title-cell border-b flex justify-center mob:justify-start tablet:justify-start items-center text-center desk:min-w-52 desk:max-w-52 lap:min-w-36 lap:max-w-36 mob:bg-pric tablet:bg-pric mob:text-white tab:text-white p-4 border-r border-gray-200 mob:hidden tablet:hidden ">
                                    Non Billable Hours
                                </div>)
                                :
                                (!is_readonly) && (<div className="project-title-cell border-b flex justify-center mob:justify-start tablet:justify-start items-center text-center desk:min-w-52 desk:max-w-52 lap:min-w-36 lap:max-w-36 mob:bg-pric tablet:bg-pric mob:text-white tab:text-white p-4 border-r border-gray-200 mob:hidden tablet:hidden ">
                                    Non Billable Hours
                                </div>)
                            }
                            <div className="flex flex-col w-full border-b border-gray-200">
                                {developmentTimeSheet.length > 0 ? (
                                    <>
                                        {Object.keys(organizedTimesheet).map((key_name) => (
                                            <DevelopmentSection
                                                key={key_name}
                                                development_items={organizedTimesheet[key_name]}
                                                type={key_name}
                                                handleDelete={deleteDevelopmentRow}
                                                openModal={openModal}
                                                initialDevelopmentTypes={initialDevelopmentTypes}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    <p className="text-pric p-4 w-full flex justify-center items-center border-b border-gray-200 bg-gray-100 mob:justify-start tablet:justify-start">
                                        No Data Found
                                    </p>
                                )}
                                {!is_readonly && (
                                    <>
                                        {availableTypesForNewRow.length > 0 && (
                                            <div className="flex items-center gap-3 p-2 w-fit">
                                                <DropdownRegular
                                                    options={availableTypesForNewRow}
                                                    isSearchable={true}
                                                    isDisabled={
                                                        isSaving ||
                                                        !currentInAllowedRange(start, end, allowed_range) ||
                                                        enabledDays === 0
                                                    }
                                                    isLoading={false}
                                                    onChange={(selectedOption) =>
                                                        setSelectedType(selectedOption.value)
                                                    }
                                                    value={selectedType}
                                                />
                                                <Button
                                                    onClick={addNewDevelopmentRow}
                                                    isDisabled={
                                                        isSaving ||
                                                        !currentInAllowedRange(start, end, allowed_range) ||
                                                        enabledDays === 0 ||
                                                        !selectedType
                                                    }
                                                    variant="primary"
                                                    name="Add"
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                )}
                <DayStatus
                    openModal={openModal}
                    addNonWorkingDay={addNonWorkingDay}
                    removeNonWorkingDay={removeNonWorkingDay}
                />
                {is_readonly &&
                    <DayAction
                        openModal={openModal}
                        approve_day={approve_day}
                        reject_day={reject_day}
                        checkDayAction={checkDayAction}
                    />
                }
                <TimeSheetFooter
                    calculateTotalHours={calculateTotalHoursWrapper}
                    calculateTotalWeekHours={calculateTotalWeekHoursWrapper}
                />
                <Button
                    variant="primary"
                    name="Save"
                    className="self-center m-1"
                    isDisabled={!is_readonly ? (isSaving || !currentInAllowedRange(start, end, allowed_range) || !edited) : false}
                    onClick={() => {

                        if (!is_readonly) {
                            // Check for gaps between filled days
                            if (!noGapsInFilledDays) {
                                openModal(
                                    'All days must be filled sequentially. No gaps are allowed in actioned days.',
                                    'Unactioned Days'
                                );
                                return;
                            }
                            openModal(null, 'Confirm Save');
                        } else {
                            handleActionTimesheet()
                        }

                    }}
                />
                {modal}
            </div>
        </TimeSheetContext.Provider >
    );
}

export default TimeSheet;
