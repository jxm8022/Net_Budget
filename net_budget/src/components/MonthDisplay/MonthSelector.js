import { useState } from "react";
import { months } from "../../assets/months";
import Table from '../UI/Table/Table';
import Selector from "../UI/Selector/Selector";
import './MonthSelector.css';
import { useSelector } from "react-redux";

const headers = ['Type', 'Available', 'Remaining'];

const MonthSelector = (props) => {
    const { monthIndex, year, setSearchParams } = props;
    const { transactions } = useSelector((state) => state.transaction.monthOverview[monthIndex]);
    const [visibility, setVisibility] = useState('none');

    const data = [
        { id: 0, type: 'Need', available: 0, remaining: 0 },
        { id: 1, type: 'Want', available: 0, remaining: 0 },
        { id: 2, type: 'Savings/Debt', available: 0, remaining: 0 }
    ];

    /* Calculate incomeTotal and remaining */
    let incomeTotal = 0;
    transactions.forEach(transaction => {
        switch (transaction.type) {
            case 0:
                data[1].remaining -= transaction.amount;
                break;
            case 1:
                data[0].remaining -= transaction.amount;
                break;
            case 2:
            case 3:
                data[2].remaining -= transaction.amount;
                break;
            case 4:
                incomeTotal += transaction.amount;
                break;
            case 5:
                break;
            case 6:
                incomeTotal += transaction.amount;
                break;
            default:
                break;
        }
    });

    /* Set available and remaining */
    data[0].available = incomeTotal * .5;
    data[1].available = incomeTotal * .3;
    data[2].available = incomeTotal * .2;

    data[0].remaining += data[0].available;
    data[1].remaining += data[1].available;
    data[2].remaining += data[2].available;

    const tableVisibility = () => {
        if (visibility === 'none') setVisibility('block')
        else setVisibility('none')
    }

    const buttonVisibility = visibility === 'none' ? 'block' : 'none';

    return (
        <>
            <h2>{months[monthIndex].month} {year}</h2>
            <Selector type='MONTH' setSearchParams={setSearchParams} />
            <img
                onClick={tableVisibility}
                alt='Toggle table.'
                className='table-toggle'
                style={{ display: buttonVisibility }}
            />
            {visibility === 'block' && <Table
                headers={headers}
                dataType={'RATIOS'}
                data={data}
                hideTable={tableVisibility}
            />}
        </>
    );
}

export default MonthSelector;