'use client';

import React from 'react';

const Stepper = ({ steps, currentStep }) => {
    return (
        <div className="flex justify-center items-center mb-8">
            <div className="flex items-center">
                {steps.map((step, index) => (
                    <React.Fragment key={index}>
                        <div className="flex items-center">
                            <div className="flex flex-col items-center gap-1">
                                <div
                                    className={`w-20  mob:w-14 mob:h-14 h-20  rounded-full flex items-center justify-center border text-xl mob:text-sm transition-all duration-400 font-semibold ${index <= currentStep
                                            ? 'bg-pric text-white border-gray-300'
                                            : 'bg-gray-300 text-gray-600 border-gray-400'
                                        }`}
                                >
                                    {index + 1}
                                </div>
                                <p className="mob:text-sm text-center">{step.name}</p>
                            </div>
                            {index !== steps.length - 1 && (
                                <div
                                    className={`w-48 mob:w-16 p-1 rounded-md mb-6 transition-all duration-400 ${index < currentStep ? 'bg-pric' : 'bg-gray-300'
                                        }`}
                                ></div>
                            )}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Stepper;