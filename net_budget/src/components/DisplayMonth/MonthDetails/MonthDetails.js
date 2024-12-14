import { useEffect, useState } from 'react';
import { labels, transactionCategories } from '../../../resources/labels';
import useLoadAccounts from '../../../utilities/customHooks/useLoadAccounts';
import useLoadTransactions from '../../../utilities/customHooks/useLoadTransactions';

const MonthDetails = () => {
    const [sortedTransactions, setSortedTransactions] = useState([]);
    const [, accountDictionary] = useLoadAccounts();
    const transactions = useLoadTransactions();

    /* Sort transactions by date then by name */
    useEffect(() => {
        let res = [];
        for (let id of Object.keys(transactions)) {
            res.push({id, ...transactions[id]});
        }

        res.sort((a,b) => {
            const dateCompare = a.date.localeCompare(b.date);
            return dateCompare !== 0 ? dateCompare : a.name.localeCompare(b.name);
        });

        setSortedTransactions(res);
    }, [transactions]);

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
                    {sortedTransactions.length > 0 ? sortedTransactions.map((t) => (
                        <tr key={t.id}>
                            <td>{accountDictionary[t.accountId]}</td>
                            <td>{getTypeLabel(t.typeId)}</td>
                            <td>{t.name}</td>
                            <td>${t.amount.toFixed(2)}</td>
                            <td>{t.date}</td>
                        </tr>
                    )) : <tr style={{ height: '48px' }}><td> </td><td> </td><td> </td><td> </td></tr>}
                </tbody>
            </table>
        </>
    );
}

export default MonthDetails;