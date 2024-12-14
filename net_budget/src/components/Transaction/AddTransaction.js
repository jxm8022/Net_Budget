import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment/moment';
import styled from "styled-components";
import { DATEFORMAT, EXPENSETYPES } from '../../resources/constants';
import { labels, transactionCategories } from '../../resources/labels';
import { FormatString, GetStringLength } from '../../utilities/FormatData';
import Template from '../UI/Template/Template';
import { addTransactionAPI, patchTransactionDictionary } from '../../api/TransactionAPI';
import useLoadAccounts from '../../utilities/customHooks/useLoadAccounts';
import { updateAccountAPI } from '../../api/accountAPI';
import { fetchAccountMonthStatistics, patchAccountMonthStatistics } from '../../api/statisticsAPI';
import { updateAccount } from '../../actions/accountActions';
import useLoadDictionary from '../../utilities/customHooks/useLoadDictionary';
import { addDictionaryItem } from '../../actions/transactionActions';

const AddTransaction = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const { userId, token } = useSelector((state) => state.user);

    const [isError, setIsError] = useState(false);

    const [accounts, accountDictionary] = useLoadAccounts();
    const dictionary = useLoadDictionary();

    const accountRef = useRef();
    const categoryRef = useRef();
    const dateRef = useRef();
    const nameRef = useRef();
    const amountRef = useRef();

    const defaultDate = moment().month(searchParams.get('month'))
                                .startOf('month')
                                .year(searchParams.get('year'))
                                .format(DATEFORMAT).toString();

    const clearValues = () => {
        nameRef.current.value = '';
        amountRef.current.value = '';
    }

    const validForm = () => {
        if (GetStringLength(accountRef.current.value) === 0) {
            return false;
        }

        if (GetStringLength(categoryRef.current.value) === 0) {
            return false;
        }

        if (GetStringLength(dateRef.current.value) === 0) {
            return false;
        }

        if (GetStringLength(nameRef.current.value) === 0) {
            return false;
        }

        if (GetStringLength(amountRef.current.value) === 0) {
            return false;
        }

        return true;
    }
    
    const submitForm = async (event) => {
        event.preventDefault();
        setIsError(false);
        
        if (!validForm()) {
            setIsError(true);
            return;
        }
        
        const payload = {
            accountId: accountRef.current.value,
            typeId: parseInt(categoryRef.current.value),
            date: moment(dateRef.current.value).format(DATEFORMAT).toString(),
            name: FormatString(nameRef.current.value),
            amount: parseFloat(amountRef.current.value),
        };
        
        const response = window.confirm(`Does the following information look correct?\nTransaction Type: ${transactionCategories[payload.typeId].type}\nTransaction Date: ${payload.date}\nTransaction Name: ${payload.name}\nTransaction Amount: $${payload.amount}`);
        if (response) {
            await addTransaction(payload);
            clearValues();
        }
    }

    const isExpense = (typeId) => EXPENSETYPES.includes(typeId);

    const addTransaction = async (payload) => {
        const year = payload.date.substring(0, 4);
        const month = payload.date.substring(5, 7);

        /* Add transaction */
        addTransactionAPI(userId, payload, token);

        /* Update account current balance */
        let updatedAmount = isExpense(payload.typeId) ? -payload.amount : payload.amount;
        let updatePayload = {currentBalance: accounts[payload.accountId].currentBalance + updatedAmount};
        updateAccountAPI(userId, payload.accountId, updatePayload, token);
        dispatch(updateAccount({accountId: payload.accountId, currentBalance: updatePayload.currentBalance}));

        /* Update account statistics */
        const patchPayload = await fetchAccountMonthStatistics(userId, payload.accountId, year, month, token) ?? {income: 0, expenses: 0};

        if (isExpense(payload.typeId)) {
            patchPayload.expenses += payload.amount;
        } else {
            patchPayload.income += payload.amount;
        }

        patchAccountMonthStatistics(userId, payload.accountId, year, month, patchPayload, token);

        /* Update dictionary */
        if (Object.keys(dictionary).findIndex(d => d === payload.name) === -1) {
            let dictionaryPayload = {[payload.name]: payload.name};
            patchTransactionDictionary(userId, dictionaryPayload, token);
            dispatch(addDictionaryItem(dictionaryPayload));
        }
    }

    return (
        <Template>
            <TransactionWrapper>
                <h1>{labels.addTransactionTitle}</h1>
                <form className='transaction-input-form' onSubmit={submitForm} onFocus={() => { setIsError(false) }}>
                    <label>
                        <p>{labels.account}</p>
                        <select id='account' ref={accountRef}>
                            {Object.keys(accountDictionary).map((id) => {
                                return <option key={id} value={id}>{accountDictionary[id]}</option>
                            })
                            }
                        </select>
                    </label>
                    <label>
                        <p>{labels.type}</p>
                        <select id='type' ref={categoryRef}>
                            {transactionCategories.map((category, index) => {
                                return <option key={category.id} value={index}>{category.type}</option>
                            })}
                        </select>
                    </label>
                    <label>
                        <p>{labels.date}</p>
                        <input
                            id='date'
                            ref={dateRef}
                            type='date'
                            defaultValue={defaultDate}
                        ></input>
                    </label>
                    <label>
                        <p>{labels.name}</p>
                        <input
                            id='name'
                            ref={nameRef}
                            type='text'
                            placeholder='Name'
                            list='transactions'
                            name='name'
                            autoComplete='on'
                        ></input>
                        <datalist id='transactions'>
                            {Object.keys(dictionary).map((key) => <option key={key} value={dictionary[key]} />)}
                        </datalist>
                    </label>
                    <label>
                        <p>{labels.amount}</p>
                        <input
                            id='amount'
                            ref={amountRef}
                            type='number'
                            step='0.01'
                            placeholder='$0.00'
                            style={{ width: '25%' }}
                        ></input>
                    </label>
                    <button type='submit'>
                        {labels.addTransactionBtnLabel}
                    </button>
                    {isError && <p className='error'>Please input information!</p>}
                </form >
            </TransactionWrapper>
        </Template>
    );
}

