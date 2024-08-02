import Image from "next/image"

function StatTile({ type = "single", data, image_url }) {
    return (


        type == "single" ?
            (
                <div className="py-4 px-6 w-fit bg-white rounded-xl shadow-2xl space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                    {image_url && <Image src={image_url} height="40" width="40" alt="icon" />}
                    < div className="text-center space-y-2 sm:text-left" >
                        <div className="">
                            <p className="text-3xl text-black font-semibold">{data.val}</p>
                            <p className="text-slate-500 font-medium">{data.label}</p>
                        </div>
                    </div>
                </div >
            ) : (
                <div className="py-4 px-6 w-fit bg-white rounded-xl shadow-2xl space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                    <div className="text-center flex gap-4 justify-center items-center sm:text-left">

                        {data.map((item, index) => {
                            return <>
                                <div className="space-y-0.5">
                                    <p className="text-2xl text-center font-semibold mx-auto"> {item.val} </p>
                                    <p className="text-slate-500 font-medium">{item.label}</p>
                                </div>
                                {index != data.length - 1 && < div className="h-12 w-[2px] rounded-lg bg-gray-400"></div >}
                            </>
                        })
                        }
                    </div>
                </div >
            )
    )
}

export default StatTile
