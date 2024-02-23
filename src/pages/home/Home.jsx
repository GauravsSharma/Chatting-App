import React, { useEffect, useRef, useState } from 'react'
import { useSocket } from '../../providers/Socket'
import Header from '../../components/header/Header';
import MinModel from '../../components/header/MinModel';
import MessageForm from '../../components/footer/MessageForm';
import { GroupInfo } from '../../components/header/GroupInfo';
import GroupNameEditorModel from '../../components/GroupNameEditorModel';
import Emoji from '../../components/footer/Emoji';
import Message from '../../components/message/Message';
import { useFirebase } from '../../providers/Firebase';
import messageTone from "../../assets/message-tone.mp3"

const Home = () => {
    const [input, setInput] = useState("")
    const [openTop, setOpenTop] = useState(false);
    const [IsModelOpen, setModelOpen] = useState(false);
    const [isMinModelOpen, setIsMinModelOpen] = useState(false);
    const [file, setFile] = useState(null)
    const [groupName, setGroupName] = useState("")
    const [showEmoji, setShowEmoji] = useState(false);
    const [users, setUsers] = useState(null);

    const [messages, setMessage] = useState(() => {
        let message = localStorage.getItem("chats");
        message = message ? JSON.parse(message) : null
        return message ? message : []
    });

    localStorage.removeItem("chats")
    const ref = useRef(null)
    const { socket } = useSocket();
    const { user } = useFirebase()
    const tone = new Audio(messageTone);


    const handelMessageReceived = (data) => {
        tone.play();
        addMessagetoUI(false, data);
    }

    useEffect(() => {
        handleScrollToBottom()
    }, [messages])
    const handleScrollToBottom = () => {
        ref?.current?.scrollTo(0, ref?.current?.scrollHeight);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let data;
        if (file) {
            // Check if the file is an image
            if (file.type.startsWith('image/')) {
                // Check if the file size is less than 1 MB (1024 * 1024 bytes)
                if (file.size <= 1024 * 1024) {
                    data = {
                        userName: user?.displayName || "anonymous",
                        imgURL: user?.photoURL ? user.photoURL : "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1708341742~exp=1708342342~hmac=355eb7f155943ffd02a212c59312823da56e3a86fca0dec16734a86f84ad6c40",
                        message: file,
                        type: "file",
                        mimeType: file.type,
                        dateTime: new Date()
                    };
                } else {
                    console.error("File size exceeds 1 MB limit");
                    // Handle case where file size is too large
                }
            } else {
                console.error("Selected file is not an image");
                // Handle case where selected file is not an image
            }
        }
        else {
            if (input) {
                data = {
                    userName: user?.displayName || "anonymouse",
                    imgURL: user?.photoURL ? user.photoURL : "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1708341742~exp=1708342342~hmac=355eb7f155943ffd02a212c59312823da56e3a86fca0dec16734a86f84ad6c40",
                    message: input,
                    dateTime: new Date(),
                    type: "text",
                }
            }
        }
        if (data) {
            addMessagetoUI(true, data)
            handleScrollToBottom()
            setFile(null);
            setInput("");
            socket.emit("message", data);
        }
    }



    const addMessagetoUI = (isOwnMessage, data) => {
        const timeOptions = { hour: 'numeric', minute: 'numeric' };
        const time = new Date(data.dateTime).toLocaleTimeString('en-US', timeOptions);
        console.log(time);
        setMessage(prev => {
            const updatedMessages = [...prev, { isOwnMessage, data, time }]
            localStorage.setItem("chats", JSON.stringify(updatedMessages))
            setMessage(updatedMessages)
            return updatedMessages;
        })
    }
    const handleSubmitGroupName = (e) => {
        e.preventDefault()
        socket.emit("groupName", { groupName })
        setModelOpen(false)
    }
    useEffect(() => {
        if (user) {
            console.log("icalle",user);
            socket.emit("new-user-joined", { displayName: user?.displayName || "anonymouse", photoURL: user?.photoURL || "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?w=740&t=st=1708405577~exp=1708406177~hmac=8a507c4e72fbff7072d5e38ab9a78cad1a515c96594dcdb99dc7f01e9e29bd84" })
        }
    }, [user])

    useEffect(() => {
        socket.on("chat-message", handelMessageReceived);
        return () => {
            socket.off("chat-message", handelMessageReceived)
        }
    }, [socket])
    return (
        <div className='w-full h-screen justify-center items-center flex' style={{ backgroundColor: "#e5c3c6" }}>
            <div className='h-full relative sm:h-[95%] sm:rounded-3xl overflow-hidden sm:w-[23%] w-full bg-[#023047] shadow-xl'>
                <GroupNameEditorModel
                    groupName={groupName}
                    setGroupName={setGroupName}
                    setModelOpen={setModelOpen}
                    IsModelOpen={IsModelOpen}
                    handleSubmit={handleSubmitGroupName}

                />
                {/* header starts here */}
                <Header
                    setOpenTop={setOpenTop}
                    setIsMinModelOpen={setIsMinModelOpen}
                    user={user?.displayName || null}
                    setUsers={setUsers}
                />

                {/* group model here */}
                <GroupInfo
                    openTop={openTop}
                    users={users}
                    user={user}
                    grpName={groupName}
                />

                {/* message box starts here  */}
                <div className='h-[78%] relative overflow-hidden' id='messageContainer' onClick={() => { setOpenTop(false); setIsMinModelOpen(false); setShowEmoji(false) }}>
                    <div className='h-full relative w-full bg-white overflow-x-hidden overflow-y-auto' ref={ref}>
                        {messages.map((message, index) => (
                            <Message
                                key={index}
                                isOwnMessage={message.isOwnMessage}
                                data={message.data}
                                time={message.time}
                            />
                        ))}
                        <MinModel
                            isMinModelOpen={isMinModelOpen}
                            setModelOpen={setModelOpen}
                            setIsMinModelOpen={setIsMinModelOpen}
                            setOpenTop={setOpenTop}
                        />
                    </div>
                    <Emoji showEmoji={showEmoji} setShowEmoji={setShowEmoji} setInput={setInput} />
                </div>

                {/* footer or input feild starts from here  */}
                <div className='w-full h-[12%] flex justify-center items-center'>
                    <MessageForm
                        input={input}
                        setInput={setInput}
                        handleSubmit={handleSubmit}
                        setFile={setFile}
                        setShowEmoji={setShowEmoji}
                        user={user?.displayName || "anonymouse"}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home