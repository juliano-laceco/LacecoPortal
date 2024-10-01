import { forwardRef } from 'react';

const Input = forwardRef(
    (
        {
            type,
            onChange,
            onKeyUp,
            onKeyDown,
            onBlur,
            placeholder,
            className,
            label,
            error = false,
            isDisabled = false,
            Icon,
            value,
            labelStyle,
            id,
            onClickIcon,
            min,
            max,
            onFocus,
            ltr = true,
            fit = false,
            ...rest
        },
        ref
    ) => {
        const baseClasses = 'border-1 rounded-md p-2 w-full border-input-b bg-input-bg';
        const inputClasses = `focus:ring-0 focus:border-pric focus:outline-none p-1 rounded-md ${!!Icon ? `p${ltr ? "r" : "l"}-12` : ""}`;
        const labelClasses = `pr-3 mob:mt-1 ${!!labelStyle ? labelStyle : ""}`;
        const errorClasses = 'text-pric text-[1.5ex] ml-1 min-h-5';

        return (
            <div className={`flex flex-col items-start gap-[3px] ${fit ? "w-fit" : "w-full"}`}>
                {!!label && <label className={`mob:text-base tablet:text-base lap:text-base desk:text-base ${labelClasses}`}>{label}</label>}
                <div className={`${fit ? "w-fit" : "w-full"} flex relative`}>
                    <input
                        id={id}
                        className={`${baseClasses} ${inputClasses} mob:text-sm tablet:text-sm lap:text-base desk:text-base mob:p-[10px] tablet:p-[10px] ${!!isDisabled ? (isDisabled && 'bg-input-dis opacity-80 cursor-not-allowed') : "hover:border-pric"} ${!!className ? className : ""}`}
                        type={type}
                        onChange={onChange}
                        onKeyUp={onKeyUp}
                        onKeyDown={onKeyDown}
                        ref={ref}
                        placeholder={placeholder}
                        onBlur={onBlur}
                        disabled={isDisabled}
                        value={value}
                        min={min}
                        max={max}
                        onFocus={onFocus}
                        {...rest}
                    />
                    {!!Icon && (
                        <div
                            onClick={!!onClickIcon && onClickIcon}
                            className={`absolute bg-input-bg  ${ltr ? "right-2" : "left-2"} top-1/2 transform -translate-y-1/2 cursor-pointer ${!!onClickIcon && 'hover:opacity-70'}`}
                        >
                            {Icon}
                        </div>
                    )}
                </div>
                <div className={errorClasses}>{!!error && error}</div>
            </div>
        );
    }
);

Input.displayName = "Input"

export default Input;
