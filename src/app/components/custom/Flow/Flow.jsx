'use client';

import React from 'react';

const Flow = ({ children, currentIndex, onNext, onBack, onDone }) => {
    const totalSteps = React.Children.count(children);
    const currentChild = React.Children.toArray(children)[currentIndex];
    const isFirstStep = currentIndex === 0;
    const isLastStep = currentIndex === totalSteps - 1;

    const goNext = (dataFromStep) => {
        if (isLastStep) {
            onDone(dataFromStep);
        } else {
            onNext(dataFromStep);
        }
    };

    const goBack = () => {
        onBack();
    };

    if (React.isValidElement(currentChild)) {
        return React.cloneElement(currentChild, { goNext, goBack, isFirstStep, isLastStep });
    }

    return <>{currentChild}</>;
};

export default Flow;
