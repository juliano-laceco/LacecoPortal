"use client";

// React + Next Hooks
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// Components
import Dropdown from "../custom/Dropdowns/DropdownLookup";
import Input from "../custom/Input";
import Form from '../custom/Form';
// Data
import nationalities from "@/data/static/nationalities";
import marital_statuses from "@/data/static/marital-status";
import countries from '@/data/static/countries';
// Form Utils
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
// Backend Functions
import { checkEmailExists, createEmployee, updateEmployee } from '@/utilities/employee/employee-utils';
import { getDisciplines, getPositions, getPositionDetails } from '@/utilities/lookups/lookup-utils';
// Utilities
import { showToast } from '@/utilities/toast-utils';
import { formatDate } from '@/utilities/date/date-utils';

function EmployeeForm({ isEdit, defaultValues = {}, optionsData }) {
    const router = useRouter();

    // Setting Title and Submit Texts
    const submitText = isEdit ? "Update" : "Submit";
    const titleText = isEdit ? "Edit Employee" : "Add Employee";

    // Defining Validation Schema
    const schema = yup.object().shape({
        first_name: yup.string()
            .required("First Name is required")
            .matches(/^[A-Za-z]+$/, 'First Name must contain only alphabet characters'),
        last_name: yup.string()
            .required("Last Name is required")
            .matches(/^[A-Za-z]+$/, 'Last Name must contain only alphabet characters'),
        date_of_birth: yup.date()
            .typeError("Date of Birth is required")
            .min(new Date(new Date().getFullYear() - 118, new Date().getMonth(), new Date().getDate()), "Invalid Birth Date")
            .max(new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()), "Invalid Birth Date"),
        work_email: yup.string()
            .email("Invalid email format")
            .matches(/@laceco\.me$/, "Work email must be from @laceco.me domain")
            .required("Work Email is required")
            .test(
                "is-unique-email",
                "Email already exists",
                async (value) => {
                    if (isEdit) {
                        return true; // No uniqueness check needed in edit mode
                    }
                    const response = await checkEmailExists(value);
                    return response.res;
                }
            )
        ,
        division_id: yup.string()
            .required("Division is required"),
        discipline_id: yup.string()
            .required("Discipline is required"),
        position_id: yup.string()
            .required("Position is required"),
        nationality: yup.string()
            .required("Nationality is required"),
        country: yup.string()
            .required("Country is required"),
        marital_status: yup.string()
            .required("Marital Status is required"),
        contract_type_id: yup.string()
            .required("Contract Type is required"),
        contract_valid_till: yup.string().when("contract_type_id", {
            is: "2",
            then: () => yup.date()
                .typeError("Contract Valid Till must be a valid date")
                .min(new Date(), "Contract Valid Till must be in the future")
                .required("Contract Valid Till is required"),
            otherwise: () => yup.string().nullable()
        }),
        role_id: yup.string()
            .required("Role is required"),
        employee_hourly_cost: yup.number()
            .nullable()
            .transform((curr, orig) => (orig === "" ? null : curr))
            .positive("Hourly cost must be positive"),
        major: yup.string()
            .required("Major is required"),
        years_of_experience: yup.number()
            .typeError('Years of Experience must be a number')
            .required("Years of Experience is required")
            .min(0, "Years of Experience must be greater than or equal to 0")
            .max(50, "Years of Experience must be less than or equal to 50"),
        employee_status_id: isEdit ? yup.string().required("Status is required") : yup.string(),
        created_on: isEdit
            ? yup.date().nullable() // No validation for edit mode
            : yup.date()
                .typeError("Work Start Date must be a valid date")
                .min(new Date(new Date().setHours(0, 0, 0, 0)), "Work Start Date must be today or in the future")
                .required("Work Start Date is required")
    });

    // Defining useForm Hook to link custom components for validation
    const { handleSubmit, register, watch, control, setValue, formState: { errors, isSubmitting, } } = useForm({
        resolver: yupResolver(schema),
        defaultValues
    });

    // Watching values for changes
    const selectedContractId = watch("contract_type_id");
    const selectedDivision = watch("division_id");
    const selectedDiscipline = watch("discipline_id");

    // Defining loading State Variables
    const [loadingDisciplines, setLoadingDisciplines] = useState(false);
    const [filteredDisciplines, setFilteredDisciplines] = useState([]);
    const [loadingPositions, setLoadingPositions] = useState(false);
    const [filteredPositions, setFilteredPositions] = useState([]);


    // DEFAULT VALUE TRIGGERS 
    useEffect(() => {
        const divisionId = defaultValues.division_id; // Assuming division_id is part of defaultValues
        if (divisionId) {
            handleDivisionChange(divisionId);
            setDefaultDiscipline();
        }
    }, [defaultValues.division_id]
    );

    useEffect(() => {

        const disciplineId = defaultValues.discipline_id; // Assuming division_id is part of defaultValues
        if (disciplineId) {
            handleDisciplineChange(disciplineId);
            setDefaultPosition();
        }
    }, [defaultValues.discipline_id]
    );

    useEffect(() => {
        const positionId = defaultValues.position_id; // Assuming division_id is part of defaultValues
        if (positionId) {
            handlePositionChange(positionId);
        }
    }, [defaultValues.position_id]
    );


    /* CHANGE HANDLERS */
    async function handleDivisionChange(division_id) {

        setLoadingDisciplines(true);

        clearDiscipline();
        clearPosition();
        clearPositionDetails();

        const disciplinesRes = await getDisciplines(division_id);
        const disciplines = disciplinesRes?.data ?? [];

        setFilteredDisciplines(disciplines);
        setLoadingDisciplines(false);
    }

    async function handleDisciplineChange(discipline_id) {

        setLoadingPositions(true);

        clearPosition();
        clearPositionDetails();

        const positionsRes = await getPositions(discipline_id);
        const positions = positionsRes?.data ?? [];

        setFilteredPositions(positions);
        setLoadingPositions(false);
    }

    async function handlePositionChange(position_id) {

        if (!position_id) {
            clearPositionDetails()
            return;
        }

        const positionDetails = await getPositionDetails(position_id);
        if (positionDetails) {
            const { level_of_management_name, grade_code } = positionDetails.data[0];
            setValue("level_of_management_name", level_of_management_name);
            setValue("grade_name", grade_code);
        }
    }


    /* VALUE CLEARER FUNCTIONS */

    function clearPositionDetails() {
        setValue("level_of_management_name", "");
        setValue("grade_name", "");
    }

    function clearPosition() {
        setValue("position_id", "");
    }

    function clearDiscipline() {
        setValue("discipline_id", "");
        setFilteredPositions([])
    }

    function clearContractValidity() {
        setValue("contract_valid_till", "");
    }


    /* DEFAULT VALUE SETTERS */
    function setDefaultDiscipline() {
        const defaultDiscipline = defaultValues?.discipline_id ?? null;
        if (defaultDiscipline) setValue("discipline_id", defaultDiscipline);
    }

    function setDefaultPosition() {
        const defaultPosition = defaultValues?.position_id ?? null;
        if (defaultPosition) setValue("position_id", defaultPosition);
    }


    /* SUBMISSION FUNCTIONS */
    const onCreate = async (data) => {

        data = formatFieldDates(data)

        const result = await createEmployee(data);

        if (result) {
            showToast("success", "Successfully Created Employee");
            router.replace("/hr/employee/all");
            router.refresh();
        }
    };

    const onUpdate = async (data) => {

        data = formatFieldDates(data)

        const flags = getFlags(data);

        const result = await updateEmployee({ ...data, ...flags });

        if (result) {
            showToast("success", "Successfully Updated Employee");
            router.replace("/hr/employee/all");
            router.refresh();
        }
    };


    function formatFieldDates(data) {
        data.date_of_birth = formatDate(data.date_of_birth);
        if (data.contract_valid_till) {
            data.contract_valid_till = formatDate(data.contract_valid_till);
        }
        data.created_on = formatDate(data.created_on);

        return data
    }

    function getFlags(data) {
        const position_changed = data.position_id != defaultValues.position_id;
        const status_changed = data.employee_status_id != defaultValues.employee_status_id;
        const employee_id = defaultValues.employee_id;

        return { position_changed, status_changed, employee_id };
    }


    return (
        <Form title={titleText} handleSubmit={handleSubmit} onSubmit={isEdit ? onUpdate : onCreate} submitText={submitText} isSubmitting={isSubmitting} submit>
            <Input label="First Name" type="text" {...register("first_name")} error={errors.first_name?.message} />
            <Input label="Last Name" type="text" {...register("last_name")} error={errors.last_name?.message} />
            <Input label="Date of Birth" type="date" {...register("date_of_birth")} error={errors.date_of_birth?.message} />
            <Input label="Work Email" type="text" {...register("work_email")} error={errors.work_email?.message} isDisabled={isEdit} />
            <Dropdown
                className="select-input"
                label="Division"
                options={optionsData.divisions}
                handler={handleDivisionChange}
                input_name="division_id"
                control={control}
                error={errors.division_id?.message}
            />
            <Dropdown
                className="select-input"
                label="Department"
                options={filteredDisciplines}
                isLoading={loadingDisciplines}
                input_name="discipline_id"
                control={control}
                handler={handleDisciplineChange}
                error={errors.discipline_id?.message}
            />
            <Dropdown
                className="select-input"
                label="Position"
                options={filteredPositions}
                isLoading={loadingPositions}
                input_name="position_id"
                control={control}
                handler={handlePositionChange}
                error={errors.position_id?.message}
            />
            <Input type="text" label="Level Of Management" {...register("level_of_management_name")} isDisabled />
            <Input type="text" label="Grade" {...register("grade_name")} isDisabled />
            <Dropdown
                className="select-input"
                label="Nationality"
                isClearable
                options={nationalities}
                input_name="nationality"
                control={control}
                error={errors.nationality?.message}
            />
            <Dropdown
                className="select-input"
                label="Country"
                isClearable
                options={countries}
                input_name="country"
                control={control}
                error={errors.country?.message}
            />
            <Dropdown
                className="select-input"
                label="Marital Status"
                isClearable
                options={marital_statuses}
                input_name="marital_status"
                control={control}
                error={errors.marital_status?.message}
            />
            <Dropdown
                className="select-input"
                label="Contract Type"
                isClearable
                options={optionsData.contractTypes}
                handler={clearContractValidity}
                input_name="contract_type_id"
                control={control}
                error={errors.contract_type_id?.message}
            />
            {selectedContractId == "2" && (
                <Input label="Contract Valid Till" type="date" {...register("contract_valid_till")} error={errors.contract_valid_till?.message} />
            )}
            <Dropdown
                className="select-input"
                label="Role"
                isClearable
                options={optionsData.roles}
                input_name="role_id"
                control={control}
                error={errors.role_id?.message}
            />
            <Input label="Hourly Cost" type="number" {...register("employee_hourly_cost")} error={errors.employee_hourly_cost?.message} />
            <Input label="Major" type="text" {...register("major")} error={errors.major?.message} />
            <Input label="Years of Experience" type="text" {...register("years_of_experience")} error={errors.years_of_experience?.message} />
            {isEdit &&
                <Dropdown
                    className="select-input"
                    label="Status"
                    isClearable
                    options={optionsData.statuses}
                    input_name="employee_status_id"
                    control={control}
                    error={errors.status_id?.message}
                />
            }
            <Input label="Work Start Date" type="date" {...register("created_on")} error={errors.created_on?.message} isDisabled={isEdit} />
        </Form>
    );
}

export default EmployeeForm;
