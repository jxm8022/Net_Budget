import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import YearOverview from "../components/DisplayYear/YearOverview/YearOverview";
import BarChart from "../components/DisplayYear/BarChart/BarChart";
import Template from "../components/UI/Template/Template";
import { labels } from "../resources/labels";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { currentYear } = useSelector((state) => state.transaction);

    useEffect(() => {
        setSearchParams(`year=${currentYear}`)
    }, [currentYear, setSearchParams]);

    return (
        <Template>
            <h1>{labels.home}</h1>
            <YearOverview
                year={currentYear}
                setSearchParams={setSearchParams}
            />
            <BarChart
                year={currentYear}
            />
        </Template>
    );
}

export default Home;