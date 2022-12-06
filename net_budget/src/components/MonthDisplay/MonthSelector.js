import { useState } from "react";
import { months } from "../../assets/months";
import Selector from "../UI/Selector/Selector";
import './MonthSelector.css';

const currentMonth = new Date().getMonth();

const MonthSelector = () => {
    const [month, setMonth] = useState(months[currentMonth].month);
    const [year, setYear] = useState(new Date().getFullYear());

    const onMonthChange = (event) => {
        setMonth(months[event.target.value].month);
    }
    const onYearChange = (event) => {
        setYear(event.target.value);
    }

    return (
        <>
            <h2>{month} {year}</h2>
            <Selector type='MONTH' onMonthChange={onMonthChange} onYearChange={onYearChange} />
        </>
    );
}

export default MonthSelector;