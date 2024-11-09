import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import YearOverview from "./YearOverview/YearOverview";

const DisplayYearBase = (props) => {
    const [, setSearchParams] = useSearchParams();
    const { currentYear } = useSelector((state) => state.transaction);

    useEffect(() => {
        setSearchParams(`year=${currentYear}`)
    }, [currentYear, setSearchParams]);

    return (
        <>
            <YearOverview
                year={currentYear}
                setSearchParams={setSearchParams}
            />
        </>
    );
}

export default DisplayYearBase;