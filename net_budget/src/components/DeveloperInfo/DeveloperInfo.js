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
            <p className='bio'><b>Bio:</b>
                <p>Hobbies: programming, gaming, stargazing, 3D printing</p>
                <p>Interests: astronomy, mathematics, science</p>
            </p>
            <p className='background'><b>Background:</b>
                <p>Education: The University of Texas at Arlington</p>
            </p>
            <ul className='social-media'>
                <li><a rel='noreferrer noopener' target='_blank' href='https://github.com/jxm8022'><img src={github} alt='GitHub logo.' /></a></li>
                <li><a rel='noreferrer noopener' target='_blank' href='https://www.linkedin.com/in/josemendoza9486/'><img src={linkedin} alt='Linkedin logo.' /></a></li>
            </ul>
        </>
    );
}

export default DeveloperInfo;