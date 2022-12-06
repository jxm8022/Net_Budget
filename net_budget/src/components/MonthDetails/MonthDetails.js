import { useSelector } from 'react-redux';
import Table from '../UI/Table/Table';

const MonthDetails = () => {
    const { transactions } = useSelector((state) => state.transaction.monthOverview[new Date().getMonth()]);

    return (
        <Table transactions={transactions} />
    );
}

export default MonthDetails;