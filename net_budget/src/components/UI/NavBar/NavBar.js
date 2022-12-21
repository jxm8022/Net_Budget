import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/images/logo/piggy-100.png';
import logout from '../../../assets/images/auth/logout-rounded-100.png';
import CollapseSideBar from './CollapseSideBar/CollapseSideBar';
import './NavBar.css';

const NavBar = () => {
    const { currentMonth, currentYear } = useSelector((state) => state.transaction);

    const handleLogout = () => {
        console.log('logout')
    }

    return (
        <nav className='navbar'>
            <img className='logo' src={logo} alt='Website logo.' />
            <h2>Net Budget</h2>
            <ul className='nav-list'>
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
                <li>
                    <NavLink
                        to={`../about`}
                        className={
                            ({ isActive }) => {
                                return isActive ? 'active navbarLink' : 'navbarLink'
                            }
                        }
                    >
                        About
                    </NavLink>
                </li>
            </ul>
            <img onClick={handleLogout} className='logout' src={logout} alt='Logout button.' />
            <CollapseSideBar
                currentMonth={currentMonth}
                currentYear={currentYear}
            />
        </nav >
    );
}

export default NavBar;