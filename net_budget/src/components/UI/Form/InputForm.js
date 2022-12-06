import { useRef, useState } from 'react';
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
    const [error, setError] = useState();

    const submitForm = (event) => {
        event.preventDefault();
        setError(false);

        const type = transType.current.value;
        const date = transDate.current.value;
        const name = transName.current.value;
        const amount = transAmount.current.value;

        if (type && date && name && amount) {
            const response = window.confirm(`Does the following information look correct?\nTransaction Type: ${type}\nTransaction Date: ${date}\nTransaction Name: ${name}\nTransaction Amount: $${amount}`);
            if (response) {
                transType.current.value = 'Need';
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
            <label>Type
                <select id='type' ref={transType}>
                    <option value='Need'>Need</option>
                    <option value='Want'>Want</option>
                    <option value='Savings'>Savings</option>
                    <option value='Debt Payment'>Debt Payment</option>
                    <option value='Income'>Income</option>
                </select>
            </label>
            <label>Date
                <input id='date' ref={transDate} type='date' defaultValue={defaultDate} min={minDate} max={maxDate}></input>
            </label>
            <label >Transaction
                <input id='name' ref={transName} type='text' placeholder='Transaction Name' style={{ width: '50%' }}></input>
            </label>
            <label>Amount
                <input id='amount' ref={transAmount} type='number' placeholder='$0' style={{ width: '25%' }}></input>
            </label>
            <button type='submit'>Add Transaction</button>
            {error && <p className='error'>Please input information!</p>}
        </form >
    );
}

export default InputForm;