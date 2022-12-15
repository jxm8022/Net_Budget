import './DeveloperInfo.css';

const DeveloperInfo = () => {
    return (
        <>
            <svg id='developer' height={200} width={200}>
                <circle cx={100} cy={100} r="100" fill='grey'></circle>
            </svg>
            <h2>Jose Mendoza</h2>
            <p>hello</p>
            <p>more info</p>
            <p>link github</p>
        </>
    );
}

export default DeveloperInfo;