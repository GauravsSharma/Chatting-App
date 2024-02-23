import React from "react";
import GroupMemberCard from "./GroupMemberCard";

export function GroupInfo({openTop,users,grpName="D for devs",user}) {
    // console.log(users);     
  return (
   <>
      <div className={`h-[75%] px-3 py-5 w-full  bg-white absolute z-10 ${openTop?"top-0 shadow-xl":"-top-[75%]"} duration-500`}>
            <div className="h-[35%] w-full flex justify-start items-center flex-col border-b-2">
               <img src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?w=740&t=st=1707882235~exp=1707882835~hmac=97c6dab979eb9b496b3dd71408af58e1260f856eba1cae060b744adb0715165f" alt="" className="h-16 w-16 rounded-full"/>
               <p className="text-3xl font-semibold">{grpName}</p>
               <p className="font-medium">Group : {users?.length+1||1} members</p>
            </div>
            <div className="p-5 h-[65%] overflow-y-scroll">
              {user&& <GroupMemberCard name= {user.displayName} url = {user.photoURL}/>}
             {
               users?.map((per,idx)=>{
                 return <GroupMemberCard name= {per.displayName} url = {per.photoURL} key={idx}/> 
               })
             }
            </div>
      </div>
   </>
  );
}