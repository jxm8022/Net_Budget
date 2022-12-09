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
        {
            potNet: 0, pIncome: 0, projNet: 0, net: 0, transactions: [
                { id: 0, type: 0, date: '2022-12-06', name: 'One', amount: 12 },
                { id: 1, type: 1, date: '2022-12-07', name: 'Two', amount: 14 },
                { id: 2, type: 2, date: '2022-12-08', name: 'Three', amount: 16 },
                { id: 3, type: 3, date: '2022-12-09', name: 'Four', amount: 14 },
                { id: 4, type: 4, date: '2022-12-09', name: 'Five', amount: 11 },
                { id: 5, type: 5, date: '2022-12-06', name: 'Six', amount: 13 },
            ]
        }
    ]
}

const sortTransactionsByDate = (a, b) => {
    if (a.date < b.date) {
        return -1;
    }
    if (a.date > b.date) {
        return 1;
    }
    return 0;
}

const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_TRANSACTION:
            const monthIndex = parseInt(action.payload.date.split('-')[1]) - 1;
            const monthInfo = state.monthOverview[monthIndex];
            const transactionsId = monthInfo.transactions.length;
            const newTransactions = [...monthInfo.transactions, { ...action.payload, id: transactionsId }].sort(sortTransactionsByDate);
            const previousPotNet = monthInfo.potNet;
            const previousProjNet = monthInfo.projNet;
            /* ADDING TRANSACTION FOR WANT, NEED, SAVINGS, DEBT, INCOME */
            if (action.payload.type < 5) {
                const previousNet = monthInfo.net;
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
            /* ADDING TRANSACTION FOR pTRANSACTION, pINCOME */
            if (action.payload.type > 4) {
                if (action.payload.type === 5) { // pTransaction
                    const newPotNet = previousPotNet - action.payload.amount;
                    const newProjNet = previousProjNet - action.payload.amount;
                    const updatedMonth = { ...monthInfo, potNet: newPotNet, projNet: newProjNet, transactions: newTransactions };
                    let newMonthOverview = [...state.monthOverview];
                    newMonthOverview[monthIndex] = updatedMonth;

                    let newState = {
                        ...state,
                        monthOverview: newMonthOverview
                    };
                    return newState;
                }
                if (action.payload.type === 6) { // pIncome
                    const newProjNet = previousProjNet + action.payload.amount;
                    const updatedMonth = { ...monthInfo, projNet: newProjNet, transactions: newTransactions };
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