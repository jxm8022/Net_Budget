import * as types from '../actions/actionTypes';
import { getTransactionsOverview, sortRecurringTransactionsByDayAsc, sortTransactionsByDate } from '../utilities/ReducerHelper';

const initialState = {
    transactions: {},
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    monthOverview: [
        { potNet: 0, projNet: 0, net: 0, transactions: [] },
        { potNet: 0, projNet: 0, net: 0, transactions: [] },
        { potNet: 0, projNet: 0, net: 0, transactions: [] },
        { potNet: 0, projNet: 0, net: 0, transactions: [] },
        { potNet: 0, projNet: 0, net: 0, transactions: [] },
        { potNet: 0, projNet: 0, net: 0, transactions: [] },
        { potNet: 0, projNet: 0, net: 0, transactions: [] },
        { potNet: 0, projNet: 0, net: 0, transactions: [] },
        { potNet: 0, projNet: 0, net: 0, transactions: [] },
        { potNet: 0, projNet: 0, net: 0, transactions: [] },
        { potNet: 0, projNet: 0, net: 0, transactions: [] },
        { potNet: 0, projNet: 0, net: 0, transactions: [] }
    ],
    recurringTransactions: [],
    graphData: {
        income: [0,0,0,0,0,0,0,0,0,0,0,0],
        spent: [0,0,0,0,0,0,0,0,0,0,0,0],
        net: [0,0,0,0,0,0,0,0,0,0,0,0]
    },
}

const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_RECURRING_TRANSACTION:
            return {
                ...state,
                recurringTransactions: [
                    ...state.recurringTransactions,
                    action.payload
                ].sort(sortRecurringTransactionsByDayAsc),
            };
        case types.DELETE_RECURRING_TRANSACTION:
            let updatedRecurringTransactions = [...state.recurringTransactions].filter((transaction) => transaction.id !== action.payload);
            return {
                ...state,
                recurringTransactions: updatedRecurringTransactions.sort(sortRecurringTransactionsByDayAsc)
            };
        case types.LOAD_RECURRING_TRANSACTIONS:
            let recurringData = action.payload;
            let recurringTransactions = [];
            for (const transactionId in recurringData) {
                recurringTransactions.push({
                    id: transactionId,
                    type: recurringData[transactionId].type,
                    occurrenceType: recurringData[transactionId].occurrenceType,
                    occurrenceValue: recurringData[transactionId].occurrenceValue,
                    name: recurringData[transactionId].name,
                    amount: recurringData[transactionId].amount,
                });
            }

            return {
                ...state,
                recurringTransactions: recurringTransactions.sort(sortRecurringTransactionsByDayAsc),
            };
        case types.LOAD_TRANSACTIONS:
            let loadTransactionsState = structuredClone(state);
            loadTransactionsState.transactions = action.payload ?? {};
            return loadTransactionsState;
        case types.SET_DATE:
            const { month, year } = action.payload;
            let newDate = { ...state };
            if (!isNaN(month)) {
                newDate = {
                    ...state,
                    currentMonth: month
                }
            } else {
                newDate = {
                    ...state,
                    currentYear: year
                }
                localStorage.setItem('currentDisplayYear', year);
            }
            return newDate;
        case types.DELETE_ALL_TRANSACTIONS:
            return {
                ...state,
                monthOverview: initialState.monthOverview,
                recurringTransactions: initialState.recurringTransactions,
                graphData: initialState.graphData,
            }
        case types.LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default transactionReducer;