'use client';

import React, { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Form from '../../custom/Form';
import Button from '../../custom/Button';
import Input from '../../custom/Input';

// Validation schema
const schema = yup.object().shape({
    title: yup.string().required('Project name is required'),
    code: yup.string().required('Project code is required'),
});

const ProjectInfoForm = memo(({ data, goNext, goBack, isFirstStep, isLastStep, optionsData }) => {
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
        goNext({ projectInfo: formData });
    };

    return (
        <Form
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            submitText="Next"
            columns={{ default: 3, mob: 1, lap: 3, desk: 3, tablet: 2 }}
            AdditionalButton={
                !isFirstStep && (
                    <Button variant="secondary" medium name="Back" onClick={goBack}>
                        Back
                    </Button>
                )
            }
            submit
        >
            <Input label="Project Name" type="text" {...register("title")} error={errors.title?.message} />
            <Input label="Project Code" type="text" {...register("code")} error={errors.code?.message} />
        </Form>
    );
});

ProjectInfoForm.displayName = "ProjectInfoForm"

export default ProjectInfoForm;