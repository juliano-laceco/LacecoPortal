import React from 'react'
import RigthArrow from '../../assets/icons/RigthArrow'
import LeftArrow from '../../assets/icons/LeftArrow'

function SidebarHeader({ handelSidebar, collapseSidebar }) {
    return (
        <div className='flex items-end flex-col justify-between mb-5'>
            <div className='ml-1 bg-[var(--secondary-color)] text-[var(--text-main-color)] rounded-full p-1'>
                {
                    collapseSidebar ? (
                        <RigthArrow className="min-w-5 min-h-5 cursor-pointer fill-white " onClick={handelSidebar} />
                        // <div  className="min-w-5 min-h-5 cursor-pointer" onClick={handelSidebar} >x</div>

                    ) : (
                        <LeftArrow className="min-w-5 min-h-5 cursor-pointer  fill-white" onClick={handelSidebar} />
                        // <div className="min-w-5 min-h-5 cursor-pointer" onClick={handelSidebar}  >y</div>

                    )
                }
            </div>
        </div>
    )
}

export default SidebarHeader