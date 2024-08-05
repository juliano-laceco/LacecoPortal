'use client';

import React, { useState, useCallback } from 'react';
import Flow from '../../custom/Flow/Flow';
import ProjectInfoForm from '@/app/components/forms/Project/ProjectInfoForm';
import ProjectPhasesForm from '@/app/components/forms/Project/ProjectPhasesForm';
import Stepper from '@/app/components/custom/Flow/Stepper';
import { createProject, updateProject } from '@/utilities/project/project-utils';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utilities/toast-utils';
import Modal from '../../custom/Modals/Modal';
import Image from 'next/image';
import Button from '../../custom/Button';


const ProjectForm = ({ projectDropdowns, isEdit, defaultData }) => {

    const router = useRouter()

    const [data, setData] = useState(defaultData ?? {})
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const onNext = useCallback((dataFromStep) => {
        const updatedData = {
            ...data,
            ...dataFromStep,
        };
        setData(updatedData);
        setCurrentStepIndex((prevIndex) => prevIndex + 1);
    }, [data]);

    const onBack = useCallback(() => {
        setCurrentStepIndex((prevIndex) => prevIndex - 1);
    }, []);

    const onDone = useCallback(async (dataFromStep) => {

        const successMessage = `${data?.projectInfo?.title} ${isEdit ? "Updated" : "Created"} Successfully`;
        const errorMessage = `Error Occurred while ${isEdit ? "updating" : "creating"} project`;

        const updatedData = {
            ...data,
            ...dataFromStep,
            project_id: defaultData?.project_id
        };

        setData(updatedData);

        let result;

        if (!isEdit) {
            result = await createProject(preprocessData(updatedData));
        } else {
            result = await updateProject(preprocessData(updatedData));
        }

        if (result.res) {
            showToast("success", successMessage);
        } else {
            showToast("failed", errorMessage);
        }

        router.replace("/planning/project/all");
        router.refresh();



    }, [data, defaultData?.project_id, isEdit, router]);


    const preprocessData = (finalData) => {
        const disciplinesArray = finalData.projectInfo.disciplines
        finalData.projectInfo.disciplines = disciplinesArray.map((item) => item.value)
        return finalData
    }

    const steps = [
        { id: 1, name: 'Project Information' },
        { id: 2, name: 'Project Phases' }
    ];

    const navigateToAllProjects = () => {
        router.replace("/planning/project/all");
    }

    return (
        <>
            <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)} >
                <div className="flex items-center gap-4">
                    <Image src="/resources/icons/warning.png" height="50" width="50" alt="warning-icon" className="mob:w-12 mob:h-12" />
                    <div className="mob:text-xs">
                        <p>Cancelling this operation will discard any changes made.</p>
                        <p>Are you sure you wish to proceed?</p>
                    </div>
                </div>
                <div className="flex justify-center gap-4 mb-4 mt-5">
                    <Button variant="primary" small name="Proceed" onClick={navigateToAllProjects}>
                        Proceed
                    </Button>
                    <Button variant="secondary" small name="Close" onClick={() => setModalIsOpen(false)}>
                        Close
                    </Button>

                </div>
            </Modal>
            <Stepper steps={steps} currentStep={currentStepIndex} />
            <Flow currentIndex={currentStepIndex} onNext={onNext} onBack={onBack} onDone={onDone}>
                <MemoizedProjectInfoForm data={data.projectInfo} dropdowns={projectDropdowns.projectInfoDropdowns} isEdit={isEdit} confirmModal={setModalIsOpen} />
                <MemoizedProjectPhasesForm data={data.phases} dropdowns={projectDropdowns.phaseCreationDropdowns} isEdit={isEdit} confirmModal={setModalIsOpen} />
            </Flow>
        </>
    );
};

const MemoizedProjectInfoForm = React.memo(ProjectInfoForm);
const MemoizedProjectPhasesForm = React.memo(ProjectPhasesForm);

export default ProjectForm;