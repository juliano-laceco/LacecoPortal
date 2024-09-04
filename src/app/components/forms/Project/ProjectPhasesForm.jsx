"use client"

import React, { useEffect, memo, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Form from '../../custom/Other/Form';
import Button from '../../custom/Other/Button';
import Input from '../../custom/Other/Input';
import DropdownLookup from '../../custom/Dropdowns/DropdownLookup';
import Image from 'next/image';
import { formatDate } from '@/utilities/date/date-utils';
import Link from 'next/link';

const ProjectPhasesForm = memo(({ data, goNext, goBack, isFirstStep, dropdowns, isEdit, confirmModal }) => {




    const schema = yup.object().shape({
        phases: yup.array().of(
            yup.object().shape({
                phase_name: yup.string().required('Phase name is required'),
                planned_startdate: yup.date().typeError("Start Date must be a valid date").required('Start date is required'),
                planned_enddate: yup.date()
                    .typeError("End Date must be a valid date")
                    .required('End date is required')
                    .test('is-after-start', 'End date must be after start date', function (value) {
                        const { planned_startdate } = this.parent;
                        return new Date(value) > new Date(planned_startdate);
                    })
            })
        ).min(1, 'At least one phase is required')
    });


    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { phases: data || [{ phase_id: '', phase_name: '', planned_startdate: '', planned_enddate: '', hasAssignees: '' }] }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'phases'
    });

    useEffect(() => {
        if (data && data.phases && data.phases.length > 0) {
            reset(data);
        }
    }, [data, reset]);

    const onSubmit = (formData) => {
        goNext({ phases: preprocessData(formData.phases) });
    };

    function preprocessData(data) {
        return data.map(item => {
            return {
                ...item,
                planned_startdate: formatDate(item.planned_startdate),
                planned_enddate: formatDate(item.planned_enddate)
            };
        });
    }

    return (

        <>
            <Form
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                submitText="Next"
                columns={{ default: 1, mob: 1, lap: 4, desk: 4, tablet: 2 }}
                AdditionalButton={
                    <>
                        {!isFirstStep && (
                            <Button variant="secondary" medium name="Back" onClick={goBack} />
                        )}
                        <Button variant="secondary" medium name="Cancel" onClick={() => confirmModal(true)} />
                    </>
                }
                submit
            >
                {fields.map((phase, index) => {
                    return (
                        <div key={phase.id} className="space-y-2 border border-gray-300 p-4 rounded-lg shadow-xl">
                            <div className="flex justify-between items-center">
                                <div className="font-bold text-xl">Phase {index + 1}</div>
                                {
                                    !isEdit || !phase.hasAssignees ? (
                                        <Image
                                            height="30"
                                            width="30"
                                            src="/resources/icons/bin.svg"
                                            className="bg-pric p-2 rounded-md cursor-pointer transition-all duration-200 ease hover:bg-pri-hovc"
                                            onClick={() => fields.length > 1 && remove(index)}
                                            alt="delete-icon"
                                        />
                                    ) : (
                                        <Image
                                            height="30"
                                            width="30"
                                            src="/resources/icons/bin.svg"
                                            className="bg-gray-300 p-2 rounded-md cursor-not-allowed transition-all duration-200 ease"
                                            alt="delete-icon"
                                            title="Phase contains assignees. Unable to delete"
                                        />
                                    )
                                }
                            </div>
                            <DropdownLookup
                                className="select-input"
                                label="Phase Name"
                                options={dropdowns}
                                input_name={`phases.${index}.phase_name`}
                                control={control}
                                error={errors.phases?.[index]?.phase_name?.message}
                            />
                            <Input
                                label={`Expected Start Date`}
                                type="date"
                                error={errors.phases?.[index]?.planned_startdate?.message}
                                {...control.register(`phases.${index}.planned_startdate`)}
                            />
                            <Input
                                label={`Expected End Date`}
                                type="date"
                                error={errors.phases?.[index]?.planned_enddate?.message}
                                {...control.register(`phases.${index}.planned_enddate`)}
                            />
                        </div>
                    );

                })}
                <div
                    className="space-y-6 border shadow-xl border-dashed grid grid-center border-red-300 bg-red-100 p-3 rounded-lg cursor-pointer hover:bg-red-200 transition-all duration-200"
                    onClick={() => append({ phase_id: '', phase_name: '', planned_startdate: '', planned_enddate: '', hasAssignees: '' })}
                >
                    <div className="flex items-center justify-center gap-2">
                        <Image height="25" width="25" src="/resources/icons/add-phase.svg" className="cursor-pointer" alt="add-phase-icon" />
                        <span className="text-pric font-semibold">Add Phase</span>
                    </div>
                </div>
            </Form>
        </>
    );
});

ProjectPhasesForm.displayName = 'ProjectPhasesForm';

export default ProjectPhasesForm;
