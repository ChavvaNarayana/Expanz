import React, { useState, useEffect } from 'react';
import "../styles/Test.css"

function Previous() {
    const [data, setData] = useState([]);
    const [showOverlay, setShowOverlay] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        fetch('https://api.nasa.gov/planetary/apod?api_key=gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7&count=8&thumbs=true')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    const handleItemSelect = item => {
        setSelectedItem(item);
        setShowOverlay(true);
    };


    return (
        <div className="spotlight">
            <div className="spotlight-content">
                <div className="spotlight-media">
                    {data[0]?.media_type === 'image' ? (
                        <img src={data[0]?.url} alt={data[0]?.title} onClick={() => handleItemSelect(data[0])} />
                    ) : (
                        <video src={data[0]?.url} alt={data[0]?.title} onClick={() => handleItemSelect(data[0])} />
                    )}
                </div>
                <div className="spotlight-text">
                    <h2>{data[0]?.title}</h2>
                    <p>{data[0]?.explanation}</p>
                    <p>Author: {data[0]?.copyright}</p>
                </div>
            </div>
        </div>
    );
}

export default Previous;
