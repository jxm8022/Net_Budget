import * as types from '../actions/actionTypes';

const initialState = {
    startYear: new Date().getFullYear(),
    currentYear: new Date().getFullYear() + 1,
    previousYear: null,
    monthOverview: [
        { potentialNet: 0, potentialIncome: 0, projectedNet: 0, net: 0, transactions: [], potentialTransactions: [], projectedIncome: [] },
        { potentialNet: 0, potentialIncome: 0, projectedNet: 0, net: 0, transactions: [], potentialTransactions: [], projectedIncome: [] },
        { potentialNet: 0, potentialIncome: 0, projectedNet: 0, net: 0, transactions: [], potentialTransactions: [], projectedIncome: [] },
        { potentialNet: 0, potentialIncome: 0, projectedNet: 0, net: 0, transactions: [], potentialTransactions: [], projectedIncome: [] },
        { potentialNet: 0, potentialIncome: 0, projectedNet: 0, net: 0, transactions: [], potentialTransactions: [], projectedIncome: [] },
        { potentialNet: 0, potentialIncome: 0, projectedNet: 0, net: 0, transactions: [], potentialTransactions: [], projectedIncome: [] },
        { potentialNet: 0, potentialIncome: 0, projectedNet: 0, net: 0, transactions: [], potentialTransactions: [], projectedIncome: [] },
        { potentialNet: 0, potentialIncome: 0, projectedNet: 0, net: 0, transactions: [], potentialTransactions: [], projectedIncome: [] },
        { potentialNet: 0, potentialIncome: 0, projectedNet: 0, net: 0, transactions: [], potentialTransactions: [], projectedIncome: [] },
        { potentialNet: 0, potentialIncome: 0, projectedNet: 0, net: 0, transactions: [], potentialTransactions: [], projectedIncome: [] },
        { potentialNet: 0, potentialIncome: 0, projectedNet: 0, net: 0, transactions: [], potentialTransactions: [], projectedIncome: [] },
        { potentialNet: 0, potentialIncome: 0, projectedNet: 0, net: 0, transactions: [], potentialTransactions: [], projectedIncome: [] }
    ]
}

const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_TRANSACTION:
            if (action.payload.type <= 4) { // want, need, savings, debt
                console.log('want, need, savings, debt')
                console.log(parseInt(action.payload.date.slice('-')[1]));
                console.log([...state.monthOverview][action.payload.date.slice('-')[1]].net)
                return {
                    ...state,
                }
            }
            return { ...state };
        default:
            return state;
    }
}

export default transactionReducer;