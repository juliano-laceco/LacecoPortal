import React from 'react'

function TitleComponent({ children }) {
    return (
        <div className="select-none w-full flex items-center bg-gray-400 text-white shadow-xl p-5 text-3xl font-semibold rounded-md mob:text-xl mob:p-3 tablet:text-xl tablet:p-3">
            {children}
        </div>
    )
}

export default TitleComponent