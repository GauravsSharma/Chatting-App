import React, { useEffect, useState } from 'react'
import { IoSend } from "react-icons/io5";
import { MdAttachFile } from "react-icons/md";
import { BsEmojiSunglasses } from "react-icons/bs";
import Emoji from './Emoji';
import { useSocket } from '../../providers/Socket';
const MessageForm = ({handleSubmit,input,setInput,setFile,setShowEmoji,user}) => {
  const {socket} = useSocket()
    const handleOnFocus=()=>{
       socket.emit("feedback",{feedback:`${user} is typing...`})
    }
    const handleBlur=()=>{
      socket.emit("feedback",{feedback:null})
    }
    
  return (
    
    <form className='w-[90%]  rounded-3xl h-[70%] shadow-3xl border text-white overflow-hidden px-2 flex justify-start items-center' onSubmit={(e)=>handleSubmit(e)}>
       <div className='w-[10%] h-full flex justify-center items-center text-white'>
        <BsEmojiSunglasses className='text-xl mr-1 cursor-pointer' onClick={()=>setShowEmoji(prev=>!prev)}/>
      </div>
      <input
        type="text"
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        placeholder='Type message here..'
        className='outline-none border-none mx-2 flex-grow h-full w-[65%] bg-transparent text-white ::placeholder:text-black' // Apply placeholder color here
        onFocus={handleOnFocus}
        onBlur={handleBlur}
      />
      <input type="file" id='fileInput' className='hidden' onChange={(e)=>{setFile(e.target.files[0]);setInput(e.target.files[0].name)}}/>
      <label htmlFor='fileInput' className='w-[10%] h-full flex justify-center items-center text-white'>
        <MdAttachFile className='text-xl mr-1 rotate-1 transform '/>
      </label>
      <button type='submit' className='w-[10%] h-full flex justify-center items-center text-white'>
        <IoSend className='text-xl mr-1' />
      </button>
      {/* <Emoji/> */}
    </form>
  )
}

export default MessageForm