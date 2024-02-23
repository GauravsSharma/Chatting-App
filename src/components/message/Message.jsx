import React from 'react'
import TextMssg from './TextMssg'
import ImgMssg from './ImgMssg'

const Message = ({ isOwnMessage, data,time }) => {

    if (data.type === "text") {
        return <TextMssg isOwnMessage={isOwnMessage} data={data} time={time} />
    }
    else{
        return <ImgMssg isOwnMessage={isOwnMessage} data={data} time={time} />
    }
    
}

export default Message