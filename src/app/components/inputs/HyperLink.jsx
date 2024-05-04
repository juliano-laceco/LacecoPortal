import React from 'react'

function HyperLink({onClick , name}) {
    return (
        <div className='hover:underline underline-offset-2 cursor-pointer' onClick={() => onClick()}>
            {name}
        </div>
    )
}

export default HyperLink