import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categories, labels } from '../../../resources/labels';
import { addTransaction } from '../../../actions/transactionActions';
import { addTransactionAPI } from '../../../api/TransactionAPI';
import { DATEFORMAT } from '../../../resources/constants';
import { FormatString, GetStringLength } from '../../../utilities/FormatData';
import Template from '../../UI/Template/Template';
import moment from 'moment/moment';
import './AddTransaction.css';

const AddTransaction = (props) => {
    const { transactionDictionary } = useSelector((state) => state.statistics);
    const { userId, token } = useSelector((state) => state.user);
    const [error, setError] = useState();
    const transType = useRef();
    const transDate = useRef();
    const transName = useRef();
    const transAmount = useRef();
    const dispatch = useDispatch();

    const validForm = () => {
        if (GetStringLength(transType.current.value) === 0) {
            return false;
        }

        if (GetStringLength(transDate.current.value) === 0) {
            return false;
        }

        if (GetStringLength(transName.current.value) === 0) {
            return false;
        }

        if (GetStringLength(transAmount.current.value) === 0) {
            return false;
        }

        return true;
    }

    const submitForm = (event) => {
        event.preventDefault();
        setError();
        
        if (!validForm()) {
            setError(true);
            return;
        }
        
        let formData = {
            type: parseInt(transType.current.value),
            date: moment(transDate.current.value).format(DATEFORMAT).toString(),
            name: FormatString(transName.current.value),
            amount: parseFloat(transAmount.current.value),
        };

        const response = window.confirm(`Does the following information look correct?\nTransaction Type: ${categories[formData.type].type}\nTransaction Date: ${formData.date}\nTransaction Name: ${formData.name}\nTransaction Amount: $${formData.amount}`);
        if (response) {
            addTransactionAPI(userId, formData, token).then((res) => {
                if (res) {
                    dispatch(addTransaction({
                        ...formData,
                        id: res.name
                    }));
                }
            });
        }
    }

    return (
        <Template>
            <h1>{labels.addTransactionTitle}</h1>
            <form className='transaction-input-form' onSubmit={submitForm} onFocus={() => {setError()}}>
                <label>{labels.type}
                    <select id='type' ref={transType}>
                        {categories.map((category, index) => {
                            return <option key={category.id} value={index}>{category.type}</option>})
                        }
                    </select>
                </label>
                <label>{labels.date}
                    <input
                        id='date'
                        ref={transDate}
                        type='date'
                        defaultValue={moment().format(DATEFORMAT).toString()}
                    ></input>
                </label>
                <label >{labels.transaction}
                    <input
                        id='name'
                        ref={transName}
                        type='text'
                        placeholder='Transaction Name'
                        style={{ width: '50%' }}
                        list='transactions'
                        name='transaction'
                        autoComplete='on'
                    ></input>
                    <datalist id='transactions'>
                        {transactionDictionary.map((trans, index) => <option key={index} value={trans} />)}
                    </datalist>
                </label>
                <label>{labels.amount}
                    <input
                        id='amount'
                        ref={transAmount}
                        type='number'
                        step='0.01'
                        placeholder='$0.00'
                        style={{ width: '25%' }}
                    ></input>
                </label>
                <button type='submit'>
                    {labels.addTransactionBtnLabel}
                </button>
                {error && <p className='error'>Please input information!</p>}
            </form >
        </Template>
    );
}

export default AddTransaction;