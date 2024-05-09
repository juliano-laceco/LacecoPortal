"use client"

import React from 'react'
import { ClipLoader } from 'react-spinners'; // Assuming ClipLoader import
import { theme } from "../../../../tailwind.config";
import { mobileStepperClasses } from '@mui/material';

function Button({
    name,
    onClick,
    className = '',
    variant = 'primary', // Default variant
    size = 'medium', // Default size
    loading = false,
    disabled = false,
    Icon = null,
    ltr = true, // Default direction
}) {
    const baseClasses = `rounded-[4px] ${(loading || disabled) && "opacity-70 cursor-not-allowed"} transition-all h-fit duration-200 flex justify-center items-center`;

    const sizeClasses = {
        small: `
            min-w-[10ex] p-2 text-xs 
            mob:min-w-[9ex]
            tablet:min-w-[10ex] 
            lap:min-w-[10ex]  // Decreased by 1 for lap
            desk:min-w-[12ex]
        `,
        medium: `
            min-w-[13ex] ${loading ? "p-3" : "p-2"} text-base 
            mob:min-w-[10ex] ${loading && "mob:p-[10px]"} mob:text-sm 
            tablet:min-w-[12ex] tablet:text-base 
            lap:min-w-[12ex]  // Decreased by 1 for lap
            desk:min-w-[15ex] desk:text-lg
        `,
        large: `
            min-w-[17ex] ${loading ? "p-4" : "p-3"} text-lg 
            mob:min-w-[13ex] mob:p-3 mob:text-base 
            tablet:min-w-[14ex] tablet:text-lg 
            lap:min-w-[15ex] lap:text-lg  // Decreased by 1 for lap
            desk:min-w-[18ex] desk:text-xl
        `,
    };

    const variantClasses = {
        primary: 'bg-pric text-pri-but-txtc border-[1px] border-pri-butb hover:bg-pri-hovc',
        secondary: 'bg-sec-c text-sec-txtc border-[1px] border-sec-butb hover:bg-sec-hovc',
        plain: 'text-white',
    };

    const loadingColor = variant === "secondary" ? theme.extend.colors["sec-but-txtc"] : "white"

    const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

    return (
        <button type="button" disabled={loading || disabled} onClick={onClick} className={combinedClasses}>
            {loading ? (
                <ClipLoader loading={loading} size={18} color={loadingColor} aria-label="Loading Spinner" data-testid="loader" />
            ) : (
                <div className={`flex ${ltr ? 'flex-row-reverse' : ''} items-center gap-2 justify-center `}>
                    <div>{name}</div>
                    {!!Icon && <Icon className={`w-5 fill-white mob:w-3`} />}
                </div>
            )}
        </button>
    );
};



export default Button
