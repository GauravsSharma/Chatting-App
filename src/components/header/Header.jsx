import React, { useEffect } from 'react'
import { IoChevronBack } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { useState } from 'react';
import { useSocket } from "../../providers/Socket"
const Header = ({ setOpenTop, setIsMinModelOpen, user, setUsers }) => {
  const [groupName, setGroupName] = useState("D For Devs");
  // console.log(user);
  const [userCount, setUserCount] = useState(1);
  const [allUsersName, setAllUsersName] = useState([]);
  const { socket } = useSocket();
  const [feed, setFeed] = useState(null);
  const handleGroupName = (data) => {
    // console.log(data.groupName);
    setGroupName(data.groupName);
  }

  const handleFeed = (data) => {
    // console.log(data);
    setFeed(data.feedback)
  }
  const handleNewUserJoined = (data) => {
    if (user) {
      let filteredNames = data.filter(name => name.displayName !== user);
      filteredNames = [...new Set(filteredNames)];
      const allUser = filteredNames.map((curr) => {
        return curr.displayName;
      })
      console.log("allmem", data);
      setAllUsersName(allUser);
      setUsers(filteredNames);
    }
  }

  useEffect(() => {
    socket.on("groupName", handleGroupName);
    socket.on("feedback", handleFeed);
    socket.on("new-user-joined", handleNewUserJoined);

    return () => {
      socket.off("groupName", handleGroupName);
      socket.off("feedback", handleFeed);
      socket.off("new-user-joined", handleNewUserJoined);

    }
  }, [socket])


  return (
    <div className='h-[10%] w-full shadow-sm bg-white border duration-1000 header flex px-4 justify-start items-center ' >
      <div className='w-[10%]'>
        <IoChevronBack className='text-[#023047] text-2xl' />
      </div>
      <div className='flex justify-center cursor-pointer items-start w-[80%] flex-col' onClick={() => setOpenTop(true)}>
        <div className='flex justify-center items-center mr-2 w-80%'>
          <div className="user-picture">
            <img src={"https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?w=740&t=st=1707882235~exp=1707882835~hmac=97c6dab979eb9b496b3dd71408af58e1260f856eba1cae060b744adb0715165f"} alt="" className="h-9 w-9 rounded-full border-2 border-white" />
          </div>
          <div className="group ml-1 w-auto">
            <div className='group-name leading-5 font-semibold w-fit'>{groupName}</div>
            {feed ? <div className='text-xs font-semibold'>{feed}</div> : <div className='group-member flex justify-start items-center text-[12px] font-medium'>
              <p className='mx-[2px]'>You</p>
              {
                allUsersName?.map((mem, idx) => {
                  return <p key={idx} className='mx-[2px]'>{mem}</p>
                })
              }</div>
            }
          </div>
        </div>
      </div>
      <HiDotsVertical className='text-[#023047] text-xl cursor-pointer' onClick={() => setIsMinModelOpen(prev => !prev)} />
    </div>
  )
}

export default Header