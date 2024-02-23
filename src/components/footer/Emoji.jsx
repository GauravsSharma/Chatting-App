import { CiSearch } from "react-icons/ci";
import { FaSmile } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { GiPawHeart } from 'react-icons/gi';
import { GiBeerStein } from 'react-icons/gi';
import { GiAirplaneDeparture } from 'react-icons/gi';
import { FaRunning } from 'react-icons/fa';
import { FaCube } from 'react-icons/fa';
import { GiHeartBeats } from 'react-icons/gi';
import { IoMdFlag } from "react-icons/io";
import useEmoji from "../../hooks/useEmoji";
import loader from '../../assets/loader.gif'
import { useState } from "react";


function Emoji({ showEmoji, setInput}) {
  const[currCategory,setCurrCategory] = useState("Smileys & Emotion")
  const [search,setSearch] = useState("");
  const [filterEmojiData, loading, error] = useEmoji(currCategory,search);
  const handleSelect = (index) => {
    const selectedCategory = emojiHeaders[index].name;
    setCurrCategory(selectedCategory);
    // Add logic to handle the selected categor
  };
  // console.log(filterEmojiData)
  const emojiHeaders = [
    { icon: <FaSmile className="text-xl text-slate-600 cursor-pointer" />, name: "Smileys & Emotion" },
    { icon: <FaUser className="text-xl text-slate-600 cursor-pointer" />, name: "People & Body" },
    { icon: <GiPawHeart className="text-xl text-slate-600 cursor-pointer" />, name: "Animals & Nature" },
    { icon: <GiBeerStein className="text-xl text-slate-600 cursor-pointer" />, name: "Food & Drink" },
    { icon: <GiAirplaneDeparture className="text-xl text-slate-600 cursor-pointer" />, name: "Travel & Places" },
    { icon: <FaRunning className="text-xl text-slate-600 cursor-pointer" />, name: "Activities" },
    { icon: <FaCube className="text-xl text-slate-600 cursor-pointer" />, name: "Objects" },
    { icon: <GiHeartBeats className="text-xl text-slate-600 cursor-pointer" />, name: "Symbols" },
    { icon: <IoMdFlag className="text-xl text-slate-600 cursor-pointer" />, name: "Flags" }
  ];

  const handleClick = (index) => {
    handleSelect(index);
  };
  const handleSelectEmoji=(e)=>{
    // console.log(e);
    if(e.target.className==="text-xl min-w-[12%] text-center"){
      const emoji = e.target.innerText;
        setInput(prev=>prev+emoji)
    }
  }
  return (
    <div className={`h-[60%] w-full rounded-lg shadow-xl flex flex-col py-1 px-3 overflow-hidden justify-center items-center absolute ${showEmoji ? "bottom-0" : "-bottom-[60%]"} duration-500 bg-white border overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-center gap-1 border-b-2 py-3 my-1 w-full h-[12%] ">
        {emojiHeaders.map((emojiHead, index) => (
          <div key={index} onClick={() => handleClick(index)}>
            {emojiHead.icon}
          </div>
        ))}
      </div>
      <div className="search w-full flex justify-center sticky items-center px-3 gap-1 h-[15%] shadow-sm rounded-lg bg-slate-200 ">
        <CiSearch className="font-bold w-[10%] h-5 text-slate-500" />
        <input type="text" className="h-full w-[90%] outline-none border-none bg-transparent" placeholder="Search emoji"
        value={search}
        onChange={(e)=>setSearch(()=>{
          return e.target.value
        })}
        />
      </div>
      <div className="emoji h-[75%] w-full py-2">
        <h5 className="text-sm font-semibold text-slate-500">Smileys & People</h5>
        <div className="emoji-container w-full grid grid-cols-9 overflow-y-auto overflow-x-hidden"
        onClick={(e)=>handleSelectEmoji(e)}
        >
          {loading && <div>
             <img src={loader} alt="" />
            </div>}
          {filterEmojiData && filterEmojiData.map((emoji, index) => (
            <div className="text-xl min-w-[12%] text-center" key={index}>{emoji.char}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Emoji;

