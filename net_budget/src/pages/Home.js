import Template from "../components/UI/Template/Template";
import Graph from "../components/DisplayYear/Graph/Graph";
import AccountSummary from "../components/Summary/AccountSummary";
import Selector from "../components/UI/Selector/Selector";
import { labels } from "../resources/labels";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../actions/transactionActions";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { SELECTORTYPES } from "../resources/constants";
import YearOverview from "../components/DisplayYear/YearOverview/YearOverview";

const Home = () => {
    const dispatch = useDispatch();

    const [, setSearchParams] = useSearchParams();
    const { currentYear } = useSelector((state) => state.transaction);

    useEffect(() => {
        setSearchParams(`year=${currentYear}`)
    }, [currentYear, setSearchParams]);

    const onYearChange = (event) => {
        dispatch(setDate({ year: parseInt(event.target.value) }));
        setSearchParams(`year=${event.target.value}`);
    }

    return (
        <Template>
            <h1>{labels.home}</h1>
            <h2>Summary</h2>
            <Selector type={SELECTORTYPES.YEAR} onYearChange={onYearChange} />
            <AccountSummary />
            <YearOverview />
            <Graph />
        </Template>
    );
}

export default Home;