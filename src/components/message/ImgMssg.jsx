import React, { useEffect, useState } from 'react'
import User from '../user/User'

const ImgMssg = ({ isOwnMessage, data ,time}) => {
    const [fileContent, setFileContent] = useState(null);
    const blob = new Blob([data.message], { type: data.mimeType });

    const handleImage = () => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            setFileContent(result);
        };
        reader.readAsDataURL(blob);
    }
    useEffect(() => {
        handleImage()
    }, [data])
    return (
        <div className=' w-[100%] h-auto p-1 flex'>
            {
                !isOwnMessage && <User imgURL={data.imgURL} />
            }
            <div className={`h-full w-full   flex items-center ${isOwnMessage ? "justify-end" : "justify-start"}`}>
                <div className={`message  max-w-[60%] h-full flex flex-col items-start justify-center p-1 ${isOwnMessage ? "bg-[#023047] text-white rounded-t-xl rounded-tr-xl rounded-bl-xl shadow-xl" : "bg-white border shadow-xl text-black rounded-tr-md rounded-br-md rounded-bl-md"}`}>
                    <div>
                        <img src={fileContent} className=' h-auto w-auto rounded-lg' alt="" />
                    </div>
                    {
                        !isOwnMessage ? <div className='h-[30%] text-[11px] w-full flex justify-between items-center'>
                            <p className=' h-full'>{data.userName}</p>
                            <p className='font-normal ml-1'>{time}</p>
                        </div> : <p className='text-[11px] ml-1'>{time}</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default ImgMssg