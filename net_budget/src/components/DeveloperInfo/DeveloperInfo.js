import github from '../../assets/images/socialMedia/github-48.png';
import linkedin from '../../assets/images/socialMedia/linkedin-48.png';
import me from '../../assets/images/socialMedia/me.jpeg';
import './DeveloperInfo.css';

const DeveloperInfo = () => {
    return (
        <>
            <hr id='developer' className='about-separator' color='black'></hr>
            <img src={me} alt='Developer Avatar' style={{ 'border-radius': '50%' }} />
            <h2>Jose Mendoza</h2>
            <p className='bio'>
                I graduated from the University of Texas at Arlington in 2021 with a bachelor's degree in software engineering.
                Since then, I've been trying to get experience by creating my own little projects, like this one.
                I'm interested in creating things, whether that's by coding, 3D printing, or tinkering with tools.
                Besides coding, my hobbies include gaming, stargazing, and fishing.
            </p>
            <ul className='social-media'>
                <li><a rel='noreferrer noopener' target='_blank' href='https://github.com/jxm8022'><img src={github} alt='GitHub logo.' /></a></li>
                <li><a rel='noreferrer noopener' target='_blank' href='https://www.linkedin.com/in/josemendoza9486/'><img src={linkedin} alt='Linkedin logo.' /></a></li>
            </ul>
        </>
    );
}

export default DeveloperInfo;