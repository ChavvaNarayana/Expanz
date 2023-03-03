import React from 'react'
import "../styles/Navbar.css"

function Navbar() {
    return (
        <>
            <nav class="navbar">
                <div class="navbar-left">
                    <img src="https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-logo-web-rgb.png" alt="Logo" class="navbar-logo" />
                    <h1 class="navbar-name">Narayana Reddy</h1>
                </div>
                <div class="navbar-right">
                    <p class="navbar-text">Astronomy Picture of the Day</p>
                </div>
            </nav>
        </>
    )
}

export default Navbar