import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../../actions/userActions';
import logo from '../../../assets/images/logo/piggy-100.png';
// import logoutSymbol from '../../../assets/images/auth/logout-rounded-100.png';
import CollapseSideBar from './CollapseSideBar/CollapseSideBar';
import './NavBar.css';

const NavBar = () => {
    const { currentMonth, currentYear } = useSelector((state) => state.transaction);
    const { isLoggedIn } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate({
            pathname: '/auth',
        });
    }

    const handleLogo = () => {
        navigate({
            pathname: isLoggedIn ? '/yearOverview' : '/auth'
        });
    }

    let links = [];
    if (isLoggedIn) {
        links = [
            {
                id: 0,
                where: `../yearOverview?year=${currentYear}`,
                name: 'Home'
            },
            {
                id: 1,
                where: '../addTransaction',
                name: 'Add Transaction'
            },
            {
                id: 2,
                where: `../monthOverview?month=${currentMonth}&year=${currentYear}`,
                name: 'Month Overview'
            },
            {
                id: 3,
                where: `../about`,
                name: 'About'
            },
            {
                id: 4,
                where: `../auth`,
                name: 'Logout',
                do: handleLogout
            }
        ]
    } else {
        links = [
            {
                id: 3,
                where: `../about`,
                name: 'About'
            }
        ]
    }

    return (
        <nav className='navbar'>
            <img className='logo' onClick={handleLogo} src={logo} alt='Website logo.' />
            <h2>Net Budget</h2>
            <ul className='nav-list'>
                {links.map((link) => <li key={link.id}>
                    <NavLink
                        to={link.where}
                        onClick={link.do}
                        className={
                            ({ isActive }) => {
                                return isActive ? 'active navbarLink' : 'navbarLink'
                            }
                        }
                    >
                        {link.name}
                    </NavLink>
                </li>
                )}
            </ul>
            {/* <img onClick={handleLogout} className='logout' src={logoutSymbol} alt='Logout button.' /> */}
            <CollapseSideBar
                currentMonth={currentMonth}
                currentYear={currentYear}
                links={links}
            />
        </nav >
    );
}

export default NavBar;