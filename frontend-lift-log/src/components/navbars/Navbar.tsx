import { FC, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import LoggedinNavbar from './LoggedinNavbar';
import LoggedoutNavbar from './LoggedoutNavbar';

interface NavbarProps {
    logout: () => void;
}

const Navbar: FC<NavbarProps> = ({ logout }) => {
    const { user } = useContext(UserContext);

    return (
        <>
            {!user ? (
                <LoggedoutNavbar />
            ) : (
                <LoggedinNavbar logout={logout} />)
            }
        </>
    );
};

export default Navbar;