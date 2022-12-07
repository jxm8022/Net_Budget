import { useSelector } from 'react-redux';
import Table from '../UI/Table/Table';

const MonthDetails = (props) => {
    const { monthIndex } = props;
    const { transactions } = useSelector((state) => state.transaction.monthOverview[monthIndex]);

    return (
        <Table transactions={transactions} />
    );
}

export default MonthDetails;