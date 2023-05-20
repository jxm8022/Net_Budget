import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SortAscending from '../../utilities/SortAscending';
import SortDescending from '../../utilities/SortDescending';
import FilterData from '../../utilities/FilterData';
import Filter from '../UI/Filter/Filter';
import Table from '../UI/Table/Table';

const headers = ['Type', 'Date', 'Name', 'Amount'];

const MonthDetails = (props) => {
    const { monthIndex } = props;
    const { transactions } = useSelector((state) => state.transaction.monthOverview[monthIndex]);
    const [isSortAsc, setIsSortAsc] = useState(true);
    const [sortColumn, setSortColumn] = useState('Date');
    const [sortedTransactions, setSortedTransactions] = useState(transactions);
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        setSortedTransactions(transactions);
        setFilters([]);
        setSortColumn('Date');
        setIsSortAsc(true);
    }, [transactions]);

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
        const { type, filters } = data;
        setSortedTransactions(FilterData({
            type,
            filters,
            sortData: { isSortAsc, headers, sortColumn },
            transactions
        }));
    }

    const removeFilter = (data) => {
        const { type, filters } = data;
        setSortedTransactions(FilterData({
            type: type,
            filters,
            sortData: { isSortAsc, headers, sortColumn },
            transactions
        }));
    }

    const clearFilters = (type) => {
        setSortedTransactions(FilterData({
            type,
            transactions
        }));
    }

    return (
        <>
            <Filter
                nameOptions={transactions.map((transaction) => { return { id: transaction.id, name: transaction.name } })}
                filterTransactions={filterTransactions}
                setFilters={setFilters}
                filters={filters}
                removeFilter={removeFilter}
                clearFilters={clearFilters}
                monthIndex={monthIndex} />
            <Table
                headers={headers}
                dataType={'TRANSACTIONS'}
                data={sortedTransactions}
                isSortAsc={isSortAsc}
                sortColumn={sortColumn}
                sortTable={sortTransactions}
            />
        </>
    );
}

export default MonthDetails;