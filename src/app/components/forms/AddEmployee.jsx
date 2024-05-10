import Dropdown from "../custom/Dropdown"
import Input from "../custom/Input"
import nationalities from "@/static-data/nationalities"

function AddEmployee() {
    return (
        <div className="p-4">
            <form className="w-full grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 lap:grid-cols-3 desk:grid-cols-3 gap-4">

                <div>
                    <Input
                        label="First Name"
                        type="text"
                    />
                </div>
                <div>
                    <Input
                        label="Last Name"
                        type="text"
                    />
                </div>
                <div>
                    <Input
                        label="Date of Birth"
                        type="date"
                        placeholder="Enter laptop number"
                    />
                </div>
                <div>
                    <Input
                        label="Work Email"
                        type="text"
                    />
                </div>
                <div>
                   <Dropdown options={nationalities} />
                </div>
                <div className="col-span-full">
                    <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddEmployee
