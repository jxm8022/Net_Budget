import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import YearOverview from "../components/Overview/YearOverview";
import BarChart from "../components/UI/BarChart/BarChart";
import Template from "../components/UI/Template/Template";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { currentYear } = useSelector((state) => state.transaction);

    useEffect(() => {
        setSearchParams(`year=${currentYear}`)
    }, [currentYear, setSearchParams]);

    const year = searchParams.get('year');

    return (
        <Template>
            <YearOverview
                year={year}
                setSearchParams={setSearchParams}
            />
            <BarChart
                year={year}
            />
        </Template>
    );
}

export default Home;