import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { labels } from '../../../assets/labels';
import { TABLETYPES } from '../../../assets/constants';
import SortAscending from '../../../utilities/SortAscending';
import SortDescending from '../../../utilities/SortDescending';
import Table from '../../UI/Table/Table';

const MonthDetails = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { transactions } = useSelector((state) => state.transaction.monthOverview[searchParams.get('month')]);
    const [isSortAsc, setIsSortAsc] = useState(true);
    const [sortColumn, setSortColumn] = useState('Date');
    const [sortedTransactions, setSortedTransactions] = useState(transactions);

    useEffect(() => {
        setSortedTransactions(transactions);
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

    return (
        <>
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