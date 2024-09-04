'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Form from '../../custom/Other/Form';
import Button from '../../custom/Other/Button';
import { formatDate } from '@/utilities/date/date-utils';
import { createLeave } from '@/utilities/leave/leave-utils';
import { showToast } from '@/utilities/toast-utils';
import { useRouter } from 'next/navigation';
import LeaveItem from './LeaveItem';
import { logError } from '@/utilities/misc-utils';

// Validation schema
const schema = yup.object().shape({
    leaves: yup.array().of(
        yup.object().shape({
            leave_type_id: yup.string().required('Leave type is required'),
            leave_date: yup.date()
                .typeError("Leave Date must be a valid date")
                .required("Leave Date is required"),
            no_of_hours: yup.number()
                .required("No. of Hours is required")
                .transform((curr, orig) => (orig === "" ? null : curr))
                .positive("No. of Hours must be positive")
                .max(8.5, "No. of Hours is limited to 8.5")
        })
    ),
});


const LeaveForm = ({ leaveTypesOptions, employee_id, newPath }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        register
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            leaves: [{ leave_type_id: '', leave_date: '', no_of_hours: '' }],
        },
    });

    const router = useRouter()

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'leaves',
    });

    const onSubmit = async (data) => {
        try {
            const processedData = preprocessData(data.leaves);
            const result = await createLeave(processedData);

            const messagePrefix = `Leave${processedData.length > 1 ? "s" : ""}`;
            const successMessage = `${messagePrefix} Submitted Successfully`;
            const errorMessage = `Error Occurred while submitting ${messagePrefix}`;

            if (result.res) {
                showToast("success", successMessage);
            } else {
                showToast("failed", errorMessage);
            }
            router.replace(newPath); 
        } catch (error) {
            await logError(error, "Error submitting leave")
            showToast("failed", "An unexpected error occurred. Please try again later.");
        }
    };

    function preprocessData(data) {
        return data.map((leave) => {
            leave.leave_date = formatDate(leave.leave_date);
            return { ...leave, employee_id };
        });
    }

    return (
        <>
            <Form
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                submitText="Submit"
                submit
                AdditionalButton={<Button variant="secondary" size="medium" name="Add" onClick={() => append({ leave_type_id: '', leave_date: '', no_of_hours: '' })} className="shadow-none" />}
                columns={{ default: 1, mob: 1, tablet: 1, lap: 1, desk: 1 }}
            >
                {fields.map((field, index) => (
                    <LeaveItem
                        key={field.id}
                        remove={remove}
                        index={index}
                        control={control}
                        errors={errors}
                        register={register}
                        leaveTypesOptions={leaveTypesOptions}
                    />
                ))}
            </Form>
        </>
    );
};



export default LeaveForm;
