'use client';

import React, { useState, useCallback } from 'react';
import Flow from '../../custom/Flow/Flow';
import ProjectInfoForm from '@/app/components/forms/Project/ProjectInfoForm';
import ProjectPhasesForm from '@/app/components/forms/Project/ProjectPhasesForm';
import Stepper from '@/app/components/custom/Flow/Stepper';

const ProjectForm = ({projectDropdowns}) => {

    const [data, setData] = useState({});

    const [currentStepIndex, setCurrentStepIndex] = useState(1);

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

    const onDone = useCallback((dataFromStep) => {
        const updatedData = {
            ...data,
            ...dataFromStep,
        };
        setData(updatedData);
        console.log('Final data:', updatedData);
    }, [data]);

    const steps = [
        { id: 1, name: 'Project Information' },
        { id: 2, name: 'Project Phases' },
        { id: 3, name: 'Deployment' },
    ];

    return (
        <>
            <Stepper steps={steps} currentStep={currentStepIndex} />
            <Flow currentIndex={currentStepIndex} onNext={onNext} onBack={onBack} onDone={onDone}>
                <MemoizedProjectInfoForm data={data.projectInfo} dropdowns={projectDropdowns.projectInfoDropdowns} />
                <MemoizedProjectPhasesForm data={data.projectPhases} dropdowns={projectDropdowns.phaseCreationDropdowns} />
            </Flow>
        </>
    );
};

const MemoizedProjectInfoForm = React.memo(ProjectInfoForm);
const MemoizedProjectPhasesForm = React.memo(ProjectPhasesForm);

export default ProjectForm;