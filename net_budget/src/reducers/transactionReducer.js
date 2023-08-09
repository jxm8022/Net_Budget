import * as types from '../actions/actionTypes';
import { getOverview, sortTransactionsByDate } from '../utilities/ReducerHelper';

const initialState = {
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
        income: [],
        spent: [],
        net: []
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
                ],
            };
        case types.DELETE_RECURRING_TRANSACTION:
            let updatedRecurringTransactions = [...state.recurringTransactions].filter((transaction) => transaction.id !== action.payload);
            return {
                ...state,
                recurringTransactions: updatedRecurringTransactions
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
                recurringTransactions: recurringTransactions,
            };
        case types.LOAD_TRANSACTIONS:
            let data = action.payload;

            let loadedTransactions = [...initialState.monthOverview];
            let incomeData = [];
            let spentData = [];
            let netData = [];
            for (const month in data) {
                let monthTransactions = [];
                for (const transactionId in data[month]){
                    monthTransactions.push({
                        id: transactionId,
                        type: data[month][transactionId].type,
                        date: data[month][transactionId].date,
                        name: data[month][transactionId].name,
                        amount: data[month][transactionId].amount,
                    });
                }
                let monthOverview = getOverview(monthTransactions);

                /***********    GET LINE GRAPH DATA     *************/
                incomeData.push(monthOverview.incomeTotal.toFixed(2));
                spentData.push(monthOverview.transactionsTotal.toFixed(2));
                netData.push(monthOverview.net.toFixed(2));
                /***********    END LINE GRAPH DATA     *************/

                let monthIndex = parseInt(month)-1;
                loadedTransactions[monthIndex] = {
                    ...loadedTransactions[monthIndex],
                    net: monthOverview.net,
                    potNet: monthOverview.potNet,
                    projNet: monthOverview.projNet,
                    transactions: monthTransactions.sort(sortTransactionsByDate)
                };
            }

            let newGraphData = {
                income: incomeData,
                spent: spentData,
                net: netData,
            };

            return {
                ...state,
                monthOverview: loadedTransactions,
                graphData: newGraphData,
            };
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
            }
            return newDate;
        case types.LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default transactionReducer;