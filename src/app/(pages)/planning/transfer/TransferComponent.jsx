"use client"

import DropdownRegular from "@/app/components/custom/Dropdowns/DropdownRegular";
import Button from "@/app/components/custom/Other/Button";
import TitleComponent from "@/app/components/custom/Other/TitleComponent";
import { useState } from "react";

function TransferComponent({ assignments, type, projects }) {

    const [selectedProject, setSelectedProject] = useState(null); // State to store selected project
    const [selectedPhase, setSelectedPhase] = useState(null); // State to store selected phase

    // Handle project change
    const handleProjectChange = (selectedOption) => {
        setSelectedProject(selectedOption);
        setSelectedPhase(null); // Reset phase selection when project changes
    };

    // Handle phase change
    const handlePhaseChange = (selectedOption) => {
        setSelectedPhase(selectedOption);
    };

    // Filter phases based on selected project
    const phaseOptions = selectedProject ? selectedProject.phases : [];

    return (
        <div className="w-full mt-5 p-1">
            <TitleComponent>
                Move To
            </TitleComponent>
            <div className="flex flex-wrap gap-4">
                {/* Project Dropdown */}
                <DropdownRegular
                    options={projects}
                    label="Project"
                    value={selectedProject ? selectedProject.value : ''}
                    onChange={handleProjectChange}
                    isClearable
                    isSearchable
                />

                {/* Phase Dropdown */}
                <DropdownRegular
                    options={phaseOptions}
                    label="Phase"
                    value={selectedPhase ? selectedPhase.value : ''}
                    onChange={handlePhaseChange}
                    isSearchable
                    isClearable
                    isDisabled={!selectedProject} // Disable phase dropdown if no project is selected
                />
                <Button name="Move" className="mt-6" />
            </div>

        </div>
    );

}

export default TransferComponent
