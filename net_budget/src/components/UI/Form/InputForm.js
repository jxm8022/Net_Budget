import { useRef, useState } from 'react';
import { categories } from '../../../assets/categories';
import Selector from '../Selector/Selector';
import './InputForm.css';

const currentDate = new Date();
const defaultDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2 })}`;
const minDate = `${currentDate.getFullYear()}-01-01`;
const maxDate = `${currentDate.getFullYear() + 1}-01-07`;

const InputForm = (props) => {
    const { submitType, deleteTransaction, closeModal, transactionAction, defaults } = props;
    const transType = useRef();
    const transDate = useRef();
    const transName = useRef();
    const transAmount = useRef();
    const [selectedMonth, setSelectedMonth] = useState(defaultDate.split('-')[1] - 1);
    const [error, setError] = useState();

    const dateChanged = (event) => {
        setSelectedMonth(transDate.current.value.split('-')[1] - 1);
    }

    const submitForm = (event) => {
        event.preventDefault();
        setError(false);

        if (event.target.id === 'delete') {
            const response = window.confirm(`Are you sure you want to delete this transaction?`);
            if (response) {
                transactionAction({
                    submitType: 'Delete'
                });
                closeModal();
            }
        } else {
            const type = transType.current.value;
            const date = transDate.current.value;
            const name = transName.current.value;
            const amount = +parseFloat(transAmount.current.value).toFixed(2);

            if (type && date && name && amount) {
                const response = window.confirm(`Does the following information look correct?\nTransaction Type: ${categories[type].type}\nTransaction Date: ${date}\nTransaction Name: ${name}\nTransaction Amount: $${amount}`);
                if (response) {
                    transactionAction(
                        {
                            submitType,
                            transaction: {
                                type: parseInt(type),
                                date,
                                name: name.charAt(0).toUpperCase() + name.slice(1),
                                amount
                            }
                        }
                    );
                    transType.current.value = 0;
                    transDate.current.value = defaultDate;
                    transName.current.value = null;
                    transAmount.current.value = null;
                    if (submitType === 'Update')
                        closeModal();
                }
            } else {
                setError(true);
            }
        }
    }

    return (
        <form className='input-form' onSubmit={submitForm}>
            {deleteTransaction && <span id='delete' className='delete' onClick={submitForm}>&times;</span>}
            <Selector ref={transType} type='TYPE' defaultValue={defaults.type} selectedMonth={selectedMonth} />
            <label>Date
                <input id='date' ref={transDate} type='date' onChange={dateChanged} defaultValue={defaults.date} min={minDate} max={maxDate}></input> {/* change min to previous year */}
            </label>
            <label >Transaction
                <input id='name' ref={transName} type='text' defaultValue={defaults.name} placeholder='Transaction Name' style={{ width: '50%' }}></input>
            </label>
            <label>Amount
                <input id='amount' ref={transAmount} type='number' defaultValue={defaults.amount} step='0.01' placeholder='$0.00' style={{ width: '25%' }}></input>
            </label>
            <button type='submit'>{submitType} Transaction</button>
            {error && <p className='error'>Please input information!</p>}
        </form >
    );
}

export default InputForm;