import { useState, FC } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';


interface NavbarProps {
    logout: () => void;
}

const Navbar:FC<NavbarProps> = ({logout}) => {
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };

    const navItems = [
        { id: 1, text: 'Home', location: '/' },
        { id: 2, text: 'Log In', location: '/account/login' },
    ];

    return (
        <nav className='bg-black flex justify-between items-center h-24 mx-auto px-4 text-white'>
            {/* Logo */}
            <a href="/" className='flex justify-start items-center'>
                <img className='object-scale-down h-24 w-54' src='/icons/beardedLifter.png' />
                <h1 className='w-full text-3xl font-bold text-[#00df9a]'>Lift Log</h1>
            </a>

            {/* Desktop Navigation */}
            <ul className='hidden md:flex'>
                {navItems.map(item => (
                    <li key={item.id}>
                        <a href={item.location} className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'>{item.text}</a>
                    </li>
                ))}
            </ul>

            {/* Mobile Navigation Icon */}
            <div onClick={handleNav} className='block md:hidden'>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>

            {/* Mobile Navigation Menu */}
            <ul
                className={
                    nav
                        ? 'z-50 fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
                        : 'z-50 ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
                }
            >
                {/* Mobile Logo */}
                <div className='flex justify-start items-center'>
                    <img className='object-scale-down h-24 w-54' src='/icons/beardedLifter.png' />
                    <h1 className='w-full text-3xl font-bold text-[#00df9a]'>Lift Log</h1>
                </div>

                {/* Mobile Navigation Items */}
                {navItems.map(item => (
                    <li key={item.id}>
                        <a href={item.location} className='flex p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer hover:text-black'>{item.text}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;