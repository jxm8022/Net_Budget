import React from "react";
import { months } from '../../../assets/months';
import { useSelector } from 'react-redux';
import './Selector.css';
import { categories } from "../../../assets/categories";

const TypeSelector = React.forwardRef((props, ref) => {
    return (
        <label>Type
            <select id='type' ref={ref}>
                {categories.map((category, index) => <option key={category.id} value={index}>{category.type}</option>)}
            </select>
        </label>
    );
})

const MonthSelector = (props) => {
    const { startYear, currentYear } = useSelector((state) => state.transaction);

    let activeYears = [];
    for (let i = startYear; i <= currentYear; i++) { activeYears.push(i) };

    return (
        <form className='month-input-form'>
            <label>Month
                <select id='type' defaultValue={new Date().getMonth()} onChange={props.onMonthChange}>
                    {months.map((month, index) => <option key={month.abb} value={index}>{month.abb}</option>)}
                </select>
            </label>
            <label>Year
                <select id='type' defaultValue={new Date().getFullYear()} onChange={props.onYearChange}>
                    {activeYears.map((year, index) => <option key={index} value={year}>{year}</option>)}
                </select>
            </label>
        </form>
    )
}

const YearSelector = (props) => {
    const { startYear, currentYear } = useSelector((state) => state.transaction);

    let activeYears = [];
    for (let i = startYear; i <= currentYear; i++) { activeYears.push(i) };

    return (
        <form className='year-input-form'>
            <label>Year
                <select id='type' defaultValue={new Date().getFullYear()} onChange={props.onYearChange}>
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
            selector = <TypeSelector ref={ref} />;
            break;
        case 'MONTH':
            selector = <MonthSelector onMonthChange={props.onMonthChange} onYearChange={props.onYearChange} />;
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