import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    // Cannot return an if statement, thus you need to return each individual <nav>
    // return (
    if(isSignedIn) {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                {/* If we click on signout, it will take us to the signin page */}
                <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
            </nav>
        )
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                {/* If we click on either sign in or register, it will take us to the the resepctive page aka signin=>signin page & home=>home page */}
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
                <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
            </nav>
        );
    }
}

export default Navigation;