import React from 'react'
import { MdCameraEnhance } from "react-icons/md";

const GroupNameEditorModel = ({ IsModelOpen, setModelOpen, handleSubmit, groupName, setGroupName }) => {

    const handleClose = (e) => {
        e.stopPropagation();
    }
   
    return (
        <div className={`h-full w-full flex justify-center items-center absolute bg-black/20 z-10  ${IsModelOpen ? "scale-1" : "scale-0"} duration-200`} onClick={() => setModelOpen(false)}>
            <form className='h-[20%]  shadow-xl w-[95%] flex justify-between items-center bg-white p-3 gap-1 rounded-xl ' onClick={(e) => handleClose(e)} onSubmit={(e)=>handleSubmit(e)}>
                <label htmlFor="dp" className='relative flex justify-center items-center h-12 w-[15%] overflow-hidden rounded-full ' >
                    <img src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?w=740&t=st=1707882235~exp=1707882835~hmac=97c6dab979eb9b496b3dd71408af58e1260f856eba1cae060b744adb0715165f" alt="" className='h-full w-full' />
                    <p className='text-3xl text-white font-bold z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute'>
                        <MdCameraEnhance className=' rounded-xl border-2 shadow-2xl' />
                    </p>
                </label >
                <input type="file" id='dp' className='hidden' />
                <input type="text" min={3} max={15} className='border border-gray-500 px-2 py-2 rounded-xl w-[70%] ' placeholder='Name your group' value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                <button className='px-3 py-2 border bg-[#023047] text-white rounded-lg' type='submit '>save</button>
            </form>
        </div>
    )
}

export default GroupNameEditorModel
