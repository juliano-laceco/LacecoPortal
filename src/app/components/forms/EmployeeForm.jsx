"use client"


// React + Next Hooks
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
// Components
import Dropdown from "../custom/Dropdown";
import Input from "../custom/Input";
import Form from '../custom/Form';
// Data
import nationalities from "@/data/static/nationalities";
import marital_statuses from "@/data/static/marital-status";
import countries from '@/data/static/countries';
// Form Utils
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { useForm } from "react-hook-form";
// Backend Functions
import { checkEmailExists, createEmployee, updateEmployee } from '@/utilities/employee/employee-utils';
import { getDisciplines } from '@/utilities/lookups/lookup-utils';
// Utilities
import { showToast } from '@/utilities/toast-utils';
import { formatDate } from '@/utilities/date/date-utils';


function Employee({ isEdit, defaultValues = {}, optionsData }) {

    const router = useRouter()

    // Setting  Title and Submit Texts
    const submitText = isEdit ? "Update" : "Submit"
    const titleText = isEdit ? "Edit Employee" : "Add Employee"


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
            .required("Work Email is required")
            .test(
                "is-unique-email",
                "Email already exists",
                async (value) => {
                    if (isEdit) {
                        return true;
                    }
                    const response = await checkEmailExists(value)
                    return response.res;
                }
            ),
        discipline_id: yup.string()
            .required("Discipline is required"),
        division_id: yup.string()
            .required("Division is required"),
        nationality: yup.string()
            .required("Nationality is required"),
        country: yup.string()
            .required("Country is required"),
        marital_status: yup.string()
            .required("Marital Status is required"),
        contract_type_id: yup.string()
            .required("Contract Type is required"),
        position_id: yup.string()
            .required("Position is required"),
        grade_id: yup.string()
            .required("Grade is required"),
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
        status_id: isEdit ? yup.string().required("Status is required") : yup.string(),
        contract_valid_till: yup.string().when("contract_type_id", {
            is: "2",
            then: () => yup.date()
                .typeError("Contract Valid Till must be a valid date")
                .min(new Date(), "Contract Valid Till must be in the future")
                .required("Contract Valid Till is required"),
            otherwise: () => yup.string().nullable()
        })
    });

    const { handleSubmit, register, watch, control, setValue, formState: { errors, isSubmitting, } } = useForm({
        resolver: yupResolver(schema),
        defaultValues

    });

    // After setting defaultValues in useForm hook
    useEffect(() => {
        const divisionId = defaultValues.division_id; // Assuming division_id is part of defaultValues
        if (divisionId) {
            handleDivisionChange(divisionId);
        }
    }, [defaultValues.division_id]);

    const selectedContractId = watch("contract_type_id")

    const [loadingDisciplines, setLoadingDisciplines] = useState(false);
    const [filteredDisciplines, setFilteredDisciplines] = useState([])



    async function handleDivisionChange(division_id) {

        setLoadingDisciplines(true)
        setValue("discipline_id", "")

        const disciplinesRes = await getDisciplines(division_id)
        const disciplines = disciplinesRes.data ?? []

        setFilteredDisciplines(disciplines)
        setLoadingDisciplines(false)
        setDefaultDiscipline()
    }

    function handleContractTypeChange() {
        setValue("contract_valid_till", "")
    }

    function setDefaultDiscipline() {
        const defaultDiscipline = defaultValues?.discipline_id ?? null
        if (!!defaultDiscipline) setValue("discipline_id", defaultDiscipline)
    }

    const onCreate = async (data) => {

        data.date_of_birth = formatDate(data.date_of_birth)
        !!data.contract_valid_till && (data.contract_valid_till = formatDate(data.contract_valid_till))


        const result = await createEmployee(data)

        if (result.res) {
            showToast("success", "Successfully Created Employee")
            router.replace("/hr")
        }
    };

    const onUpdate = async (data) => {

        data.date_of_birth = formatDate(data.date_of_birth)
        !!data.contract_valid_till && (data.contract_valid_till = formatDate(data.contract_valid_till))

        const flags = getFlags(data)

        const result = await updateEmployee({ ...data, ...flags })

        if (result.res) {
            showToast("success", "Successfully Updated Employee")
            router.replace("/hr")
        }

    }

    function getFlags(data) {

        const grade_changed = data.grade_id != defaultValues.grade_id
        const position_changed = data.position_id != defaultValues.position_id
        const employee_id = defaultValues.employee_id

        return { grade_changed, position_changed, employee_id }
    }


    return (
        <Form title={titleText} handleSubmit={handleSubmit} onSubmit={isEdit ? onUpdate : onCreate} submitText={submitText} isSubmitting={isSubmitting} submit  >
            <Input label="First Name" type="text" {...register("first_name")} error={errors.first_name?.message} />
            <Input label="Last Name" type="text" {...register("last_name")} error={errors.last_name?.message} />
            <Input label="Date of Birth" type="date" {...register("date_of_birth")} error={errors.date_of_birth?.message} />
            <Input label="Work Email" type="text" {...register("work_email")} error={errors.work_email?.message} isDisabled={isEdit} />
            <Dropdown
                className="select-input"
                label="Division"
                isClearable
                options={optionsData.divisions}
                handler={handleDivisionChange}
                input_name="division_id"
                control={control}
                error={errors.division_id?.message}
            />
            <Dropdown
                className="select-input"
                label="Department"
                isClearable
                options={filteredDisciplines}
                isLoading={loadingDisciplines}
                input_name="discipline_id"
                control={control}
                error={errors.discipline_id?.message}
            />
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
                handler={handleContractTypeChange}
                input_name="contract_type_id"
                control={control}
                error={errors.contract_type_id?.message}
            />
            {selectedContractId === 2 && (
                <Input label="Contract Valid Till" type="date" {...register("contract_valid_till")} error={errors.contract_valid_till?.message} />
            )}
            <Dropdown
                className="select-input"
                label="Position"
                isClearable
                options={optionsData.positions}
                input_name="position_id"
                control={control}
                error={errors.position_id?.message}
            />
            <Dropdown
                className="select-input"
                label="Grade"
                isClearable
                options={optionsData.grades}
                input_name="grade_id"
                control={control}
                error={errors.grade_id?.message}
            />
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
                    input_name="status_id"
                    control={control}
                    error={errors.status_id?.message}
                />
            }
        </Form>
    );
}

export default Employee;
