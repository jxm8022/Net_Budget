import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment/moment';
import styled from "styled-components";
import { DATEFORMAT } from '../../resources/constants';
import { labels, transactionCategories } from '../../resources/labels';
import { FormatString, GetStringLength } from '../../utilities/FormatData';
import Template from '../UI/Template/Template';
import { addTransactionAPI } from '../../api/TransactionAPI';
import { addTransaction } from '../../actions/transactionActions';

const AddTransaction = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const { userId, token } = useSelector((state) => state.user);
    const { transactionDictionary } = useSelector((state) => state.statistics);
    const { accountLabels } = useSelector((state) => state.accounts);

    const [isError, setIsError] = useState(false);

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

    const submitForm = (event) => {
        event.preventDefault();
        setIsError(false);

        if (!validForm()) {
            setIsError(true);
            return;
        }

        const accountId = accountRef.current.value;
        const payload = {
            type: parseInt(categoryRef.current.value),
            date: moment(dateRef.current.value).format(DATEFORMAT).toString(),
            name: FormatString(nameRef.current.value),
            amount: parseFloat(amountRef.current.value),
        };
    
        const response = window.confirm(`Does the following information look correct?\nTransaction Type: ${transactionCategories[payload.type].type}\nTransaction Date: ${payload.date}\nTransaction Name: ${payload.name}\nTransaction Amount: $${payload.amount}`);
        if (response) {
            addTransactionAPI(userId, accountId, payload, token).then((res) => {
                if (res) {
                    clearValues();
                    dispatch(addTransaction({
                        ...payload,
                        id: res.name,
                        accountId: accountId,
                    }));
                }
            });
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
                            {accountLabels.map((account) => {
                                return <option key={account.id} value={account.id}>{account.label}</option>
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
                            {transactionDictionary.map((trans, index) => <option key={index} value={trans} />)}
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