import Image from "next/image"

function DepartmentTile({ icon_name, department_name, percentage }) {
    return (
        <div className="flex gap-3 bg-white p-3 rounded-md shadow-xl">
            <div className="h-16 w-16 bg-pric flex justify-center rounded-md items-center">
                <Image src={`/resources/icons/${icon_name}.png`} height="35" width="35" />
            </div>
            <div className="flex flex-col" >
                <p className="text-2xl font-bold">{percentage}%</p>
                <p className="text-slate-500 text-xl">{department_name}</p>
            </div>
        </div>
    )
}

export default DepartmentTile
