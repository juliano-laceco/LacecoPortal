import Image from "next/image"

function DepartmentTile({ icon_name, department_name, percentage }) {
    return (
        <div className="flex gap-3 items-center bg-white p-2 rounded-md shadow-xl">
            <div className="h-12 w-12 bg-pric flex justify-center rounded-md items-center">
                <Image src={`/resources/icons/${icon_name}.png`} height="25" width="25" />
            </div>
            <div className="flex flex-col" >
                <p className="text-xl font-bold">{percentage}%</p>
                <p className="text-slate-500 text-lg">{department_name}</p>
            </div>
        </div>
    )
}

export default DepartmentTile
