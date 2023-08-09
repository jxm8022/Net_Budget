import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { labels } from "../../resources/labels";
import Graph from "./Graph/Graph";
import YearOverview from "./YearOverview/YearOverview";

const DisplayYearBase = (props) => {
    const [ , setSearchParams] = useSearchParams();
    const { currentYear } = useSelector((state) => state.transaction);

    useEffect(() => {
        setSearchParams(`year=${currentYear}`)
    }, [currentYear, setSearchParams]);

    return (
        <>
            <h1>{labels.home}</h1>
            <YearOverview
                year={currentYear}
                setSearchParams={setSearchParams}
            />
            <Graph />
        </>
    );
}

export default DisplayYearBase;