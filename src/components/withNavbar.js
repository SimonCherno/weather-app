import React from 'react';
import { useAppContext } from '../context/AppProvider';
import { Link } from 'react-router-dom';

const withNavbar = (Component, location) => {
    const Navbar = () => {
        const {toggleDegrees, toggleTheme, isDarkMode} = useAppContext();
        return <>
            <nav className='navbar'>
                <div className="container-fluid section-center">
                    <h1>weather app</h1>
                    <div className="right-corner">
                        <div className="btn-group nav-btns">
                            <Link 
                                className={location === 'home' ? 'btn btn-primary active' : 'btn btn-primary'} 
                                to='/'
                            >Home</Link>
                            <Link 
                                className={location === 'favorites' ? 'btn btn-primary active' : 'btn btn-primary'} 
                                to='/favorites'
                            >Favorites</Link>
                        </div>
                        <div className="btn-group me-2  nav-btns">
                            <button 
                                onClick={() => toggleDegrees ('C')} 
                                className="btn btn-outline-secondary"
                            >C</button>
                            <button 
                                onClick={() => toggleDegrees ('F')} 
                                className="btn btn-outline-secondary"
                            >F</button>
                        </div>
                            <div className="form-check form-switch darkmode-switch">
                                <div className="label-wrapper">
                                    <label 
                                        className="form-check-label" 
                                        htmlFor="flexSwitch"
                                        >Dark mode</label>
                                </div>
                                <div className="input-wrapper">
                                    <input 
                                        className="form-check-input input" 
                                        type="checkbox" 
                                        role="switch" 
                                        id="flexSwitch" 
                                        checked={isDarkMode ? true : false} 
                                        onChange={toggleTheme}
                                    />
                                </div>
                            </div>
                    </div>
                </div>
            </nav>
            <Component />
        </>
    }
    return Navbar
}

export default withNavbar