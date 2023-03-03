import React, { useState, useEffect } from 'react';
import "../styles/Previous.css"

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

    const handleOverlayClose = () => {
        setSelectedItem(null);
        setShowOverlay(false);
    };

    return (
        <div>
            <div className="spotlight">
                <h2>{data[0]?.title}</h2>
                <a href={data[0]?.url} target="_blank" rel="noopener noreferrer">
                    {data[0]?.media_type === 'image' ? (
                        <img src={data[0]?.thumbnail_url} alt={data[0]?.title} onClick={() => handleItemSelect(data[0])} />
                    ) : (
                        <video src={data[0]?.thumbnail_url} alt={data[0]?.title} onClick={() => handleItemSelect(data[0])} />
                    )}
                </a>
                <p>{data[0]?.explanation}</p>
                <p>Author: {data[0]?.copyright}</p>
            </div>
            <h3>Recent Items</h3>
            <div className="previous-items">
                {data.slice(1).map(item => (
                    <div key={item.date} className="previous-item">
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                            {item.media_type === 'image' ? (
                                <img src={item.thumbnail_url} alt={item.title} onClick={() => handleItemSelect(item)} />
                            ) : (
                                <video src={item.thumbnail_url} alt={item.title} onClick={() => handleItemSelect(item)} />
                            )}
                        </a>
                        <div className="previous-item-details">
                            <p className="previous-item-title">{item.title}</p>
                            <p className="previous-item-author">Author: {item.copyright}</p>
                            <p className="previous-item-date">Date: {item.date}</p>
                        </div>
                    </div>
                ))}
            </div>
            {showOverlay && (
                <div className="overlay">
                    {selectedItem.media_type === 'image' ? (
                        <img src={selectedItem.url} alt={selectedItem.title} />
                    ) : (
                        <video src={selectedItem.url} alt={selectedItem.title} controls />
                    )}
                    <div className="overlay-details">
                        <h2>{selectedItem.title}</h2>
                        <p>{selectedItem.explanation}</p>
                        <p>Author: {selectedItem.copyright}</p>
                        <p>Date: {selectedItem.date}</p>
                    </div>
                    <button onClick={handleOverlayClose}>Close</button>
                </div>
            )}
        </div>
    );
}

export default Previous;
