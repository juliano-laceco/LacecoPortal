import React, { useState, useEffect, memo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Form from '../../custom/Form';
import Button from '../../custom/Button';
import Input from '../../custom/Input';
import DropdownLookup from '../../custom/Dropdowns/DropdownLookup';
import Image from 'next/image';

const ProjectPhasesForm = memo(({ data, goNext, goBack, isFirstStep, dropdowns }) => {

    const schema = yup.object().shape({
        phases: yup.array().of(
            yup.object().shape({
                name: yup.string().required('Phase name is required'),
                startDate: yup.date().typeError("Start Date must be a valid date").required('Start date is required'),
                endDate: yup.date()
                    .typeError("End Date must be a valid date")
                    .required('End date is required')
                    .test('is-after-start', 'End date must be after start date', function (value) {
                        const { startDate } = this.parent;
                        return new Date(value) > new Date(startDate);
                    }),
                startOnCreation: yup.boolean()
            })
        ).min(1, 'At least one phase is required')
    });

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { phases: data?.phases || [{ name: '', startDate: '', endDate: '', startOnCreation: false }] }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'phases'
    });

    useEffect(() => {
        reset(data);
    }, [data, reset]);

    const onSubmit = (formData) => {
        console.log(formData);
        goNext({ projectPhases: formData });
    };

    return (
        <Form
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            submitText="Next"
            columns={{ default: 4, mob: 1, lap: 4, desk: 4, tablet: 2 }}
            AdditionalButton={
                !isFirstStep && (
                    <Button variant="secondary" medium name="Back" onClick={goBack}>
                        Back
                    </Button>
                )
            }
            submit
        >
            {fields.map((phase, index) => (
                <div key={phase.id} className="space-y-6 border border-gray-300 p-3 rounded-lg shadow-xl">
                    <div className="font-bold text-black text-xl mb-2">Phase {index + 1}</div>
                    <DropdownLookup
                        className="select-input"
                        label="Phase Name"
                        options={dropdowns}
                        input_name={`phases.${index}.name`}
                        control={control}
                        isCreatable
                        error={errors.phases?.[index]?.name?.message}
                    />
                    <Input
                        label={`Expected Start Date`}
                        type="date"
                        error={errors.phases?.[index]?.startDate?.message}
                        {...control.register(`phases.${index}.startDate`)}
                    />
                    <Input
                        label={`Expected End Date`}
                        type="date"
                        error={errors.phases?.[index]?.endDate?.message}
                        {...control.register(`phases.${index}.endDate`)}
                    />
                    <div className="flex justify-between items-center">
                        <div>
                            <input
                                id={`start_on_creation_${index}`}
                                type="checkbox"
                                className="mr-2"
                                {...control.register(`phases.${index}.startOnCreation`)}
                            />
                            <label htmlFor={`start_on_creation_${index}`} className="text-gray-700 text-sm">Start on Creation</label>
                        </div>
                        <Image height="30" width="30" src="/resources/icons/bin.svg" className="bg-pric p-2 rounded-md cursor-pointer" onClick={() => remove(index)} />
                    </div>



                </div>
            ))}
            <div
                className="space-y-6 border shadow-xl border-dashed grid grid-center border-red-300 bg-red-100 p-3 rounded-lg cursor-pointer hover:bg-red-200"
                onClick={() => append({ name: '', startDate: '', endDate: '', startOnCreation: false })}
            >
                <div className="flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="" className="w6 h-6" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z" fill="#0D0D0D" />
                    </svg>
                    <span className="text-gray-900">Add Phase</span>
                </div>
            </div>
        </Form>
    );
});

ProjectPhasesForm.displayName = 'ProjectPhasesForm';

export default ProjectPhasesForm;
