import { useState } from 'react';
import { categories } from '../../../assets/categories';
import sortAsc from '../../../assets/images/sorting/sortAscending.png';
import sortDesc from '../../../assets/images/sorting/sortDescending.png';
import Modal from '../Modal/Modal';
import './Table.css';

const Table = (props) => {
    const { headers, dataType, data, isSortAsc, sortColumn, sortTable, hideTable } = props;
    const [showModal, setShowModal] = useState();

    let sortImage = <img src={sortAsc} alt='Sorting Ascending' />;
    if (!isSortAsc) {
        sortImage = <img src={sortDesc} alt='Sorting Descending' />;
    }

    const updateRow = (rowData) => {
        setShowModal(rowData);
    }

    const closeModal = () => {
        setShowModal(null);
    }

    let table;

    if (dataType === 'TRANSACTIONS') {
        table = <table className="table">
            <thead>
                <tr>
                    {headers.map((header) => <th key={header} onClick={() => sortTable(header)}>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? data.map((item) => (
                    <tr key={item.id} onClick={() => updateRow(item)}>
                        <td>{categories[item.type].type}</td>
                        <td>{item.date}</td>
                        <td>{item.name}</td>
                        <td>${item.amount.toFixed(2)}</td>
                    </tr>
                )) : <tr style={{ height: '48px' }}><td> </td><td> </td><td> </td><td> </td></tr>}
            </tbody>
        </table>;
    }

    const textClass = (amount) => amount < 0 ? 'negative' : '';
    if (dataType === 'RATIOS') {
        table = <table className="table" onClick={hideTable}>
            <thead>
                <tr>
                    {headers.map((header) => <th key={header}>{header}{sortColumn === header && sortImage}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.type}</td>
                        <td>${item.available.toFixed(2)}</td>
                        <td className={textClass(item.remaining)}>${item.remaining.toFixed(2)}</td>
                    </tr>
                )) : <tr style={{ height: '48px' }}><td> </td><td> </td><td> </td></tr>}
            </tbody>
        </table>;
    }

    return (
        <>
            {showModal && <Modal data={showModal} closeModal={closeModal} />}
            {table}
        </>
    );
}

export default Table;