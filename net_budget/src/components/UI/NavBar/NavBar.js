import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const { currentMonth, currentYear } = useSelector((state) => state.transaction);
    return (
        <nav className='navbar'>
            <ul>
                <li>
                    <NavLink
                        to={`../yearOverview?year=${currentYear}`}
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
                <li>
                    <NavLink
                        to={`../monthOverview?month=${currentMonth}&year=${currentYear}`}
                        className={
                            ({ isActive }) => {
                                return isActive ? 'active navbarLink' : 'navbarLink'
                            }
                        }
                    >
                        Month Overview
                    </NavLink>
                </li>
            </ul>
        </nav >
    );
}

export default NavBar;