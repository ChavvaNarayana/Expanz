import React, { useState, useEffect, useRef } from 'react';
import '../styles/Older.css';

function App() {
    const [data, setData] = useState([]);
    const [showOverlay, setShowOverlay] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [limit, setLimit] = useState(12);
    const [isLoading, setIsLoading] = useState(false);

    const loader = useRef(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://api.nasa.gov/planetary/apod?api_key=gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7&count=${limit}&thumbs=true`)
            .then(response => response.json())
            .then(data => {
                setData(prevData => [...prevData, ...data]);
                setIsLoading(false);
            });
    }, [limit]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        };

        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, []);

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
            setLimit(prevLimit => prevLimit + 8);
        }
    };

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
            <h3>Older Items</h3>
            <div className="previous-items" style={{ height: '500px', overflowY: 'scroll' }}>
                {data.slice(1, limit).map(item => (
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
                {isLoading && <p>Loading...</p>}
                <div ref={loader} />
            </div>
            {showOverlay && (
                <div className="overlay">
                    {selectedItem.media_type === 'image' ? (
                        <img src={selectedItem.url} alt={selectedItem.title} className="overlay-image" />
                    ) : (
                        <video src={selectedItem.url} controls className="overlay-video" />
                    )}
                    <button className="overlay-close-button" onClick={handleOverlayClose}>Close</button>
                </div>
            )}
        </div>
    );
}

export default App;
