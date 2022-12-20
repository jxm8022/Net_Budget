import versionHistory from "../assets/versionHistory";
import Template from "../components/UI/Template/Template";

const Version = () => {
    return (
        <Template>
            <h1>Version History</h1>
            {versionHistory.map((version) => <div className="version-body" key={version.id}>
                <h3 className="version-title">v{version.version} - {version.title} - <a rel='noreferrer noopener' href={version.link} target='_blank'>issue</a></h3>
                <p className="version-info">{version.info}</p>
            </div>)}
        </Template>
    );
}

export default Version;