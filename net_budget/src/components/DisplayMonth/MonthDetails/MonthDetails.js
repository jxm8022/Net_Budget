import { labels, transactionCategories } from '../../../resources/labels';
import useLoadAccounts from '../../../utilities/customHooks/useLoadAccounts';
import useLoadTransactions from '../../../utilities/customHooks/useLoadTransactions';

const MonthDetails = () => {
    const [, accountDictionary] = useLoadAccounts();
    const transactions = useLoadTransactions();

    const getTypeLabel = (typeId) => transactionCategories.find(c => c.id === typeId)?.type ?? 'No type found';

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        {labels.transactionHeaders.map((header) => <th key={header}>{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(transactions).length > 0 ? Object.keys(transactions).map((id) => (
                        <tr key={id}>
                            <td>{accountDictionary[transactions[id].accountId]}</td>
                            <td>{getTypeLabel(transactions[id].typeId)}</td>
                            <td>{transactions[id].name}</td>
                            <td>${transactions[id].amount.toFixed(2)}</td>
                            <td>{transactions[id].date}</td>
                        </tr>
                    )) : <tr style={{ height: '48px' }}><td> </td><td> </td><td> </td><td> </td></tr>}
                </tbody>
            </table>
        </>
    );
}

export default MonthDetails;