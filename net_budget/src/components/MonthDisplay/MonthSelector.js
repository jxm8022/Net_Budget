import { months } from "../../assets/months";
import Selector from "../UI/Selector/Selector";
import './MonthSelector.css';

const MonthSelector = (props) => {
    const { monthIndex, year, onMonthChange, onYearChange } = props;
    return (
        <>
            <h2>{months[monthIndex].month} {year}</h2>
            <Selector type='MONTH' onMonthChange={onMonthChange} onYearChange={onYearChange} />
        </>
    );
}

export default MonthSelector;