import React, { forwardRef } from 'react'

const TextArea = forwardRef(({ onChange, onKeyUp, placeholder, className, error, label }, ref) => {

    return (
        <div className='flex flex-col items-start gap-1 w-full'>
            <label className='pr-3 md:mt-1'>{label}</label>
            <div className='w-full'>
                <textarea className={'border-1 p-2 focus-visible:outline-none border-[var(--input-border-color)] border-[1px] rounded-lg w-full' + ' ' + className}
                    placeholder={placeholder} onChange={onChange} onKeyUp={onKeyUp} ref={ref}>
                </textarea>
                <div className='text-[var(--error-color)] text-[1.5ex]  ml-1 '>{error}</div>

            </div>
        </div>
    )
}

)
export default TextArea