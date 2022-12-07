import * as types from '../actions/actionTypes';

const initialState = {
    startYear: new Date().getFullYear(),
    currentYear: new Date().getFullYear(),
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
                const monthIndex = parseInt(action.payload.date.split('-')[1]) - 1;
                const previousNet = state.monthOverview[monthIndex].net;
                const updatedMonth = { ...state.monthOverview[monthIndex], net: previousNet - action.payload.amount, transactions: [...state.monthOverview[monthIndex].transactions, action.payload] };
                let newMonthOverview = [...state.monthOverview];
                newMonthOverview[monthIndex] = updatedMonth;

                let newState = {
                    ...state,
                    monthOverview: newMonthOverview
                };
                return newState;
            }
            return { ...state };
        default:
            return state;
    }
}

export default transactionReducer;