import * as types from '../actions/actionTypes';

const initialState = {
    startYear: new Date().getFullYear(),
    currentYear: new Date().getFullYear(),
    previousYear: null,
    monthOverview: [
        { potNet: 0, pIncome: 0, projNet: 0, net: 0, transactions: [] },
        { potNet: 0, pIncome: 0, projNet: 0, net: 0, transactions: [] },
        { potNet: 0, pIncome: 0, projNet: 0, net: 0, transactions: [] },
        { potNet: 0, pIncome: 0, projNet: 0, net: 0, transactions: [] },
        { potNet: 0, pIncome: 0, projNet: 0, net: 0, transactions: [] },
        { potNet: 0, pIncome: 0, projNet: 0, net: 0, transactions: [] },
        { potNet: 0, pIncome: 0, projNet: 0, net: 0, transactions: [] },
        { potNet: 0, pIncome: 0, projNet: 0, net: 0, transactions: [] },
        { potNet: 0, pIncome: 0, projNet: 0, net: 0, transactions: [] },
        { potNet: 0, pIncome: 0, projNet: 0, net: 0, transactions: [] },
        { potNet: 0, pIncome: 0, projNet: 0, net: 0, transactions: [] },
        { potNet: 0, pIncome: 0, projNet: 0, net: 0, transactions: [] }
    ]
}

const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_TRANSACTION:
            const monthIndex = parseInt(action.payload.date.split('-')[1]) - 1;
            const monthInfo = state.monthOverview[monthIndex];
            if (action.payload.type < 5) {
                const previousNet = monthInfo.net;
                const previousPotNet = monthInfo.potNet;
                const previousProjNet = monthInfo.projNet;
                const transactionsId = monthInfo.transactions.length;
                const newTransactions = [...monthInfo.transactions, { ...action.payload, id: transactionsId }];
                if (action.payload.type < 4) { // want, need, savings, debt
                    const newNet = previousNet - action.payload.amount;
                    const newPotNet = previousPotNet - action.payload.amount;
                    const newProjNet = previousProjNet - action.payload.amount;
                    const updatedMonth = { ...monthInfo, net: newNet, potNet: newPotNet, projNet: newProjNet, transactions: newTransactions };
                    let newMonthOverview = [...state.monthOverview];
                    newMonthOverview[monthIndex] = updatedMonth;

                    let newState = {
                        ...state,
                        monthOverview: newMonthOverview
                    };
                    return newState;
                }
                if (action.payload.type === 4) { // income
                    const newNet = previousNet + action.payload.amount;
                    const newPotNet = previousPotNet + action.payload.amount;
                    const newProjNet = previousProjNet + action.payload.amount;
                    const updatedMonth = { ...monthInfo, net: newNet, potNet: newPotNet, projNet: newProjNet, transactions: newTransactions };
                    let newMonthOverview = [...state.monthOverview];
                    newMonthOverview[monthIndex] = updatedMonth;

                    let newState = {
                        ...state,
                        monthOverview: newMonthOverview
                    };
                    return newState;
                }
            }
            if (action.payload.type > 4) { // pTransaction, pIncome
                const previousPotNet = monthInfo.potNet;
                const previousProjNet = monthInfo.projNet;
                if (action.payload.type === 5) { // pTransaction
                    const newPotNet = previousPotNet - action.payload.amount;
                    const newProjNet = previousProjNet - action.payload.amount;
                    const pTransactionsId = monthInfo.transactions.length;
                    const newPTransactions = [...monthInfo.transactions, { ...action.payload, id: pTransactionsId }];
                    const updatedMonth = { ...monthInfo, potNet: newPotNet, projNet: newProjNet, transactions: newPTransactions };
                    let newMonthOverview = [...state.monthOverview];
                    newMonthOverview[monthIndex] = updatedMonth;

                    let newState = {
                        ...state,
                        monthOverview: newMonthOverview
                    };
                    return newState;
                }
            }
            return { ...state };
        default:
            return state;
    }
}

export default transactionReducer;