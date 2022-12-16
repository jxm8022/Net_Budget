import DeveloperInfo from "../components/DeveloperInfo/DeveloperInfo";
import SiteInfo from "../components/SiteInfo/SiteInfo";
import Template from "../components/UI/Template/Template";

const About = () => {
    return (
        <Template>
            <h1>About</h1>
            <SiteInfo />
            <DeveloperInfo />
            <a href='#top' className="scroll-top">Top</a>
        </Template>
    );
}

export default About;