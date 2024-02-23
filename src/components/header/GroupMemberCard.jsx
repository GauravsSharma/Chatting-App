import React from 'react'

function GroupMemberCard({name,url}) {
  
  return (
    <div className='w-full h-16 bg-slate-100 flex gap-2 my-2 rounded-md shadow-lg justify-center items-center px-3'>
        <div className=' w-[15%] rounded-full  overflow-hidden'>
            <img src={url} alt={name}/>
        </div>
        <div className=' w-[85%] font-semibold text-lg'>
            {name}
        </div>
    </div>
  )
}

export default GroupMemberCard