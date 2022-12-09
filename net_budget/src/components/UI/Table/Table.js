import { categories } from '../../../assets/categories';
import sortAsc from '../../../assets/images/sorting/sortAscending.png';
import sortDesc from '../../../assets/images/sorting/sortDescending.png';
import './Table.css';

const Table = (props) => {
    const { headers, data, selectItem, isSortAsc, sortColumn, sortTable } = props;

    let sortImage = <img src={sortAsc} alt='Sorting Ascending' />;
    if (!isSortAsc) {
        sortImage = <img src={sortDesc} alt='Sorting Descending' />;
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    {headers.map((header) => <th key={header} onClick={() => sortTable(header)}>{header}{sortColumn === header && sortImage}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? data.map((item) => (
                    <tr key={item.id} onClick={() => selectItem(item)}>
                        <td>{categories[item.type].type}</td>
                        <td>{item.date}</td>
                        <td>{item.name}</td>
                        <td>${item.amount}</td>
                    </tr>
                )) : <tr style={{ height: '48px' }}><td> </td><td> </td><td> </td><td> </td></tr>}
            </tbody>
        </table>
    );
}

export default Table;