import { useState } from "react";
import MonthDetails from "../components/MonthDetails/MonthDetails";
import MonthSelector from "../components/MonthDisplay/MonthSelector";
import MonthOverview from "../components/Overview/MonthOverview";
import Template from "../components/UI/Template/Template";

const currentMonth = new Date().getMonth();

const DisplayMonth = () => {
    const [monthIndex, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(new Date().getFullYear());

    const onMonthChange = (event) => {
        setMonth(event.target.value);
    }
    const onYearChange = (event) => {
        setYear(event.target.value);
    }

    return (
        <Template>
            <MonthSelector monthIndex={monthIndex} year={year} onMonthChange={onMonthChange} onYearChange={onYearChange} />
            <MonthOverview monthIndex={monthIndex} />
            <MonthDetails monthIndex={monthIndex} />
        </Template>
    );
}

export default DisplayMonth;