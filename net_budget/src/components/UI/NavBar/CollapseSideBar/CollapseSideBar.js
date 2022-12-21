import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import menu from '../../../../assets/images/menu/menu-rounded-100.png';
import './CollapseSideBar.css';

const CollapseSideBar = (props) => {
    const { currentMonth, currentYear } = props;
    const [displayStyle, setDisplayStyle] = useState('0px');

    function openNav() {
        displayStyle === '220px' ? setDisplayStyle('0px') : setDisplayStyle('220px');
    }

    return (
        <>
            <div style={{ width: displayStyle }} className="sidebar">
                <NavLink
                    to={`../yearOverview?year=${currentYear}`}
                    className={
                        ({ isActive }) => {
                            return isActive ? 'side-active side-navbarLink' : 'side-navbarLink'
                        }
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to={'../addTransaction'}
                    className={
                        ({ isActive }) => {
                            return isActive ? 'side-active side-navbarLink' : 'side-navbarLink'
                        }
                    }
                >
                    Add Transaction
                </NavLink>
                <NavLink
                    to={`../monthOverview?month=${currentMonth}&year=${currentYear}`}
                    className={
                        ({ isActive }) => {
                            return isActive ? 'side-active side-navbarLink' : 'side-navbarLink'
                        }
                    }
                >
                    Month Overview
                </NavLink>
                <NavLink
                    to={`../about`}
                    className={
                        ({ isActive }) => {
                            return isActive ? 'side-active side-navbarLink' : 'side-navbarLink'
                        }
                    }
                >
                    About
                </NavLink>
                <NavLink
                    to={`../auth`}
                    className={
                        ({ isActive }) => {
                            return isActive ? 'side-active side-navbarLink' : 'side-navbarLink'
                        }
                    }
                >
                    Logout
                </NavLink>
            </div>
            <img onClick={openNav} className='openSideBar' src={menu} alt='Menu button.' />
        </>
    );
}

export default CollapseSideBar;