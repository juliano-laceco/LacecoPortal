"use client"

import Button from "./Button"

function Form({ title, children, handleSubmit, onSubmit, submitText, submit, isSubmitting, isDisabled }) {

    return (
        <>
            <div className="rounded-xl shadow-2xl w-full bg-section-bg mob:bg-gray-100 p-8 mob:p-4 tablet:p-4 lap:p-4">
                <p className="font-bold text-3xl mob:text-3xl py-6">{title}</p>
                <form
                    className="w-full grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 lap:grid-cols-3 desk:grid-cols-3 gap-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {children}
                    <div className="col-span-full">
                        <Button name={submitText} submit={submit} isDisabled={isDisabled || isSubmitting} />
                    </div>
                </form>
            </div>
        </>
    );
}

export default Form
