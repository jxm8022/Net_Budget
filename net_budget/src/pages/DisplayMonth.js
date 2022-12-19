import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import MonthDetails from "../components/MonthDetails/MonthDetails";
import MonthSelector from "../components/MonthDisplay/MonthSelector";
import MonthOverview from "../components/Overview/MonthOverview";
import PieChart from "../components/UI/PieChart/PieChart";
import Template from "../components/UI/Template/Template";

const DisplayMonth = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { currentMonth, currentYear } = useSelector((state) => state.transaction);

    useEffect(() => {
        setSearchParams(`month=${currentMonth}&year=${currentYear}`);
    }, [currentMonth, currentYear, setSearchParams]);

    const month = searchParams.get('month');
    const year = searchParams.get('year');

    return (
        <Template>
            <MonthSelector monthIndex={month} year={year} setSearchParams={{ prevMonth: month, prevYear: year, setSearchParams }} />
            <PieChart monthIndex={month} />
            <MonthOverview monthIndex={month} />
            <MonthDetails monthIndex={month} />
            <a href='#top' className="scroll-top">Top</a>
        </Template>
    );
}

export default DisplayMonth;