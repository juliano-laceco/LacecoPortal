"use client"
import React from 'react';
import Button from "../custom/Button";
import Dropdown from "../custom/Dropdown";
import Input from "../custom/Input";
import nationalities from "@/static-data/nationalities";
import maritalStatuses from "@/static-data/marital-status";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";

function AddEmployee() {

    const schema = yup.object().shape({
        firstName: yup.string().required("First Name is a required field"),
        lastName: yup.string().required("Last Name is a required field"),
        dateOfBirth: yup.date().typeError("Date of Birth must be a valid date").max(new Date(), "Date of Birth cannot be in the future").required("Date of Birth is a required field"),
        workEmail: yup.string().email("Invalid email format").required("Work Email is a required field"),
        nationality: yup.object().nonNullable("Nationality is a required field").shape({
            value: yup.string().required("Nationality is a required field"), // Allow null values for the value property
        }),
        maritalStatus: yup.object().nonNullable("Marital Status is a required field").shape({
            value: yup.string().required("Marital Status is a required field"), // Allow null values for the value property
        }),
        hourlyCost: yup.number().typeError('Hourly Cost must be a number').required("Hourly Cost is a required field").positive("Hourly Cost must be a positive number"),
        major: yup.string().required("Major is a required field"),
        yearsOfExperience: yup.number().required("Years of Experience is a required field").min(0, "Years of Experience must be greater than or equal to 0").max(50, "Years of Experience must be less than or equal to 50")
    });

    const { handleSubmit, register, control, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        try {
            // Extract the value property from the selected maritalStatus object
            data.maritalStatus = data.maritalStatus.value;
            console.log(data);
        } catch (error) {
            console.error(error);
        }
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
                    <Controller
                        name="nationality"
                        control={control}
                        render={({ field }) => (
                            <Dropdown
                                label="Nationality"
                                options={nationalities}
                                value={field.value} // Pass the value prop
                                onChange={(value) => setValue("nationality", value)} // Set the value using setValue
                                error={errors.nationality?.message}
                            />
                        )}
                    />
                </div>
                <div>
                    <Controller
                        name="maritalStatus"
                        control={control}
                        defaultValue={maritalStatuses[0]}
                        render={({ field }) => (
                            <Dropdown
                                label="Marital Status"
                                options={maritalStatuses}
                                value={field.value}
                                onChange={(value) => setValue("maritalStatus", value)}
                                error={errors.maritalStatus?.message}
                            />
                        )}
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
                        type="number"
                        min="0"
                        max="50"
                        {...register("yearsOfExperience")}
                        error={errors.yearsOfExperience?.message}
                    />
                </div>
                <div className="col-span-full">
                    <input type="submit" name="Submit" />
                </div>
            </form>
        </div>
    );
}

export default AddEmployee;
