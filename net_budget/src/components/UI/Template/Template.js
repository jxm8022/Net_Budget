import NavBar from "../NavBar/NavBar";
import './Template.css';

const Template = (props) => {
    return (
        <>
            <NavBar />
            <div className='children'>
                {props.children}
            </div>
        </>
    );
}

export default Template;