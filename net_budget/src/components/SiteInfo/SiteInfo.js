import './SiteInfo.css';

const Definitions = () => {
    return (
        <>
            <h2 id='definitions'>Definitions</h2>
            <p><b>Net: </b>The amount of money available to spend in the corresponding month based off of month net after potential transactions are factored.</p>
            <p><b>Potential Net: </b>The amount of money available to spend in the corresponding month based off of month net after potential transactions are factored.</p>
            <p><b>Projected Net: </b>The amount of money available to spend in the corresponding month based off of month net after potential transactions are factored.</p>
        </>
    );
}

const HowTo = () => {
    return (
        <>
            <h2 id='howto'>How To</h2>
            <p>Best way is to...</p>
        </>
    );
}

const SiteInfo = () => {
    return (
        <>
            <a href='#howto'>How To</a>
            <a href='#definitions'>Definitions</a>
            <a href='#developer'>About Developer</a>
            <HowTo />
            <Definitions />
        </>
    );
}

export default SiteInfo;