import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../../actions/transactionActions';
import { categories } from '../../../assets/categories';
import Selector from '../Selector/Selector';
import './InputForm.css';

const currentDate = new Date();
const defaultDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2 })}`;
const minDate = `${currentDate.getFullYear()}-01-01`;
const maxDate = `${currentDate.getFullYear() + 1}-01-07`;

const InputForm = () => {
    const transType = useRef();
    const transDate = useRef();
    const transName = useRef();
    const transAmount = useRef();
    const [selectedMonth, setSelectedMonth] = useState(defaultDate.split('-')[1] - 1);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const dateChanged = (event) => {
        setSelectedMonth(transDate.current.value.split('-')[1] - 1);
    }

    const submitForm = (event) => {
        event.preventDefault();
        setError(false);

        const type = transType.current.value;
        const date = transDate.current.value;
        const name = transName.current.value;
        const amount = parseFloat(transAmount.current.value);

        if (type && date && name && amount) {
            const response = window.confirm(`Does the following information look correct?\nTransaction Type: ${categories[type].type}\nTransaction Date: ${date}\nTransaction Name: ${name}\nTransaction Amount: $${amount}`);
            if (response) {
                dispatch(addTransaction(
                    {
                        type: parseInt(type),
                        date,
                        name: name.charAt(0).toUpperCase() + name.slice(1),
                        amount
                    }
                ));
                transType.current.value = 0;
                transDate.current.value = defaultDate;
                transName.current.value = null;
                transAmount.current.value = null;
            }
        } else {
            setError(true);
        }
    }

    return (
        <form className='input-form' onSubmit={submitForm}>
            <Selector ref={transType} type='TYPE' selectedMonth={selectedMonth} />
            <label>Date
                <input id='date' ref={transDate} type='date' onChange={dateChanged} defaultValue={defaultDate} min={minDate} max={maxDate}></input> {/* change min to previous year */}
            </label>
            <label >Transaction
                <input id='name' ref={transName} type='text' placeholder='Transaction Name' style={{ width: '50%' }}></input>
            </label>
            <label>Amount
                <input id='amount' ref={transAmount} type='number' step='0.01' placeholder='$0.00' style={{ width: '25%' }}></input>
            </label>
            <button type='submit'>Add Transaction</button>
            {error && <p className='error'>Please input information!</p>}
        </form >
    );
}

export default InputForm;