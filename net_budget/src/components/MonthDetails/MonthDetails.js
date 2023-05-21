import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { labels } from '../../assets/labels';
import { TABLETYPES } from '../../assets/constants';
import SortAscending from '../../utilities/SortAscending';
import SortDescending from '../../utilities/SortDescending';
import FilterData from '../../utilities/FilterData';
import Filter from '../UI/Filter/Filter';
import Table from '../UI/Table/Table';

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
                    headers: labels.transactionHeaders,
                    transactions: [...prev]
                }));
            } else {
                setSortedTransactions((prev) => SortAscending({
                    type: sortColumn,
                    headers: labels.transactionHeaders,
                    transactions: [...prev]
                }));
            }
        } else {
            setSortColumn(header);
            setIsSortAsc(true);
            setSortedTransactions((prev) => SortAscending({
                type: header,
                headers: labels.transactionHeaders,
                transactions: [...prev]
            }));
        }
    }

    const filterTransactions = (data) => {
        const { type, filters } = data;
        setSortedTransactions(FilterData({
            type,
            filters,
            sortData: { isSortAsc, headers: labels.transactionHeaders, sortColumn },
            transactions
        }));
    }

    const removeFilter = (data) => {
        const { type, filters } = data;
        setSortedTransactions(FilterData({
            type: type,
            filters,
            sortData: { isSortAsc, headers: labels.transactionHeaders, sortColumn },
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
                headers={labels.transactionHeaders}
                dataType={TABLETYPES.TRANSACTIONS}
                data={sortedTransactions}
                isSortAsc={isSortAsc}
                sortColumn={sortColumn}
                sortTable={sortTransactions}
            />
        </>
    );
}

export default MonthDetails;