'use client';

import React, { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Form from '../../custom/Form';
import Button from '../../custom/Button';

// Validation schema
const schema = yup.object().shape({
    phase_name: yup.string().required('Phase name is required'),
    phase_code: yup.string().required('Phase code is required'),
});

const ProjectPhasesForm = memo(({ data, goNext, goBack, isFirstStep, isLastStep }) => {
    const {
        handleSubmit,
        formState: { errors },
        register,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: data,
    });

    useEffect(() => {
        reset(data);
    }, [data, reset]);

    const onSubmit = (formData) => {
        goNext({ projectPhases: formData });
    };

    return (
        <Form
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            submitText="Save Project"
            columns={{ default: 1, mob: 1, lap: 1, desk: 1, tablet: 1 }}
            AdditionalButton={
                !isFirstStep && (
                    <Button variant="secondary" medium name="Back" onClick={goBack}>
                        Back
                    </Button>
                )
            }
            submit
        >
            <div>
                <label htmlFor="phase_name">Phase Name</label>
                <input id="phase_name" {...register('phase_name')} />
                {errors.phase_name && <p>{errors.phase_name.message}</p>}
            </div>
            <div>
                <label htmlFor="phase_code">Phase Code</label>
                <input id="phase_code" {...register('phase_code')} />
                {errors.phase_code && <p>{errors.phase_code.message}</p>}
            </div>
        </Form>
    );
});

ProjectPhasesForm.displayName = "ProjectPhasesForm"
export default ProjectPhasesForm;