import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            {/* npm install --save react-tilt */}
            {/* this installs react.js-tilt.js to have a tilt animation on the content within <div> */}
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                {/* import logo 'brain' picture and add it to this div */}
                <div className="Tilt-inner pa3">
                    <img style={{paddingTop: '5px'}} src={brain} alt='logo'/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;

