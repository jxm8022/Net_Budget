import Overview from "../components/Overview/Overview";
import BarChart from "../components/UI/BarChart/BarChart";
import Template from "../components/UI/Template/Template";

const Home = () => {
    return (
        <Template>
            <h2>Overview</h2>
            <Overview />
            <BarChart />
        </Template>
    );
}

export default Home;