import { useState } from "react";
import { useSelector } from "react-redux";
import { months, labels } from "../../assets/labels";
import { 
    RATIOS,
    SELECTORTYPES,
    TABLETYPES,
    TYPES
} from "../../assets/constants";
import Table from '../UI/Table/Table';
import Selector from "../UI/Selector/Selector";
import './MonthSelector.css';

const MonthSelector = (props) => {
    const { monthIndex, year, setSearchParams } = props;
    const { transactions } = useSelector((state) => state.transaction.monthOverview[monthIndex]);
    const [visibility, setVisibility] = useState('none');

    /* Ratio data */
    const data = [
        { id: 0, type: 'Need', available: 0, remaining: 0 },
        { id: 1, type: 'Want', available: 0, remaining: 0 },
        { id: 2, type: 'Savings/Debt', available: 0, remaining: 0 }
    ];

    /* Calculate incomeTotal and remaining */
    let incomeTotal = 0;
    transactions.forEach(transaction => {
        switch (transaction.type) {
            case TYPES.WANT:
                data[1].remaining -= transaction.amount;
                break;
            case TYPES.NEED:
                data[0].remaining -= transaction.amount;
                break;
            case TYPES.SAVINGS:
            case TYPES.DEBT:
                data[2].remaining -= transaction.amount;
                break;
            case TYPES.INCOME:
                incomeTotal += transaction.amount;
                break;
            case TYPES.PTRANSACTION:
                break;
            case TYPES.PINCOME:
                incomeTotal += transaction.amount;
                break;
            default:
                break;
        }
    });

    /* Set available and remaining */
    data[0].available = incomeTotal * RATIOS.NEED;
    data[1].available = incomeTotal * RATIOS.WANT;
    data[2].available = incomeTotal * RATIOS.SAVINGS;

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
            <Selector type={SELECTORTYPES.MONTH} setSearchParams={setSearchParams} />
            <img
                onClick={tableVisibility}
                alt='Toggle table.'
                className='table-toggle'
                style={{ display: buttonVisibility }}
            />
            {visibility === 'block' && <Table
                headers={labels.ratioHeaders}
                dataType={TABLETYPES.RATIOS}
                data={data}
                hideTable={tableVisibility}
            />}
        </>
    );
}

export default MonthSelector;