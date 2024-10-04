import Image from "next/image"

function StatTile({ type = "single", data, image_url, shadow = false }) {
    return (
        type == "single" ?
            (
                <div className={`py-2 px-5 w-fit mt-1 h-full flex-nowrap bg-white rounded-xl space-y-2 mob:flex mob:items-center mob:space-y-0 mob:space-x-6 mob:py-2 mob:px-3 ${shadow ? "shadow-2xl" : ""}`}>
                    {image_url && <Image src={image_url} height="40" width="40" alt="icon" />}
                    <div className="text-center mt-[8px]" >
                        <div className="flex flex-col justify-between">
                            <div className="text-2xl text-black font-semibold mob:text-xl">{data.val}</div>
                            <div className="text-slate-500  mob:text-sm">{data.label}</div>
                        </div>
                    </div>
                </div >
            ) : (
                <div className={`py-2 px-5 w-fit mt-1 h-full bg-white  flex-nowrap rounded-xl space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 ${shadow ? "shadow-2xl" : ""}`}>
                    <div className="text-center flex gap-4 justify-center items-center sm:text-left">
                        {data.map((item, index) => {
                            return <>
                                <div className="text-center">
                                    <div className="text-2xl text-center font-semibold mx-auto  mob:text-xl"> {item.val} </div>
                                    <div className="text-slate-500 font-medium mob:text-sm">{item.label}</div>
                                </div>
                                {index != data.length - 1 && <div className="h-12 w-[2px] rounded-lg bg-gray-400"></div>}
                            </>
                        })
                        }
                    </div>
                </div >
            )
    )
}

export default StatTile
