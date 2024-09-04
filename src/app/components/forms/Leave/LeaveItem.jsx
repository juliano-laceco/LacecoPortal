import DropdownLookup from "../../custom/Dropdowns/DropdownLookup";
import Input from "../../custom/Other/Input";

const LeaveItem = ({ remove, index, control, errors, register, leaveTypesOptions }) => {
    return (
        <div className="leave-item">
            <DropdownLookup
                className="select-input"
                label="Leave Type"
                options={leaveTypesOptions}
                input_name={`leaves.${index}.leave_type_id`}
                control={control}
                error={errors?.leaves?.[index]?.leave_type_id?.message}
            />
            <Input
                type="date"
                label="Leave Date"
                name={`leaves.${index}.leave_date`}
                control={control}
                error={errors?.leaves?.[index]?.leave_date?.message}
                {...register(`leaves.${index}.leave_date`)}
            />
            <Input
                type="number"
                min={0}
                max={8.5}
                label="No. Of Hours"
                name={`leaves.${index}.no_of_hours`}
                control={control}
                error={errors?.leaves?.[index]?.no_of_hours?.message}
                {...register(`leaves.${index}.no_of_hours`)}
            />
            <button type="button" className="text-pric" onClick={() => index >= 1 && remove(index)}>
                Remove
            </button>
        </div>
    );
};

export default LeaveItem ;