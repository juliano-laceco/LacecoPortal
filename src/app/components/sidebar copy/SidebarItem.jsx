import React from 'react'
import { Link } from 'react-router-dom'

function SidebarItem({ item, Icon  , onClick}) {
    return (
        <>
            <Link to={item.redirectsTo} onClick={onClick}
                className='flex items-center gap-6 mb-4 p-2 hover:bg-[var(--hover-color)] text-[var(--icon-main-color)] cursor-pointer rounded-xl  overflow-hidden '>
                <Icon className="min-w-7 h-7 fill-white" />
                <div className='text-[var(--text-main-color)] font-semibold'>{item.label} </div>
            </Link>
        </>
    )
}

export default SidebarItem