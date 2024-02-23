import React, { useEffect, useState } from 'react';

const useEmoji = (category,search) => {
    const [allEmojiData, setAllEmojiData] = useState([]);
    const [filterEmojiData, setFilterEmojiData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchEmojiData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://unpkg.com/emoji.json`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();
            setAllEmojiData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const filterData = () => {
        
        setLoading(true);
        const filteredData = allEmojiData.filter(item => item.category.includes(category));
        setFilterEmojiData(filteredData);
        setLoading(false);
    }
  const searchData=()=>{
    setLoading(true);
    const filteredData = allEmojiData.filter(item => item.name.includes(search));
    setFilterEmojiData(filteredData);
    setLoading(false);
  }
    useEffect(() => {
        if (allEmojiData.length <= 0) {
            fetchEmojiData();
        }
    }, []);
    useEffect(() => {
        if(search){
           searchData();
        }
        else if (allEmojiData.length > 0) {
            filterData();
        }
    }, [allEmojiData, category,search]);

    return [filterEmojiData, loading, error];
};

export default useEmoji;
