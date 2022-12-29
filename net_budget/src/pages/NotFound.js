import { Link } from "react-router-dom";
import Template from "../components/UI/Template/Template";

const LoggedOut = () => {
    return (
        <>
            <h1>Looks like you are not logged in!</h1>
            <Link to={'/auth'}>Login</Link>
        </>
    );
}

const WhatThe = () => {
    return (
        <>
            <h1>Looks like you are looking for something that does not exist!</h1>
            <Link to={'/'}>Existing place...</Link>
        </>
    );
}

const NotFound = () => {
    const currentPath = window.location.pathname.slice(1);

    let displayComponent = <WhatThe />

    if (currentPath === 'yearOverview' || currentPath === 'addTransaction' || currentPath === 'monthOverview') {
        displayComponent = <LoggedOut />
    }

    return (
        <Template>
            {displayComponent}
        </Template>
    );
}

export default NotFound;