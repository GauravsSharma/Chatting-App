import React from 'react'
import User from '../user/User'

const TextMssg = ({isOwnMessage,data,time}) => {
  return (
    <div className={`message w-[100%] h-auto p-2 flex`}>
    {
      !isOwnMessage && <User imgURL={data.imgURL} />
    }
    <div className={`h-full w-full   flex items-center ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div className={`message  max-w-[65%] h-full flex flex-col items-start justify-center p-2 ${isOwnMessage ? "bg-[#023047] text-white rounded-t-xl rounded-tr-xl rounded-bl-xl" : "bg-white border shadow-xl text-black rounded-tr-xl rounded-br-xl rounded-bl-xl"}`}>
        <p className='bg-transparent text-sm font-semibold h-[70%]'>{data.message}</p>
        {
          !isOwnMessage ? <div className='h-[30%] text-[11px] w-full flex justify-between items-center'>
            <p className=' h-full'>{data.userName}</p>
            <p className='font-normal ml-1'>{time}</p>
          </div> : <p className='text-[11px]'>{time}</p>
        }
      </div>
    </div>
    {/* {setPrev(data.userName)} */}
  </div>
  )
}

export default TextMssg