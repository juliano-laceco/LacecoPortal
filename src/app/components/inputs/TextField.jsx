import React, { forwardRef } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const TextField = forwardRef(({ type, onChange, onKeyUp, onBlur, placeholder, className, label, error, disabled, loading, Icon, value, labelStyle, id, onClickIcon, min, max, onFocus }, ref) => {
    return (
        <>
            <div className='flex flex-col items-start gap-1 w-full'>
                {
                    label &&
                    <label className={`pr-3 md:mt-1 ${labelStyle} `}>{label}</label>

                }
                <div className='w-full'>
                    <div className={'border-1 flex items-center border-sec-c border-[1px] rounded-lg w-full bg-white' + ' ' + className}>
                        <input id={id} className='focus:outline-pric w-full p-2 rounded-lg'
                            type={type} onChange={onChange} onKeyUp={onKeyUp} ref={ref} placeholder={placeholder} onBlur={onBlur} disabled={disabled} value={value} min={min} max={max} onFocus={onFocus}
                        />
                        {
                            loading ? (
                                <ClipLoader
                                    loading={loading}
                                    size={19}
                                    color='black'
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                    className='mr-2'
                                />
                            ) : Icon && (
                                <div onClick={onClickIcon && onClickIcon} className={onClickIcon && ` cursor-pointer`}>
                                    <Icon className='mr-2 w-5' />
                                </div>
                            )

                        }
                    </div>

                    <div className='text-pric text-[1.5ex]  ml-1 '>{error}</div>
                </div>

            </div>
        </>
    )
}
)
export default TextField