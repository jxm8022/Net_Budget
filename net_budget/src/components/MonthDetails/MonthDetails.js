import { useState } from 'react';
import { useSelector } from 'react-redux';
import SortAscending from '../../utilities/SortAscending';
import SortDescending from '../../utilities/SortDescending';
import FilterData from '../../utilities/FilterData';
import Filter from '../UI/Filter/Filter';
import Table from '../UI/Table/Table';

const headers = ['Type', 'Date', 'Name', 'Amount'];

const selectItem = (item) => {
    console.log(item);
}

const MonthDetails = (props) => {
    const { monthIndex } = props;
    const { transactions } = useSelector((state) => state.transaction.monthOverview[monthIndex]);
    const [isSortAsc, setIsSortAsc] = useState(true);
    const [sortColumn, setSortColumn] = useState('Date');
    const [sortedTransactions, setSortedTransactions] = useState(transactions);

    const sortTransactions = (header) => {
        if (header === sortColumn) {
            setIsSortAsc((prev) => !prev);
            if (isSortAsc) {
                setSortedTransactions((prev) => SortDescending({
                    type: header,
                    headers,
                    transactions: [...prev]
                }));
            } else {
                setSortedTransactions((prev) => SortAscending({
                    type: sortColumn,
                    headers,
                    transactions: [...prev]
                }));
            }
        } else {
            setSortColumn(header);
            setIsSortAsc(true);
            setSortedTransactions((prev) => SortAscending({
                type: header,
                headers,
                transactions: [...prev]
            }));
        }
    }

    const filterTransactions = (data) => {
        const { type, filter } = data;
        setSortedTransactions(FilterData({
            type,
            filter,
            sortedTransactions
        }));
    }

    return (
        <>
            <Filter filterTransactions={filterTransactions} monthIndex={monthIndex} />
            <Table
                headers={headers}
                data={sortedTransactions}
                selectItem={selectItem}
                isSortAsc={isSortAsc}
                sortColumn={sortColumn}
                sortTable={sortTransactions}
            />
        </>
    );
}

export default MonthDetails;