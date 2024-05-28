'use client';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Dropdown from '../custom/Dropdowns/DropdownLookup';
import Input from '../custom/Input';
import Form from '../custom/Form';
import Button from '../custom/Button';

// Leave options
const leaveOptions = [
    { value: 'annual', label: 'Annual Leave' },
    { value: 'sick', label: 'Sick Leave' },
    { value: 'casual', label: 'Casual Leave' },
];

// Validation schema
const schema = yup.object().shape({
    leaves: yup.array().of(
        yup.object().shape({
            leaveType: yup.string().required('Leave type is required'),
            leaveDate: 
            yup.date()
            .typeError("Leave Date must be a valid date")
            .required("Leave Date is required"),
        })
    ),
});

const LeaveSection = ({ remove, index, control, errors , register }) => {
    return (
        <div className="leave-section">
            <Dropdown
                className="select-input"
                label="Leave Type"
                options={leaveOptions}
                input_name={`leaves.${index}.leaveType`}
                control={control}
                error={errors?.leaves?.[index]?.leaveType?.message}
            />
            <Input
                type="date"
                label="Leave Date"
                name={`leaves.${index}.leaveDate`}
                control={control}
                error={errors?.leaves?.[index]?.leaveDate?.message}
                {...register(`leaves.${index}.leaveDate`)}
            />
            <button type="button" className="text-pric" onClick={() => index >= 1 && remove(index)}>
                Remove
            </button>
        </div>
    );
};

const LeaveForm = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        register
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            leaves: [{ leaveType: '', leaveDate: '' }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'leaves',
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <>

            <Form
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                submitText="Submit"
                submit
                AdditionalButton={<Button variant="secondary" size="medium" name="Add" onClick={() => append({ leaveType: '', leaveDate: '' })} className="w-fit"/>}
                columns={{ default: 1, mob: 1, tablet: 1, lap: 1, desk: 1 }}
           >
                {fields.map((field, index) => (
                    <LeaveSection
                        key={field.id}
                        remove={remove}
                        index={index}
                        control={control}
                        errors={errors}
                        register={register}
                    />
                ))}

            </Form>
        </>
    );
};

export default LeaveForm;