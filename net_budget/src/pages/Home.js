import YearOverview from "../components/Overview/YearOverview";
import BarChart from "../components/UI/BarChart/BarChart";
import Template from "../components/UI/Template/Template";

const Home = () => {
    return (
        <Template>
            <YearOverview />
            <BarChart />
        </Template>
    );
}

export default Home;