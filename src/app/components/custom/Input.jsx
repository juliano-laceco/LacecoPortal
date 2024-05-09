import React, { forwardRef } from 'react';

const Input = forwardRef(
    (
        {
            type,
            onChange,
            onKeyUp,
            onBlur,
            placeholder,
            className,
            label,
            error = false,
            disabled = false,
            Icon,
            value,
            labelStyle,
            id,
            onClickIcon,
            min,
            max,
            onFocus,
            fit = false
        },
        ref
    ) => {
        const baseClasses = 'border-1 rounded-md p-2 w-full border-input-b bg-input-bg';
        const inputClasses = `focus:ring-0 focus:border-pric g p-1 rounded-md ${!!Icon && "pl-12"}`;
        const labelClasses = `pr-3 mob:mt-1 ${!!labelStyle && labelStyle}`;
        const errorClasses = 'text-pric text-[1.5ex] ml-1';

        return (
            <div className={`flex flex-col items-start gap-[3px] ${fit ? "w-fit" : "w-full"}`}>
                {!!label && <label className={`mob:text-xs tablet:text-sm lap:text-base desk:text-base ${labelClasses}`}>{label}</label>}
                <div className={`${fit ? "w-fit" : "w-full"} flex relative`}>
                    <input
                        id={id}
                        className={`${baseClasses} ${inputClasses} mob:text-xs tablet:text-sm lap:text-base desk:text-base ${!!disabled ? (disabled && 'bg-input-dis opacity-80 cursor-not-allowed') : ""} ${!!className ? className : ""}`}
                        type={type}
                        onChange={onChange}
                        onKeyUp={onKeyUp}
                        ref={ref}
                        placeholder={placeholder}
                        onBlur={onBlur}
                        disabled={disabled}
                        value={value}
                        min={min}
                        max={max}
                        onFocus={onFocus}
                    />
                    {!!Icon && (
                        <div
                            onClick={!!onClickIcon && onClickIcon}
                            className={`absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer ${!!onClickIcon && 'hover:opacity-70'}`}
                        >
                            <Icon className="w-5 h-5 mob:w-3 mob:w-5" />
                        </div>
                    )}
                </div>
                {error && <div className={errorClasses}>{error}</div>}
            </div>
        );
    }
);

export default Input;
