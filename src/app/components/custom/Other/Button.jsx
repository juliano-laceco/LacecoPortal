"use client"

import { ClipLoader } from 'react-spinners'; // Assuming ClipLoader import
import { theme } from "../../../../../tailwind.config";

function Button({
    name,
    onClick,
    className = '',
    variant = 'primary', // Default variant
    size = 'medium', // Default size
    loading = false,
    isDisabled = false,
    Icon = null,
    ltr = true,// Default direction
    submit = false

}) {

    const baseClasses = `rounded-[4px] ${(loading || isDisabled) && "opacity-60 cursor-not-allowed"} transition-all h-fit duration-200 flex justify-center items-center`
    const sizeClasses = {
        small: `
            min-w-[9ex] p-2 text-xs 
            mob:min-w-[9.5ex] mob:p-2
            tablet:min-w-[10ex] ${!!Icon && "tablet:p-1"}
            lap:min-w-[10ex] lap:p-2 
            desk:min-w-[12ex] ${!!Icon && "desk:p-2"}
        `,
        medium: `
            min-w-[12ex] ${loading ? "p-3" : "p-2"} text-base 
            mob:min-w-[8ex] ${loading && "mob:p-[7px]"} mob:text-sm 
            tablet:min-w-[11ex] tablet:text-base 
            lap:min-w-[11ex] 
            desk:min-w-[12ex] desk:text-base
        `,
        large: `
            min-w-[17ex] ${loading ? "p-4" : "p-3"} text-lg 
            mob:min-w-[13ex] mob:p-3 mob:text-base 
            tablet:min-w-[14ex] tablet:text-lg 
            lap:min-w-[15ex] lap:text-lg 
            desk:min-w-[18ex] desk:text-xl
        `,
    };

    const variantClasses = {
        primary: `bg-pric text-pri-but-txtc border-[1px] border-pri-butb ${!isDisabled && "hover:bg-pri-hovc"}`,
        secondary: `bg-sec-c text-sec-txtc border-[1px] border-sec-butb  ${!isDisabled && "hover:bg-sec-hovc"}`,
        plain: 'text-white',
    };

    const loadingColor = variant === "secondary" ? theme.extend.colors["sec-but-txtc"] : "white"

    const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

    return (
        <button type={`${submit ? "submit" : "button"}`} disabled={loading || isDisabled} onClick={onClick} className={combinedClasses}>
            {loading ? (
                <ClipLoader loading={loading} size={17} color={loadingColor} aria-label="Loading Spinner" data-testid="loader" />
            ) : (
                <div className={`flex ${ltr ? 'flex-row-reverse' : ''} items-center gap-2 justify-center `}>
                    <div>{name}</div>
                    {!!Icon && <Icon className={`w-5 fill-white mob:w-3 tablet:w-4 lap:w-5`} />}
                </div>
            )}
        </button>
    );
};



export default Button
