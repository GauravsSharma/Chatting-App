import React from 'react';

const MinModel = ({ isMinModelOpen, setModelOpen, setIsMinModelOpen, setOpenTop }) => {

  const handleNameGroupClick = (e) => {
    e.stopPropagation()
    setModelOpen(true);
    setIsMinModelOpen(false);
  };

  const handleViewDetailsClick = (e) => {
    e.stopPropagation()
    setOpenTop(true);
    setIsMinModelOpen(false);
  };

  return (
    <div className={`fixed duration-500 bg-gray-100 shadow-md rounded-sm top-[10%] ${isMinModelOpen ? "right-1" : "-right-40"} h-20 w-40`}>
      <div
        className='h-1/2 w-full border-b p-2 cursor-pointer hover:bg-gray-200 text-sm flex justify-start items-center'
        onClick={(e)=>handleNameGroupClick(e)}
      >
        Name this group
      </div>
      <div
        className='h-1/2 w-full text-sm p-2 cursor-pointer hover:bg-gray-200 flex justify-start items-center'
        onClick={(e)=>handleViewDetailsClick(e)}
      >
        View Group Details
      </div>
    </div>
  );
};

export default MinModel;
