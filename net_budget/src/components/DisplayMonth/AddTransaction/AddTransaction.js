import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { categories, labels, occurrenceTypes } from '../../../resources/labels';
import { addRecurringTransaction, addTransaction } from '../../../actions/transactionActions';
import { addTransactionAPI } from '../../../api/TransactionAPI';
import { DATEFORMAT, DAYS, TYPES } from '../../../resources/constants';
import { FormatString, GetStringLength } from '../../../utilities/FormatData';
import Template from '../../UI/Template/Template';
import moment from 'moment/moment';
import './AddTransaction.css';
import { addRecurringTransactionAPI } from '../../../api/recurringTransactionsAPI';

const AddTransaction = (props) => {
    const [searchParams, setSearchParams] = useSearchParams(); // searchParams.get('type');
    const { transactionDictionary } = useSelector((state) => state.statistics);
    const { userId, token } = useSelector((state) => state.user);
    const [error, setError] = useState();
    const [isRecurringType, setIsRecurringType] = useState();
    const [isDay, setIsDay] = useState(true);
    const transType = useRef();
    const transDate = useRef();
    const transName = useRef();
    const transAmount = useRef();
    const subtype = useRef();
    const occurrenceType = useRef();
    const day = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        if (parseInt(transType.current.value) === TYPES.RECURRING) {
            setIsRecurringType(true);
        }
    }, [searchParams]);

    const validForm = () => {
        if (GetStringLength(transType.current.value) === 0) {
            return false;
        }

        if (!isRecurringType && GetStringLength(transDate.current.value) === 0) {
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

        if (isRecurringType) {
            submitRecurringTransaction();
        } else {
            submitTransaction();
        }
    }

    const submitRecurringTransaction = () => {
        let formData = {
            type: parseInt(subtype.current.value),
            occurrenceType: parseInt(occurrenceType.current.value),
            occurrenceValue: day.current?.value ? parseInt(day.current.value) : null,
            name: FormatString(transName.current.value),
            amount: parseFloat(transAmount.current.value),
        };

        const response = window.confirm(`Does the following information look correct?\nTransaction Type: ${categories[parseInt(transType.current.value)].type}\nTransaction Date: ${occurrenceTypes[formData.occurrenceType].type}\nTransaction Name: ${formData.name}\nTransaction Amount: $${formData.amount}`);
        if (response) {
            addRecurringTransactionAPI(userId, formData, token).then((res) => {
                if (res) {
                    dispatch(addRecurringTransaction({
                        ...formData,
                        id: res.name
                    }));
                }
            });
        }
    }
    
    const submitTransaction = () => {
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

    const checkForRecurring = () => {
        if (parseInt(transType.current.value) === TYPES.RECURRING) {
            setIsRecurringType(true);
        } else {
            setIsRecurringType(false);
        }
    }

    const checkOccurrence = () => {
        if (parseInt(occurrenceType.current.value) === occurrenceTypes[0].id) {
            setIsDay(true);
        } else {
            setIsDay(false);
        }
    }

    return (
        <Template>
            <h1>{labels.addTransactionTitle}</h1>
            <form className='transaction-input-form' onSubmit={submitForm} onFocus={() => {setError()}}>
                <label>{labels.type}
                    <select id='type' ref={transType} defaultValue={searchParams.get('type')} onChange={checkForRecurring}>
                        {categories.map((category, index) => {
                            return <option key={category.id} value={index}>{category.type}</option>})
                        }
                    </select>
                </label>
                {
                    isRecurringType ? 
                    <>
                        <label>{labels.subtype}
                            <select id='subtype' ref={subtype}>
                                {categories.filter((category) => category.id === TYPES.PINCOME || category.id === TYPES.PTRANSACTION).map((category) => {
                                    return <option key={category.id} value={category.id}>{category.type}</option>})
                                }
                            </select>
                        </label>
                        <label>{labels.occurrence}
                            <select id='occurrence' ref={occurrenceType} onChange={checkOccurrence}>
                                {occurrenceTypes.map((category, index) => {
                                    return <option key={category.id} value={index}>{category.type}</option>})
                                }
                            </select>
                            { isDay ?
                                <select id='day' ref={day}>
                                {Array.from({length: DAYS}, (_, i) => i+1).map((day) => {
                                    return <option key={day} value={day}>{day}</option>})
                                }
                            </select> : <></>
                            }
                        </label>
                    </>
                    :
                    <label>{labels.date}
                        <input
                            id='date'
                            ref={transDate}
                            type='date'
                            defaultValue={moment().format(DATEFORMAT).toString()}
                        ></input>
                    </label>
                }
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