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
    ]
}

const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_TRANSACTIONS:
            let data = action.payload;

            let loadedTransactions = [...initialState.monthOverview];
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
                let monthIndex = parseInt(month)-1;
                loadedTransactions[monthIndex] = {
                    ...loadedTransactions[monthIndex],
                    net: monthOverview.net,
                    potNet: monthOverview.potNet,
                    projNet: monthOverview.projNet,
                    transactions: monthTransactions.sort(sortTransactionsByDate)
                };
            }

            let newLoadState = {
                ...state,
                monthOverview: loadedTransactions
            }

            return newLoadState;
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
        default:
            return state;
    }
}

export default transactionReducer;