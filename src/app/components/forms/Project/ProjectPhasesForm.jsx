import React, { useState, useEffect, memo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Form from '../../custom/Form';
import Button from '../../custom/Button';
import Input from '../../custom/Input';
import DropdownLookup from '../../custom/Dropdowns/DropdownLookup';
import Image from 'next/image';
import { addDays, addMonths, addYears } from 'date-fns';
import { formatDate } from '@/utilities/date/date-utils';

const ProjectPhasesForm = memo(({ data, goNext, goBack, isFirstStep, dropdowns }) => {

    console.log("DATA", data)

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
                durationValue: yup.string().when('startDate', {
                    is: (startDate) => !!startDate,
                    then: () => yup.string().typeError("Duration must be a number").required('Duration value is required'),
                    otherwise: () => yup.string().notRequired(),
                }),
                durationUnit: yup.string().when('startDate', {
                    is: (startDate) => !!startDate,
                    then: () => yup.string().required('Duration unit is required'),
                    otherwise: () => yup.string().notRequired(),
                })
            })
        ).min(1, 'At least one phase is required')
    });


    const { control, handleSubmit, formState: { errors }, reset, watch, trigger, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { phases: data || [{ name: '', startDate: '', endDate: '', durationValue: '', durationUnit: '' }] }
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
                startDate: formatDate(item.startDate),
                endDate: formatDate(item.endDate)
            };
        });
    }

    const addDuration = (startDate, duration, unit) => {
        const date = new Date(startDate);
        switch (unit) {
            case 'days':
                return addDays(date, duration);
            case 'months':
                return addMonths(date, duration);
            case 'years':
                return addYears(date, duration);
            default:
                return date;
        }
    };

    const handleStartDateChange = (index) => {
        const startDate = watch(`phases.${index}.startDate`);
        const durationValue = watch(`phases.${index}.durationValue`);
        const durationUnit = watch(`phases.${index}.durationUnit`);

        if (!startDate || isNaN(new Date(startDate))) {
            setValue(`phases.${index}.durationValue`, '');
            setValue(`phases.${index}.endDate`, '');
        } else if (durationValue && durationUnit) {
            const newEndDate = addDuration(startDate, parseInt(durationValue, 10), durationUnit);
            setValue(`phases.${index}.endDate`, formatDate(newEndDate));
            trigger(`phases.${index}.endDate`)
        }
    };

    const handleDurationChange = (index) => {
        const startDate = watch(`phases.${index}.startDate`);
        const durationValue = watch(`phases.${index}.durationValue`);
        const durationUnit = watch(`phases.${index}.durationUnit`);


        if (startDate && !isNaN(new Date(startDate)) && durationValue && durationUnit) {
            const newEndDate = addDuration(startDate, parseInt(durationValue, 10), durationUnit);
            setValue(`phases.${index}.endDate`, formatDate(newEndDate));
            trigger(`phases.${index}.endDate`)
        }
    };

    return (
        <Form
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            submitText="Next"
            columns={{ default: 1, mob: 1, lap: 4, desk: 4, tablet: 2 }}
            AdditionalButton={
                !isFirstStep && (
                    <Button variant="secondary" medium name="Back" onClick={goBack}>
                        Back
                    </Button>
                )
            }
            submit
        >
            {fields.map((phase, index) => {
                const startDate = watch(`phases.${index}.startDate`);
                const isStartDateValid = !!startDate && !errors.phases?.[index]?.startDate;

                return (
                    <div key={phase.id} className="space-y-2 border border-gray-300 p-4 rounded-lg shadow-xl">
                        <div className="flex justify-between items-center">
                            <div className="font-bold text-xl">Phase {index + 1}</div>
                            <Image height="30" width="30" src="/resources/icons/bin.svg" className="bg-pric p-2 rounded-md cursor-pointer transition-all duration-200 ease hover:bg-pri-hovc" onClick={() => fields.length > 1 && remove(index)} alt="delete-icon" />
                        </div>
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
                            {...control.register(`phases.${index}.startDate`, {
                                onChange: () => handleStartDateChange(index)
                            })}
                        />
                        <Input
                            label={`Expected End Date`}
                            type="date"
                            isDisabled
                            error={errors.phases?.[index]?.endDate?.message}
                            {...control.register(`phases.${index}.endDate`)}
                        />
                        <div className="flex space-x-4 justify-center items-end">
                            <Input
                                label="Duration"
                                type="number"
                                error={errors.phases?.[index]?.durationValue?.message}
                                isDisabled={!isStartDateValid}
                                {...control.register(`phases.${index}.durationValue`, {
                                    onChange: () => handleDurationChange(index)
                                })}
                            />
                            {isStartDateValid ? (
                                <DropdownLookup
                                    options={[
                                        { value: 'days', label: 'Days' },
                                        { value: 'months', label: 'Months' },
                                        { value: 'years', label: 'Years' },
                                    ]}
                                    input_name={`phases.${index}.durationUnit`}
                                    control={control}
                                    isSearchable={false}
                                    isClearable={false}
                                    isCreatable={false}
                                    label="Duration Unit"
                                    error={errors.phases?.[index]?.durationUnit?.message}
                                    handler={(value) => handleDurationChange(index, watch(`phases.${index}.durationValue`), value)}
                                />
                            ) : (
                                <DropdownLookup
                                    options={[]}
                                    input_name={`phases.${index}.durationUnit`}
                                    control={control}
                                    isDisabled
                                    label="Duration Unit"
                                />
                            )}
                        </div>
                    </div>
                );

            })}
            <div
                className="space-y-6 border shadow-xl border-dashed grid grid-center border-red-300 bg-red-100 p-3 rounded-lg cursor-pointer hover:bg-red-200 transition-all duration-200"
                onClick={() => append({ name: '', startDate: '', endDate: '', durationValue: '', durationUnit: 'days' })}
            >
                <div className="flex items-center justify-center gap-2">
                    <Image height="25" width="25" src="/resources/icons/add-phase.svg" className="cursor-pointer" alt="add-phase-icon" />
                    <span className="text-pric font-semibold">Add Phase</span>
                </div>
            </div>
        </Form>
    );
});

ProjectPhasesForm.displayName = 'ProjectPhasesForm';

export default ProjectPhasesForm;
