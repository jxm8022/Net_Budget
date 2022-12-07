import { categories } from '../../../assets/categories';
import './Table.css';

const Table = (props) => {
    const { transactions } = props;

    const selectItem = (event) => {
        console.log('clicked individual item');
        // alert(event.target.value);
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>
                        Type
                    </th>
                    <th>
                        Date
                    </th>
                    <th>
                        Name
                    </th>
                    <th>
                        Amount
                    </th>
                </tr>
            </thead>
            <tbody>
                {transactions.length > 0 ? transactions.map((item) => (
                    <tr key={item.id} onClick={selectItem}>
                        <td>{categories[item.type].type}</td>
                        <td>{item.date}</td>
                        <td>{item.name}</td>
                        <td>${item.amount.toFixed(2)}</td>
                    </tr>
                )) : <tr style={{ height: '48px' }}><td> </td><td> </td><td> </td><td> </td></tr>}
            </tbody>
        </table>
    );
}

export default Table;