"use client"

import { React, useState, useEffect } from 'react';
import Button from "../custom/Button";
import Dropdown from "../custom/Dropdown";
import Input from "../custom/Input";
import nationalities from "@/static-data/nationalities";
import maritalStatuses from "@/static-data/marital-status";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { getDisciplines, getContractTypes, getPositions, getGrades, getRoles } from '@/utilities/db-utils';


function AddEmployee() {

    const schema = yup.object().shape({
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
        dateOfBirth: yup.date().typeError("Date of Birth must be a valid date").max(new Date(), "Date of Birth cannot be in the future").required("Date of Birth is required"),
        workEmail: yup.string().email("Invalid email format").required("Work Email is required"),
        discipline: yup.string().required("Discipline is required"),
        nationality: yup.string().required("Nationality is required"),
        maritalStatus: yup.string().required("Marital Status is required"),
        contractType: yup.string().required("Contract Type is required"),
        position: yup.string().required("Position is required"),
        grade: yup.string().required("Grade is required"),
        role: yup.string().required("Role is required"),
        hourlyCost: yup.number().typeError('Hourly Cost must be a number').required("Hourly Cost is required").positive("Hourly Cost must be a positive number"),
        major: yup.string().required("Major is required"),
        yearsOfExperience: yup.number().typeError('Years of Experience must be a number').required("Years of Experience is required").min(0, "Years of Experience must be greater than or equal to 0").max(50, "Years of Experience must be less than or equal to 50")
    });

    const { handleSubmit, register, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [isLoading, setIsLoading] = useState(true)
    const [disciplines, setDisciplines] = useState([])
    const [contract_types, setContractTypes] = useState([])
    const [positions, setPositions] = useState([])
    const [grades, setGrades] = useState([])
    const [roles, setRoles] = useState([])

    useEffect(() => {

        const fetchData = async () => {

            // Fetching Disciplines
            const disciplinesRes = await getDisciplines()
            setDisciplines(disciplinesRes.data ?? [])

            // Fetching Contract Types
            const contractsTypesRes = await getContractTypes()
            setContractTypes(contractsTypesRes.data ?? [])

            // Fetching Positions
            const positionsRes = await getPositions()
            setPositions(positionsRes.data ?? [])

            // Fetching Grades
            const gradesRes = await getGrades()
            setGrades(gradesRes.data ?? [])

            // Fetching Roles
            const rolesRes = await getRoles()
            setRoles(rolesRes.data ?? [])

            setIsLoading(false)
        }
        fetchData()

    }, [])

    const onSubmit = async (data) => {
        console.log(data)
    };

    return (
        <div className="p-4">
            <form
                className="w-full grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 lap:grid-cols-3 desk:grid-cols-3 gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <Input
                        label="First Name"
                        type="text"
                        {...register("firstName")}
                        error={errors.firstName?.message}
                    />
                </div>
                <div>
                    <Input
                        label="Last Name"
                        type="text"
                        {...register("lastName")}
                        error={errors.lastName?.message}
                    />
                </div>
                <div>
                    <Input
                        label="Date of Birth"
                        type="date"
                        {...register("dateOfBirth")}
                        error={errors.dateOfBirth?.message}
                    />
                </div>
                <div>
                    <Input
                        label="Work Email"
                        type="text"
                        {...register("workEmail")}
                        error={errors.workEmail?.message}
                    />
                </div>
                <div>
                    <Dropdown
                        className='select-input'
                        label="Discipline"
                        placeholder="Select Language"
                        isClearable
                        isLoading={isLoading}
                        options={disciplines}
                        input_name="discipline"
                        control={control}
                        error={errors.discipline?.message}
                    />
                </div>
                <div>
                    <Dropdown
                        className='select-input'
                        label="Nationality"
                        placeholder="Select Language"
                        isClearable
                        defaultValue="Saudi"
                        options={nationalities}
                        input_name="nationality"
                        control={control}
                        error={errors.nationality?.message}
                    />
                </div>
                <div>
                    <Dropdown
                        className='select-input'
                        label="Marital Status"
                        placeholder="Select Language"
                        isClearable
                        options={maritalStatuses}
                        input_name="maritalStatus"
                        control={control}
                        error={errors.maritalStatus?.message}
                    />
                </div>
                <div>
                    <Dropdown
                        className='select-input'
                        label="Contract Type"
                        placeholder="Select Language"
                        isClearable
                        isLoading={isLoading}
                        options={contract_types}
                        input_name="contractType"
                        control={control}
                        error={errors.contractType?.message}
                    />
                </div>
                <div>
                    <Dropdown
                        className='select-input'
                        label="Position"
                        placeholder="Select Language"
                        isClearable
                        isLoading={isLoading}
                        options={positions}
                        input_name="position"
                        control={control}
                        error={errors.position?.message}
                    />
                </div>
                <div>
                    <Dropdown
                        className='select-input'
                        label="Grade"
                        placeholder="Select Language"
                        isClearable
                        isLoading={isLoading}
                        options={grades}
                        input_name="grade"
                        control={control}
                        error={errors.grade?.message}
                    />
                </div>
                <div>
                    <Dropdown
                        className='select-input'
                        label="Role"
                        placeholder="Select Language"
                        isClearable
                        isLoading={isLoading}
                        options={roles}
                        input_name="role"
                        control={control}
                        error={errors.role?.message}
                    />
                </div>
                <div>
                    <Input
                        label="Hourly Cost"
                        type="number"
                        {...register("hourlyCost")}
                        error={errors.hourlyCost?.message}
                    />
                </div>
                <div>
                    <Input
                        label="Major"
                        type="text"
                        {...register("major")}
                        error={errors.major?.message}
                    />
                </div>
                <div>
                    <Input
                        label="Years of Experience"
                        type="text"
                        {...register("yearsOfExperience")}
                        error={errors.yearsOfExperience?.message}
                    />
                </div>


                <div className="col-span-full">
                    <Button name="Submit" submit />
                </div>
            </form >
        </div>
    );
}

export default AddEmployee;
