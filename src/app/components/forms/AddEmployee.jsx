"use client"

import { React, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Button from "../custom/Button";
import Dropdown from "../custom/Dropdown";
import Input from "../custom/Input";
import nationalities from "@/static-data/nationalities";
import marital_statuses from "@/static-data/marital-status";
import countries from '@/static-data/countries';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { getPositions, getGrades, getRoles, getEmployeeStatuses, checkEmailExists, createEmployee, getDisciplines, getContractTypes } from '@/utilities/db-utils';

function AddEmployee() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true);
    const [selectedContractId, setSelectedContractId] = useState(null)
    const [formData, setFormData] = useState({
        disciplines: [],
        contractTypes: [],
        positions: [],
        grades: [],
        roles: [],
        statuses: [],
    });

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
                    const response = await checkEmailExists(value)
                    return response.res; // Check if email exists in the response
                }
            ),
        discipline_id: yup.string()
            .required("Discipline is required"),
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
            .typeError('Hourly Cost must be a number')
            .required("Hourly Cost is required")
            .positive("Hourly Cost must be a positive number"),
        major: yup.string()
            .required("Major is required"),
        years_of_experience: yup.number()
            .typeError('Years of Experience must be a number')
            .required("Years of Experience is required")
            .min(0, "Years of Experience must be greater than or equal to 0")
            .max(50, "Years of Experience must be less than or equal to 50"),
        status_id: yup.string()
            .required("Status is required"),
        contract_valid_till: yup.string().when("contract_type_id", {
            is: "2",
            then: () => yup.date()
                .typeError("Contract Valid Till must be a valid date")
                .min(new Date(), "Contract Valid Till must be in the future")
                .required("Contract Valid Till is required"),
            otherwise: () => yup.string()
        })
    });

    const { handleSubmit, register, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [disciplinesRes, contractTypesRes, positionsRes, gradesRes, rolesRes, statusesRes] = await Promise.all([
                    getDisciplines(),
                    getContractTypes(),
                    getPositions(),
                    getGrades(),
                    getRoles(),
                    getEmployeeStatuses()
                ]);

                setFormData({
                    disciplines: disciplinesRes.data ?? [],
                    contractTypes: contractTypesRes.data ?? [],
                    positions: positionsRes.data ?? [],
                    grades: gradesRes.data ?? [],
                    roles: rolesRes.data ?? [],
                    statuses: statusesRes.data ?? [],
                });
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const onSubmit = async (data) => {

        data.date_of_birth = formatDate(data.date_of_birth)
        !!data.contract_valid_till && (data.contract_valid_till = formatDate(data.contract_valid_till))
        const result = await createEmployee(data)
        if (result.res) router.replace("/hr")
    };

    function formatDate(date) {
        const parsedDate = new Date(date);
        const year = parsedDate.getFullYear();
        const month = ('0' + (parsedDate.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-indexed
        const day = ('0' + parsedDate.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    return (
        <div className="rounded-xl shadow-2xl w-full bg-section-bg mob:bg-gray-100 p-8 mob:p-4 tablet:p-4 lap:p-4">
            <p className="font-bold text-3xl mob:text-3xl py-6">Add Employee</p>
            <form
                className="w-full grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 lap:grid-cols-3 desk:grid-cols-3 gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input label="First Name" type="text" {...register("first_name")} error={errors.first_name?.message} />
                <Input label="Last Name" type="text" {...register("last_name")} error={errors.last_name?.message} />
                <Input label="Date of Birth" type="date" {...register("date_of_birth")} error={errors.date_of_birth?.message} />
                <Input label="Work Email" type="text" {...register("work_email")} error={errors.work_email?.message} />
                <Dropdown
                    className="select-input"
                    label="Discipline"
                    isClearable
                    isLoading={isLoading}
                    options={formData.disciplines}
                    input_name="discipline_id"
                    control={control}
                    error={errors.discipline_id?.message}
                />
                <Dropdown
                    className="select-input"
                    label="Nationality"
                    isClearable
                    defaultValue="Lebanese"
                    options={nationalities}
                    input_name="nationality"
                    control={control}
                    error={errors.nationality?.message}
                />
                <Dropdown
                    className="select-input"
                    label="Country"
                    isClearable
                    defaultValue="Lebanon"
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
                    isLoading={isLoading}
                    options={formData.contractTypes}
                    handler={setSelectedContractId}
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
                    isLoading={isLoading}
                    options={formData.positions}
                    input_name="position_id"
                    control={control}
                    error={errors.position_id?.message}
                />
                <Dropdown
                    className="select-input"
                    label="Grade"
                    isClearable
                    isLoading={isLoading}
                    options={formData.grades}
                    input_name="grade_id"
                    control={control}
                    error={errors.grade_id?.message}
                />
                <Dropdown
                    className="select-input"
                    label="Role"
                    isClearable
                    isLoading={isLoading}
                    options={formData.roles}
                    input_name="role_id"
                    control={control}
                    error={errors.role_id?.message}
                />
                <Input label="Hourly Cost" type="number" {...register("employee_hourly_cost")} error={errors.employee_hourly_cost?.message} />
                <Input label="Major" type="text" {...register("major")} error={errors.major?.message} />
                <Input label="Years of Experience" type="text" {...register("years_of_experience")} error={errors.years_of_experience?.message} />
                <Dropdown
                    className="select-input"
                    label="Status"
                    isClearable
                    isLoading={isLoading}
                    options={formData.statuses}
                    input_name="status_id"
                    control={control}
                    error={errors.status_id?.message}
                />
                <div className="col-span-full">
                    <Button name="Submit" submit />
                </div>
            </form>
        </div>
    );
}

export default AddEmployee;
