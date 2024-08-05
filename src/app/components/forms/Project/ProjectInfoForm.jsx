'use client';

import React, { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Form from '../../custom/Form';
import Button from '../../custom/Button';
import Input from '../../custom/Input';
import DropdownLookup from '../../custom/Dropdowns/DropdownLookup';
import { formatDate } from '@/utilities/date/date-utils';
import { checkDisciplineIsPhaseAssigned, checkProjectCodeExists } from '@/utilities/project/project-utils';
import Modal from "../../custom/Modals/Modal"
import UnremovableDiscipline from './UnremovableDiscipline';




const ProjectInfoForm = memo(({ data, goNext, goBack, isFirstStep, dropdowns, isEdit, confirmModal }) => {


    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [unremovableDisciplines, setUnremovableDisciplines] = useState([])

    // Validation schema
    const schema = yup.object().shape({
        title: yup.string().required('Project name is required'),
        code: yup.string().required('Project code is required')
            .test(
                "is-unique-project-code",
                "Project Code already exists",
                async (value) => {
                    if (isEdit) {
                        return true; // No uniqueness check needed in edit mode
                    }
                    const response = await checkProjectCodeExists(value);
                    return response.res;
                }
            ),
        geography: yup.string().required('Geography is required'),
        city: yup.string().required('City is required'),
        client_id: yup.string().required('Client is required'),
        typology: yup.string().required('Typology is required'),
        sector: yup.string().required('Sector is required'),
        intervention: yup.string().required('Intervention is required'),
        disciplines: yup.array()
            .of(yup.object().shape({
                value: yup.string().required('Value is required'),
                label: yup.string().required('Label is required')
            }))
            .min(1, 'At least one discipline is required'),
        baseline_budget: yup.number()
            .typeError('Baseline Budget must be a number')
            .required('Baseline Budget is required')
            .positive('Baseline Budget must be a positive number'),
        BUA: yup.number()
            .typeError('BUA must be a number')
            .required('BUA is required')
            .positive('BUA must be a positive number'),
        Landscape: yup.number()
            .typeError('Landscape must be a number')
            .required('Landscape is required')
            .positive('Landscape must be a positive number'),
        ParkingArea: yup.number()
            .typeError('Parking Area must be a number')
            .required('Parking Area is required')
            .positive('Parking Area must be a positive number'),
        DesignArea: yup.number()
            .typeError('Design Area must be a number')
            .required('Design Area is required')
            .positive('Design Area must be a positive number'),
        planned_startdate: yup.date()
            .typeError('Planned Start Date must be a valid date')
            .required('Planned Start Date is required')
            .test('is-future', 'Planned Start Date must be in the future', function (value) {
                // return new Date(value) > new Date();
                return true
            }),
        planned_enddate: yup.date()
            .typeError('Planned End Date must be a valid date')
            .required('Planned End Date is required')
            .test('is-future', 'Planned End Date must be in the future', function (value) {
                // return new Date(value) > new Date();
                return true
            })
            .test('is-after-start', 'End Date must be greater than Start Date', function (value) {
                const { planned_startdate } = this.parent; // Access parent field value
                return new Date(value) > new Date(planned_startdate);
            }),
        employee_id: yup.string().required('Project Manager is required'),
        project_status: yup.string()

    });

    const {
        handleSubmit,
        formState: { errors },
        register,
        setValue,
        control,
        reset,
        trigger,
        watch
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: data?.disciplines?.length > 0 ? data : { ...data, disciplines: [] }
    });

    useEffect(() => {
        reset(data);
    }, [data, reset]);

    function preprocessData(data) {
        data.planned_startdate = formatDate(data.planned_startdate);
        data.planned_enddate = formatDate(data.planned_enddate);

        return data
    }

    const onSubmit = async (formData) => {

        if (!isEdit) {
            goNext({ projectInfo: preprocessData(formData) });
            return;
        }


        const removedDisciplines = findRemovedItems(data.disciplines, watch("disciplines"))
        const phasesAssignments = await checkDisciplineIsPhaseAssigned(removedDisciplines, data.project_id)

        const unremovableDisciplines = phasesAssignments.filter((item) => {
            return item.isPhaseAssigned === true
        })

        if (unremovableDisciplines.length > 0) {
            setUnremovableDisciplines(unremovableDisciplines)
            setModalIsOpen(true)
            return;
        } else {
            goNext({ projectInfo: preprocessData(formData) });
        }
    };
    function findRemovedItems(array1, array2) {
        // Convert array2 to a Set for faster lookup, normalize to string for comparison
        const set2 = new Set(array2.map(item => String(item.value)));

        // Filter items in array1 that are not in array2, normalize to string for comparison
        const removedItems = array1.filter(item => !set2.has(String(item.value)));

        return removedItems;
    }


    const handleDisciplineChange = (disciplines) => {
        setValue("disciplines", disciplines)
        trigger("disciplines");
    };

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
                            <Button variant="secondary" medium name="Back" onClick={goBack}>
                                Back
                            </Button>
                        )}
                        <Button variant="secondary" medium name="Cancel" onClick={() => confirmModal(true)}>
                            Cancel
                        </Button>
                    </>
                }
                submit
            >
                <Input label="Project Name" type="text" {...register("title")} error={errors.title?.message} />
                <Input label="Project Code" type="text" {...register("code")} error={errors.code?.message} isDisabled={isEdit} />
                <DropdownLookup
                    className="select-input"
                    label="Geography"
                    options={dropdowns.countries}
                    input_name="geography"
                    control={control}
                    isCreatable
                    error={errors.geography?.message}
                />
                <Input label="City" type="text" {...register("city")} error={errors.city?.message} />
                <DropdownLookup
                    className="select-input"
                    label="Client"
                    options={dropdowns.clients}
                    input_name="client_id"
                    control={control}
                    error={errors.client_id?.message}
                />
                <DropdownLookup
                    className="select-input"
                    label="Typology"
                    options={dropdowns.typologies}
                    input_name="typology"
                    control={control}
                    error={errors.typology?.message}
                />
                <DropdownLookup
                    className="select-input"
                    label="Sector"
                    options={dropdowns.sectors}
                    input_name="sector"
                    control={control}
                    error={errors.sector?.message}
                />
                <DropdownLookup
                    className="select-input"
                    label="Intervention"
                    options={dropdowns.interventions}
                    input_name="intervention"
                    control={control}
                    error={errors.intervention?.message}
                />
                <DropdownLookup
                    className="select-input"
                    label="Disciplines"
                    options={dropdowns.disciplines}
                    input_name="disciplines"
                    isMulti
                    control={control}
                    error={errors.disciplines?.message}
                    handler={handleDisciplineChange}
                />
                <Input label="Baseline Budget (USD)" type="number" {...register("baseline_budget")} error={errors.baseline_budget?.message} />
                <Input label="BUA (sqm)" type="number" {...register("BUA")} error={errors.BUA?.message} />
                <Input label="Landscape (sqm)" type="number" {...register("Landscape")} error={errors.Landscape?.message} />
                <Input label="Parking Area (sqm)" type="number" {...register("ParkingArea")} error={errors.ParkingArea?.message} />
                <Input label="Design Area (sqm)" type="number" {...register("DesignArea")} error={errors.DesignArea?.message} />
                <Input label="Planned Start Date" type="date" {...register("planned_startdate")} error={errors.planned_startdate?.message} />
                <Input label="Planned End Date" type="date" {...register("planned_enddate")} error={errors.planned_enddate?.message} />
                <DropdownLookup
                    className="select-input"
                    label="Project Manager"
                    options={dropdowns.employees}
                    input_name="employee_id"
                    control={control}
                    error={errors.employee_id?.message}
                />
                <DropdownLookup
                    className="select-input"
                    label="Project Status"
                    options={dropdowns.project_statuses}
                    input_name="project_status"
                    control={control}
                    error={errors.employee_id?.message}
                />
                {isEdit && <Input label="Baselined" type="text" {...register("isBaselined")} error={errors.isBaselined?.message} isDisabled={true} />}
            </Form >
            <Modal title="Cannot Remove Disciplines" open={modalIsOpen} type="client" onClose={() => setModalIsOpen(false)}>
                <UnremovableDiscipline unremovableDisciplines={unremovableDisciplines} />
            </Modal>
        </>
    );
});

ProjectInfoForm.displayName = "ProjectInfoForm";

export default ProjectInfoForm;
