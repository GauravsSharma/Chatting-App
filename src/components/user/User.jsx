import React from 'react'

const User = ({imgURL}) => {
    return (
        <div className='h-9 className="w-[10%] mr-1 rounded-full overflow-hidden'>
            <img src={imgURL} alt="" className='w-full h-full' />
        </div>
    )
}

export default User