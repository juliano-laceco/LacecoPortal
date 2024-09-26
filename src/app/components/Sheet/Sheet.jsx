"use client";

import React, { useState, useEffect, useMemo } from "react";
import { HotTable } from "@handsontable/react";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.css";
import Image from "next/image";
import DateRangePicker from "../custom/Pickers/DateRangePicker";
import {
    getThisMondayDate,
    generateHeaderDates,
    isUUID,
    getGradeName,
    getEmployeeName,
    scrollToFirstWarning,
} from "./SheetUtils";

import {
    baselineProject,
    saveDeployment,
} from "@/utilities/project/project-utils";
import Modal from "../custom/Modals/Modal";
import Button from "../custom/Other/Button";
import { usePathname, useRouter } from "next/navigation";
import { formatDate } from "@/utilities/date/date-utils";
import { showToast } from "@/utilities/toast-utils";
import { logError } from "@/utilities/misc-utils";

const Sheet = ({
    employee_data,
    discipline_data,
    project_start_date,
    project_end_date,
    start_date,
    end_date,
    deployment_data,
    project_data,
}) => {
    // State variables
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(null);

    // Router Utils
    const router = useRouter();
    const pathname = usePathname();

    // Header Dates Variables
    const [headerDates, setHeaderDates] = useState(() =>
        generateHeaderDates(start_date, end_date, project_end_date)
    );
    const [initialHeaderDates, setInitialHeaderDates] = useState([]);

    // Deleted phase assignee tracking
    const [deletedPhaseAssignees, setDeletedPhaseAssignees] = useState([]);

    // Initial Data
    const [initialData, setInitialData] = useState(() => deployment_data);

    // Handsontable data
    const [hotData, setHotData] = useState([]);

    useEffect(() => {
        setInitialHeaderDates(headerDates);
    }, [headerDates]);

    // Generate Handsontable data
    useEffect(() => {
        const data = [];
        initialData.forEach((phase, phaseIndex) => {
            phase.assignees.forEach((assignee, assigneeIndex) => {
                const row = {};

                row["phaseIndex"] = phaseIndex;
                row["assigneeIndex"] = assigneeIndex;
                row["phase_assignee_id"] = assignee.phase_assignee_id;

                // Action column
                row["action"] = ""; // Placeholder

                // Discipline column
                row["discipline"] = assignee.discipline || "Select...";

                // Employee column
                row["employee"] = assignee.assignee || "Select...";

                // Grade column
                const assignee_grade = getGradeName(
                    assignee.assignee,
                    employee_data
                );
                row["grade"] = assignee_grade;

                // Budget Hours column
                const budgetHours = headerDates.reduce((sum, date, index) => {
                    const value = assignee.projected_work_weeks[date] || "";
                    return sum + (parseInt(value) || 0);
                }, 0);
                row["budgetHours"] = budgetHours;

                // Now add the weekly data
                headerDates.forEach((date, index) => {
                    const value = assignee.projected_work_weeks[date] || "";
                    row[`date_${index}`] = value;
                });

                data.push(row);
            });
        });

        setHotData(data);
    }, [initialData, headerDates, employee_data]);

    // Define columns for Handsontable
    const columns = useMemo(() => {
        const cols = [];

        // Action column
        cols.push({
            data: "action",
            renderer: actionRenderer,
            readOnly: true,
            width: 40,
        });

        // Discipline column
        cols.push({
            data: "discipline",
            type: "dropdown",
            source: discipline_data.map((d) => d.value),
            renderer: selectRenderer,
            editor: "select",
            width: 160,
        });

        // Employee column
        cols.push({
            data: "employee",
            type: "dropdown",
            source: function (query, process) {
                const disciplineId = this.instance.getDataAtRowProp(
                    this.row,
                    "discipline"
                );
                const employees = employee_data.filter(
                    (e) => e.discipline_id == disciplineId
                );
                process(employees.map((e) => e.value));
            },
            strict: true,
            renderer: selectRenderer,
            width: 160,
        });

        // Grade column
        cols.push({
            data: "grade",
            readOnly: true,
            width: 60,
        });

        // Budget Hours column
        cols.push({
            data: "budgetHours",
            readOnly: true,
            width: 100,
        });

        // Weekly data columns
        headerDates.forEach((date, index) => {
            cols.push({
                data: `date_${index}`,
                type: "numeric",
                numericFormat: {
                    pattern: "0",
                },
                width: 60,
            });
        });

        return cols;
    }, [headerDates, discipline_data, employee_data]);

    // Define settings for Handsontable
    const hotSettings = {
        data: hotData,
        columns: columns,
        colHeaders: [
            "Action",
            "Discipline",
            "Employee",
            "Grade",
            "Budget Hours",
            ...headerDates,
        ],
        rowHeaders: false,
        width: "100%",
        height: 500,
        licenseKey: "non-commercial-and-evaluation",
        afterChange: (changes, source) => {
            if (changes) {
                const newHotData = [...hotData];
                changes.forEach(([row, prop, oldValue, newValue]) => {
                    if (prop === "employee") {
                        // Update the 'grade' column
                        const employee = employee_data.find((e) => e.value == newValue);
                        const grade = employee ? employee.grade_code : "N/A";
                        newHotData[row]["grade"] = grade;
                        setHotData(newHotData); // Trigger re-render
                    }
                    if (prop.startsWith("date_")) {
                        // Update the 'budgetHours' column
                        const budgetHours = headerDates.reduce((sum, date, index) => {
                            const value = newHotData[row][`date_${index}`];
                            return sum + (parseInt(value) || 0);
                        }, 0);
                        newHotData[row]["budgetHours"] = budgetHours;
                        setHotData(newHotData);
                    }
                });
            }
        },
    };

    // Define renderers
    function actionRenderer(instance, td, row, col, prop, value, cellProperties) {
        td.innerHTML = "";
        const button = document.createElement("button");
        button.className = "delete-button";

        const img = document.createElement("img");
        img.src = "/resources/icons/delete.png";
        img.width = 20;
        img.height = 20;
        button.appendChild(img);

        button.addEventListener("click", () => {
            deleteAssignee(row);
        });

        td.appendChild(button);

        return td;
    }

    function selectRenderer(
        instance,
        td,
        row,
        col,
        prop,
        value,
        cellProperties
    ) {
        let displayValue = value;

        if (prop === "discipline") {
            const discipline = discipline_data.find((d) => d.value == value);
            displayValue = discipline ? discipline.label : "Select...";
        } else if (prop === "employee") {
            const employee = employee_data.find((e) => e.value == value);
            displayValue = employee ? employee.label : "Select...";
        }

        Handsontable.renderers.TextRenderer.apply(this, [
            instance,
            td,
            row,
            col,
            prop,
            displayValue,
            cellProperties,
        ]);
    }

    // Implement deleteAssignee function
    const deleteAssignee = (rowIndex) => {
        const rowData = hotData[rowIndex];
        const { phaseIndex, assigneeIndex } = rowData;

        const assigneeId =
            initialData[phaseIndex].assignees[assigneeIndex].phase_assignee_id;

        if (!isUUID(assigneeId)) {
            setDeletedPhaseAssignees((prev) => [...prev, assigneeId]);
        }

        // Remove assignee from initialData
        const newInitialData = [...initialData];
        newInitialData[phaseIndex] = {
            ...newInitialData[phaseIndex],
            assignees: newInitialData[phaseIndex].assignees.filter(
                (_, index) => index !== assigneeIndex
            ),
        };

        setInitialData(newInitialData);

        // Remove the row from 'hotData'
        const newHotData = [...hotData];
        newHotData.splice(rowIndex, 1);
        setHotData(newHotData);
    };

    // Implement handleSave function
    const handleSave = async () => {
        // Collect data from 'hotData' and map back to 'initialData' format
        const updatedData = [...initialData];
        hotData.forEach((rowData) => {
            const { phaseIndex, assigneeIndex } = rowData;
            const assignee = updatedData[phaseIndex].assignees[assigneeIndex];

            assignee.discipline = rowData["discipline"];
            assignee.assignee = rowData["employee"];

            // Update projected_work_weeks
            const projected_work_weeks = {};
            headerDates.forEach((date, index) => {
                const value = rowData[`date_${index}`];
                if (value !== "") {
                    projected_work_weeks[date] = value;
                }
            });
            assignee.projected_work_weeks = projected_work_weeks;
        });

        try {
            await saveDeployment(updatedData, deletedPhaseAssignees);
            showToast("success", "Successfully Saved Deployment");
        } catch (error) {
            await logError(error, "Error In Saving Deployment");
            showToast("failed", "Failed To Save Deployment");
        }
    };

    // Implement handleAddAssignee function
    const handleAddAssignee = () => {
        // Add a new assignee to the last phase
        const phaseIndex = initialData.length - 1; // Or determine which phase to add to
        const newAssignee = {
            phase_assignee_id: crypto.randomUUID(),
            discipline: "",
            assignee: "",
            initial_projected_work_weeks: null,
            projected_work_weeks: {},
        };

        headerDates.forEach((date) => {
            newAssignee.projected_work_weeks[date] = "";
        });

        const newInitialData = [...initialData];
        newInitialData[phaseIndex] = {
            ...newInitialData[phaseIndex],
            assignees: [...newInitialData[phaseIndex].assignees, newAssignee],
        };

        setInitialData(newInitialData);

        // Also, need to update the Handsontable data
        // Add new row to 'hotData'
        const newRow = {
            phaseIndex: phaseIndex,
            assigneeIndex: newInitialData[phaseIndex].assignees.length - 1,
            phase_assignee_id: newAssignee.phase_assignee_id,
            action: "",
            discipline: "Select...",
            employee: "Select...",
            grade: "N/A",
            budgetHours: 0,
        };

        headerDates.forEach((date, index) => {
            newRow[`date_${index}`] = "";
        });

        setHotData([...hotData, newRow]);
    };

    // Render the component
    return (
        <>
            {modal}
            <div className="flex items-start w-screen">
                <div className="space-y-5 w-screen">
                    <DateRangePicker
                        project_start_date={project_start_date}
                        project_end_date={project_end_date}
                        start={start_date}
                        end={end_date}
                    />
                    <div className="flex gap-2">
                        <div
                            className="sheet-container flex-1 outline-none border h-[900px] border-gray-300 rounded-lg select-none relative overflow-scroll w-screen bg-white z-0"
                            tabIndex={0}
                        >
                            <HotTable settings={hotSettings} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sheet