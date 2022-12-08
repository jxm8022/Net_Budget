import FilteredBy from './FilteredBy/FilteredBy';
import openedFilter from '../../../assets/images/sorting/solidFilter.png';
import closedFilter from '../../../assets/images/sorting/hollowFilter.png';
import './Filter.css';
import { useRef, useState } from 'react';
import Selector from '../Selector/Selector';
import { categories } from '../../../assets/categories';

const currentDate = new Date();
const defaultDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2 })}`;

const Filter = (props) => {
    const { filterTransactions, monthIndex } = props;
    const transType = useRef();
    const transDate = useRef();
    const transName = useRef();
    const transAmount = useRef();
    const [visibility, setVisibility] = useState('hidden');
    const [filterImage, setFilterImage] = useState(closedFilter);
    const [filters, setFilters] = useState([]);

    const showFilter = () => {
        if (visibility === 'hidden') {
            setFilterImage(openedFilter);
            setVisibility('visible');
        }
        if (visibility === 'visible') {
            setFilterImage(closedFilter);
            setVisibility('hidden');
        }
    }

    const typeFilter = (event) => { // if already exists do nothing
        event.preventDefault();
        const typeIndex = parseInt(transType.current.value);
        setFilterImage(closedFilter);
        setVisibility('hidden');
        setFilters((prev) => [...prev, { id: prev.length, type: categories[typeIndex].type }]);
        filterTransactions({
            type: 'ADD',
            filter: typeIndex
        });
    }

    const dateFilter = (event) => {
        event.preventDefault();
        const date = transDate.current.value;
        setFilterImage(closedFilter);
        setVisibility('hidden');
        setFilters((prev) => [...prev, { id: prev.length, type: date }]);
    }

    const nameFilter = (event) => {
        event.preventDefault();
        const name = transName.current.value;
        setFilterImage(closedFilter);
        setVisibility('hidden');
        setFilters((prev) => [...prev, { id: prev.length, type: name.charAt(0).toUpperCase() + name.slice(1) }]);
    }

    const amountFilter = (event) => {
        event.preventDefault();
        const amount = parseInt(transAmount.current.value).toFixed(2);
        setFilterImage(closedFilter);
        setVisibility('hidden');
        setFilters((prev) => [...prev, { id: prev.length, type: amount }]);
    }

    return (
        <>
            <div className="filter">
                {filters.map((filter) => <FilteredBy key={filter.id} type={filter.type} />)}
                <div className='filtertooltip'>
                    <img src={filterImage} alt='Filter table' onClick={showFilter} />
                    <span className='filtertooltiptext' style={{ visibility: visibility }}>
                        <form onSubmit={typeFilter}>
                            <Selector ref={transType} type='TYPE' selectedMonth={monthIndex} addApply={true} />
                        </form>
                        <form onSubmit={dateFilter}>
                            <label>Date
                                <input id='date' ref={transDate} type='date' defaultValue={defaultDate}></input>
                                <button type='submit'>Apply</button>
                            </label>
                        </form>
                        <form onSubmit={nameFilter}>
                            <label>Name
                                <input id='name' ref={transName} type='text' placeholder='Transaction Name' style={{ width: '50%' }}></input>
                                <button type='submit'>Apply</button>
                            </label>
                        </form>
                        <form onSubmit={amountFilter}>
                            <label>Amount
                                <input id='amount' ref={transAmount} type='number' step='0.01' placeholder='$0.00' style={{ width: '25%' }}></input>
                                <button type='submit'>Apply</button>
                            </label>
                        </form>
                    </span>
                </div>
            </div>
        </>
    );
}

export default Filter;