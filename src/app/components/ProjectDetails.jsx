import Link from 'next/link';
import Image from 'next/image';
import EmployeeNameCard from './EmployeeNameCard';
import StatTile from './StatTile';

const ProjectDetails = ({
    project_data,
    phase_data
}) => {

    const { project_id, title, code, first_name, last_name, position_name, percentJuniors } = project_data

    const total_budget_hours = phase_data?.reduce((accumulator, phase) => {
        return accumulator + phase.expected_work_hours;
    }, 0);

    return (
        <div className="space-y-6">
            <div className="w-full flex items-center gap-5 bg-gray-400 shadow-xl p-5 rounded-md">
                <Link title="Edit Project" href={`/planning/project/${project_id}`}>
                    <Image
                        src="/resources/icons/edit.svg"
                        height="35"
                        width="35"
                        alt="edit"
                    />
                </Link>
                <h1 className="font-bold text-5xl text-white flex items-center gap-6">
                    {title} <i className="text-lg text-black font-semibold"> Code : {code} </i>
                </h1>
            </div>
            <div className="flex flex-wrap gap-5 select-none">
                <EmployeeNameCard name={first_name + " " + last_name} position={position_name} />
                <StatTile data={{ val: total_budget_hours, label: "Budget Hours" }} />
                <StatTile
                    data={{
                        val:
                            <p className="text-3xl text-red-500 font-semibold"> {0} </p>
                        ,
                        label: "Variance"
                    }} />
                <StatTile
                    data={[
                        {
                            val: percentJuniors + "%"
                            ,
                            label: "Juniors"
                        },
                        {
                            val: 100 - percentJuniors + "%"
                            ,
                            label: "Seniors"
                        }
                    ]}

                    type="multi"
                />
            </div>
        </div>
    );
};

export default ProjectDetails;