export default AddTransaction;

const TransactionWrapper = styled.div`
    /* mobile */
    .transaction-input-form {
        margin: 10px 10px 40px 10px;
        padding: 20px;
        width: 90%;
    }

    .transaction-input-form label {
        padding: 10px;
        display: block;
        height: 60px;
    }

    .transaction-input-form p {
        margin: 10px 0px;
        padding: 0px 10px;
        float: left;
        font-weight: 600;
    }

    .transaction-input-form label select,
    .transaction-input-form label input {
        margin: 10px;
    }

    .transaction-input-form select, input {
        cursor: pointer;
        border: none;
        border-radius: 50px;
        margin: 10px 0px;
        padding: 0px 10px;
        font: inherit;
        font-size: .75em;
        outline: none;
    }

    .transaction-input-form button {
        float: right;
        cursor: pointer;
        border: none;
        border-radius: 50px;
        margin: 10px 0px;
        padding: 10px 20px;
        font: inherit;
    }

    #name {
        width: 42%;
    }

    /* tablets */
    @media only screen and (min-width: 600px) {
        .transaction-input-form {
            width: 60%;
        }
    }

    /* desktop */
    @media only screen and (min-width: 900px) {
        .transaction-input-form {
            width: 40%;
        }

        #name {
            width: 50%;
        }
    }

    @media (prefers-color-scheme: dark) {
        .transaction-input-form select, input {
            border: 1px solid var(--pink);
            background-color: var(--teal);
            color: var(--pink);
        }

        .transaction-input-form button {
            background-color: var(--pink);
            color: var(--teal);
        }
    }

    @media (prefers-color-scheme: light) {
        .transaction-input-form select, input {
            border: 1px solid var(--teal);
            background-color: var(--pink);
            color: var(--teal);
        }

        .transaction-input-form button {
            background-color: var(--teal);
            color: var(--pink);
        }
    }
`;