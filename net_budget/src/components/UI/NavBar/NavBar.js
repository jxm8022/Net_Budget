import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className='navbar'>
            <ul>
                <li>
                    <NavLink
                        to={'../home'}
                        className={
                            ({ isActive }) => {
                                return isActive ? 'active navbarLink' : 'navbarLink'
                            }
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={'../addTransaction'}
                        className={
                            ({ isActive }) => {
                                return isActive ? 'active navbarLink' : 'navbarLink'
                            }
                        }
                    >
                        Add Transaction
                    </NavLink>
                </li>
            </ul>
        </nav >
    );
}

export default NavBar;