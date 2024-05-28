"use client";

import Button from "./Button";

function Form({
    title,
    children,
    handleSubmit,
    onSubmit,
    submitText,
    submit,
    isSubmitting,
    isDisabled,
    className,
    AdditionalButton,
    columns = { default: 1, mob: 1, tablet: 2, lap: 3, desk: 3 } // default column values
}) {

    const screens = {
        mob: { min: '320px', max: '480px' },
        tablet: { min: '481px', max: '768px' },
        lap: { min: '769px', max: '1024px' },
        desk: { min: '1025px', max: '3000px' }
    };

    const inlineGridCols = {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns.default}, minmax(0, 1fr))`,
        gap: '1rem',
    };

    const mediaStyles = Object.entries(screens).map(([key, value]) => {
        return `@media (min-width: ${value.min}) and (max-width: ${value.max}) {
            grid-template-columns: repeat(${columns[key]}, minmax(0, 1fr));
        }`;
    }).join(" ");

    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
        .responsive-grid {
            ${Object.entries(inlineGridCols).map(([key, value]) => `${key}: ${value};`).join(" ")}
            ${mediaStyles}
        }
    `;
    document.head.appendChild(styleElement);

    return (
        <>
            <div className={`rounded-xl shadow-2xl p-6 mob:p-4 tablet:p-4 lap:p-4 ${className}`}>
                {!!title && <p className="font-bold text-3xl mob:text-3xl py-6">{title}</p>}
                <form
                    className="responsive-grid"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {children}
                    <div className="flex items-center gap-2">
                        <div className="col-span-full">
                            <Button name={submitText} submit={submit} isDisabled={isDisabled || isSubmitting} />
                        </div>
                        {AdditionalButton}
                    </div>
                </form>
            </div>
        </>
    );
}

export default Form;
