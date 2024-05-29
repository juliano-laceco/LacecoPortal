"use client"

import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import Image from "next/image"

const Modal = ({ open = false, type, title, newPath, onClose, children, className }) => {

    const router = useRouter()
    function closeServerSide() {
        router.push(newPath)
        router.refresh()
    }

    return createPortal(
        <>
            {open &&
                <>
                    <div className='absolute bg-black w-screen flex justify-center items-center h-screen bg-opacity-30 overflow-auto' >
                        <div
                            className={`fixed bg-white border shadow-2xl rounded-lg opacity-100 overflow-y-auto transition-all duration-500 z-30 max-w-[70ex] max-h-screen min-h-fit ${className}`}
                        >
                            <div onClick={type == "server" ? closeServerSide : onClose} className="w-full bg-white flex items-center justify-between p-4">
                                <p className="font-bold text-3xl px-2">{title}</p>
                                <Image height="40" width="40" src="/resources/icons/close.svg" className="cursor-pointer" />
                            </div>
                            {
                                <div className={`transition-all overflow-auto duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}>
                                    {children}
                                </div>
                            }
                        </div>
                    </div>
                </>
            }
        </>,
        document.querySelector("body")
    )
}

export default Modal