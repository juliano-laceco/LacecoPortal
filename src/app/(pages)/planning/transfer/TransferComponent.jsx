"use client"

import DropdownRegular from "@/app/components/custom/Dropdowns/DropdownRegular";
import Modal from "@/app/components/custom/Modals/Modal";
import Button from "@/app/components/custom/Other/Button";
import TitleComponent from "@/app/components/custom/Other/TitleComponent";
import { saveTransfer } from "@/utilities/timesheet-utils";
import { showToast } from "@/utilities/toast-utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function TransferComponent({ assignments, type, projects, nonClearableQS }) {
    const [selectedProject, setSelectedProject] = useState(null); // State to store selected project
    const [selectedPhase, setSelectedPhase] = useState(null); // State to store selected phase
    const [isMoveDisabled, setIsMoveDisabled] = useState(true); // State to control move button disable/enable
    const [modal, setModal] = useState(null); // Combined state for modal visibility and content
    const router = useRouter()

    // Handle project change
    const handleProjectChange = (selectedOption) => {
        setSelectedProject(selectedOption);
        setSelectedPhase(null); // Reset phase selection when project changes
    };

    // Handle phase change
    const handlePhaseChange = (selectedOption) => {
        setSelectedPhase(selectedOption);
    };

    // Check whether both project and phase are selected
    useEffect(() => {
        setIsMoveDisabled(!selectedProject || !selectedPhase);
    }, [selectedProject, selectedPhase]);

    // Check if multiple phases exist in the assignments
    const checkMultiplePhasesInAssignments = () => {
        const phaseIds = assignments.map(a => a.phase_id);
        const uniquePhaseIds = [...new Set(phaseIds)];
        return uniquePhaseIds.length > 1;
    };

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
            case 'Mixed Phases':
                modalContent = renderModalContent(
                    'The filtered results contain more than one phase. Migration can only be done from a single phase to another.',
                    [
                        {
                            variant: 'primary',
                            name: 'Close',
                            onClick: () => {
                                setModal(null);
                            },
                        }
                    ],
                    'Invalid Selection'
                );
                break;
            case 'Same Phase':
                modalContent = renderModalContent(
                    'The target phase cannot be the same as the original phase.',
                    [
                        {
                            variant: 'primary',
                            name: 'Close',
                            onClick: () => {
                                setModal(null);
                            },
                        }
                    ],
                    'Invalid Selection'
                );
                break;
        }
        setModal(modalContent);
    };

    const handleMoveClick = async () => {
        if (checkMultiplePhasesInAssignments()) {
            openModal(null, "Mixed Phases");
        } else {
            // Check if the selected target phase is the same as the original phase
            const isSamePhase = assignments.some(a => a.phase_id === selectedPhase.value);
            if (isSamePhase) {
                openModal(null, "Same Phase");
                return;
            }

            const data = await saveTransfer(assignments, selectedPhase.value, type)
            if (!data.res) {
                showToast("failed", "Failed to transfer hours.")
                router.refresh()
                return;
            }

            showToast("success", "Successfully transferred hours.")
            router.refresh()
        }
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
                <Button
                    name="Move"
                    className="mt-6"
                    onClick={handleMoveClick}
                    isDisabled={isMoveDisabled} // Disable the move button when project or phase is not selected
                />
            </div>
            {modal}
        </div>
    );
}

export default TransferComponent;
