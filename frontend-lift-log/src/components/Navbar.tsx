import { useState, FC, useContext } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { UserContext } from '../context/UserContext';
import LoggedoutNavbar from './navbars/LoggedoutNavbar';
import LoggedinNavbar from './navbars/LoggedinNavbar';


interface NavbarProps {
    logout: () => void;
}

const Navbar:FC<NavbarProps> = ({logout}) => {
    const { user } = useContext(UserContext);

    return (
        <>
            {!user ? (
                <LoggedoutNavbar /> 
            ) : (
                <LoggedinNavbar logout={logout}/> )
            }
        </>
    );
};

export default Navbar;