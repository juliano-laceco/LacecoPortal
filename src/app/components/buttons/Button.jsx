"use client"

import React, { useState, useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

function Button({ name, onClick, className, primary, secondary, plain, small, medium, large, loading, Icon, type }) {
    const [style, setStyle] = useState('')
    const [disabled, setDisabled] = useState()

    useEffect(() => {
        primary && setStyle("bg-primary text-white  hover:bg-bg-primary-h")
        secondary && setStyle("bg-secondary border-secondary-border border-[1px] text-white hover:text-[var(--secondary-button-text-color-h)] hover:bg-[var(--secondary-button-bg-color-h)]")
        plain && setStyle("text-white")
        small && setStyle(prevStyle => `${prevStyle} min-w-[10ex] p-1`)
        medium && setStyle(prevStyle => `${prevStyle} min-w-[15ex] p-2`)
        large && setStyle(prevStyle => `${prevStyle} min-w-[20ex] text-2xl p-3`)
        loading ? setDisabled('disabled') : setDisabled('')
    }, [small, medium, large, primary, secondary])

    return (
        <>
            <button type={type} onClick={onClick} className={`rounded-md transition-all duration-200 ${className} ${style}`} disabled={disabled}>
                {
                    loading ? (
                        <ClipLoader
                            loading={loading}
                            size={19}
                            color='white'
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    ) :
                        <div className={`flex items-center gap-3 justify-center ${large ? "text-lg" : "text-md"}`}> {name} {Icon && <Icon className='w-5 fill-white' />}</div>

                }

            </button>
        </>
    )
}

export default Button
