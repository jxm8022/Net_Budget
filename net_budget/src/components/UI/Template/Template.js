import versionHistory from "../../../assets/versionHistory";
import NavBar from "../NavBar/NavBar";
import Notification from "../Notification/Notification";
import './Template.css';

const Template = (props) => {
    const latestVersion = versionHistory[versionHistory.length - 1].version;

    return (
        <>
            <NavBar />
            <Notification />
            <div className='children'>
                {props.children}
                <a href='version' className='version'>v{latestVersion}</a>
            </div>
        </>
    );
}

export default Template;