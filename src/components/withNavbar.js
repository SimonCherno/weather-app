import React from 'react';
import { useAppContext } from '../services/AppProvider';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { AiFillHome } from 'react-icons/ai';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { setBackground } from '../services/utils';
import DegreesSelctor from './DegreesSelector';

const withNavbar = (Component) => {
    const Navbar = () => {
        const {toggleDegrees, currentWeather} = useAppContext();
        const navigate = useNavigate();
        let image;
        if (currentWeather.weatherIcon){
            const background = setBackground(currentWeather.weatherIcon);
            image = require(`../assets/${background}.jpg`).default;
        }
        return <>
            <div className="background">
                {image && <img src={image} alt='background' className='bcg-img' />}
                <div className="overlay"></div>
            </div>
            <nav className='navbar'>
                <div className="container-fluid section-center">
                    <img src={logo} alt='logo' className='logo' />
                    <div className="right-corner">
                        <div className="btn-group nav-btns">
                            <AiFillHome 
                                className='link-icon'
                                onClick={() => {
                                    navigate('/')
                                }}
                            />
                            <BsFillBookmarkHeartFill 
                                className='link-icon'
                                onClick={() => {
                                    navigate('/favorites')
                                }}
                            />
                        </div>
                        <DegreesSelctor toggleDegrees={toggleDegrees}/>
                    </div>
                </div>
            </nav>
            <Component />
        </>
    }
    return Navbar
}

export default withNavbar