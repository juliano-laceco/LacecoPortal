import React, { useState } from 'react'
import SidebarItem from './SidebarItem';
import SidebarHeader from './SidebarHeader';
import Logo from '../Logo';
import { Link } from 'react-router-dom';
import LogoutIcon from '../../assets/icons/LogoutIcon'
import { logout } from '../../utils/client'
import BackupIcon from '../../assets/icons/BackupIcon';
import axiosClient from '../../axiosClient';

function Sidebar({ sidebarItems, backup }) {
    const bigSidbar = 'lg-sidebar'
    const smallSidebar = 'sm-sidebar'

    const [sidebarWidth, setSidebarWidth] = useState(smallSidebar)
    const [collapseSidebar, setCollapseSidebar] = useState(true)
    const [collapseButtonActive, setCollapseButtonActive] = useState(true)

    const handelSidebar = () => {
        if (collapseSidebar) {
            setSidebarWidth(bigSidbar)
        } else {
            setSidebarWidth(smallSidebar)
        }
        setCollapseSidebar(!collapseSidebar)
    }

    const handelCollapseButton = () => {
        setCollapseButtonActive(!collapseButtonActive)
        handelSidebar()
    }

    return (
        <div className={"bg-[var(--main-color)] " + sidebarWidth + " h-screen p-3 transition-all duration-500 flex flex-col justify-between "}>
            <div>
                <SidebarHeader handelSidebar={handelSidebar} collapseSidebar={collapseSidebar} />

                <Link to={'/home'}>
                    <Logo className={'mb-5 ml-[3px]'} logoSize={'w-11'} />
                </Link>

                {
                    sidebarItems.map((item) => (
                        <SidebarItem key={item.id} Icon={item.icon} item={item} />
                    ))
                }
            </div>

            <div>
                <SidebarItem Icon={BackupIcon} item={{
                    label: 'Backup'
                }}
                    onClick={() => backup()}
                />
                <SidebarItem Icon={LogoutIcon} item={{
                    label: 'Logout'
                }}
                    onClick={() => logout()}
                />
            </div>
        </div>
    )
}

export default Sidebar