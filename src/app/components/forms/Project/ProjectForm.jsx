'use client';

import React, { useState, useCallback } from 'react';
import Flow from '../../custom/Flow/Flow';
import ProjectInfoForm from '@/app/components/forms/Project/ProjectInfoForm';
import ProjectPhasesForm from '@/app/components/forms/Project/ProjectPhasesForm';
import Stepper from '@/app/components/custom/Flow/Stepper';
import { createProject, updateProject } from '@/utilities/project/project-utils';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utilities/toast-utils';

const ProjectForm = ({ projectDropdowns, isEdit, defaultData }) => {

    const router = useRouter()

    const [data, setData] = useState(defaultData ?? {})

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

        const successMessage = `Project ${isEdit ? "Updated" : "Created"} Successfully`;
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



    }, [data]);


    const preprocessData = (finalData) => {
        const disciplinesArray = finalData.projectInfo.disciplines
        finalData.projectInfo.disciplines = disciplinesArray.map((item) => item.value)
        return finalData
    }

    const steps = [
        { id: 1, name: 'Project Information' },
        { id: 2, name: 'Project Phases' }
    ];


    return (
        <>
            <Stepper steps={steps} currentStep={currentStepIndex} />
            <Flow currentIndex={currentStepIndex} onNext={onNext} onBack={onBack} onDone={onDone}>
                <MemoizedProjectInfoForm data={data.projectInfo} dropdowns={projectDropdowns.projectInfoDropdowns} isEdit={isEdit} />
                <MemoizedProjectPhasesForm data={data.phases} dropdowns={projectDropdowns.phaseCreationDropdowns} isEdit={isEdit} />
            </Flow>
        </>
    );
};

const MemoizedProjectInfoForm = React.memo(ProjectInfoForm);
const MemoizedProjectPhasesForm = React.memo(ProjectPhasesForm);

export default ProjectForm;