import Template from "../components/UI/Template/Template";
import Graph from "../components/DisplayYear/Graph/Graph";
import AccountSummary from "../components/Summary/AccountSummary";
import DisplayYearBase from "../components/DisplayYear/DisplayYearBase";
import { labels } from "../resources/labels";

const Home = () => {
    return (
        <Template>
            <h1>{labels.home}</h1>
            <AccountSummary />
            <DisplayYearBase />
            <Graph />
        </Template>
    );
}

export default Home;