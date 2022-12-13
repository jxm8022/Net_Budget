import React from "react";
import { months } from '../../../assets/months';
import { useSelector } from 'react-redux';
import './Selector.css';
import { categories } from "../../../assets/categories";

const currentDate = new Date();
const currentMonth = currentDate.getMonth();

const TypeSelector = React.forwardRef((props, ref) => {
    const { defaultValue, selectedMonth, addApply } = props;
    let filteredOptions = [...categories];

    if (currentMonth !== selectedMonth) {
        filteredOptions = categories.filter((category) => category.id < 6);
    }

    return (
        <label>Type
            <select id='type' defaultValue={defaultValue} ref={ref}>
                {filteredOptions.map((category, index) => <option key={category.id} value={index}>{category.type}</option>)}
            </select>
            {addApply && <button type='submit'>Apply</button>}
        </label>
    );
})

const MonthSelector = (props) => {
    const { prevMonth, prevYear, setSearchParams } = props.setSearchParams;
    const { startYear } = useSelector((state) => state.user);
    const { currentYear } = useSelector((state) => state.transaction);

    let activeYears = [];
    for (let i = startYear; i <= currentYear; i++) { activeYears.push(i) };

    const setParameters = (event) => {
        switch (event.target.id) {
            case 'month':
                setSearchParams(`month=${event.target.value}&year=${prevYear}`);
                break;
            case 'year':
                setSearchParams(`month=${prevMonth}&year=${event.target.value}`);
                break;
            default:
                break;
        }
    }

    return (
        <form className='month-input-form' onChange={setParameters}>
            <label>Month
                <select id='month' defaultValue={prevMonth}>
                    {months.map((month, index) => <option key={month.abb} value={index}>{month.abb}</option>)}
                </select>
            </label>
            <label>Year
                <select id='year' defaultValue={prevYear}>
                    {activeYears.map((year, index) => <option key={index} value={year}>{year}</option>)}
                </select>
            </label>
        </form>
    )
}

const YearSelector = (props) => {
    const { startYear } = useSelector((state) => state.user);
    const { currentYear } = useSelector((state) => state.transaction);

    let activeYears = [];
    for (let i = startYear; i <= currentYear; i++) { activeYears.push(i) };

    return (
        <form className='year-input-form'>
            <label>Year
                <select id='type' defaultValue={currentYear} onChange={props.onYearChange}>
                    {activeYears.map((year, index) => <option key={index} value={year}>{year}</option>)}
                </select>
            </label>
        </form>
    )
}

// props = { type , currentMonth, currentYear, onMonthChange, onYearChange}
const Selector = React.forwardRef((props, ref) => {
    let selector;

    switch (props.type) {
        case 'TYPE':
            selector = <TypeSelector ref={ref} defaultValue={props.defaultValue} selectedMonth={props.selectedMonth} addApply={props.addApply} />;
            break;
        case 'MONTH':
            selector = <MonthSelector setSearchParams={props.setSearchParams} />;
            break;
        case 'YEAR':
            selector = <YearSelector onYearChange={props.onYearChange} />
            break;
        default:
            selector = <p style={{ color: 'red' }}>Error!</p>;
    }

    return (
        <>
            {selector}
        </>
    );
})

export default Selector;