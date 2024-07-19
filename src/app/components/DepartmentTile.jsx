import Image from "next/image"

function DepartmentTile({ icon_name, department_name, percentage }) {
    return (
        <div className="flex gap-3 items-center p-1 ">
            <div className="h-10 w-10 bg-pric flex justify-center rounded-md items-center">
                <Image src={`/resources/icons/${icon_name}.png`} height="20" width="20" alt="dep-icon" />
            </div>
            <div className="flex flex-col" >
                <p className="text-base font-bold">{percentage}%</p>
                <p className="text-slate-500 text-base">{department_name}</p>
            </div>
        </div>
    )
}

export default DepartmentTile
