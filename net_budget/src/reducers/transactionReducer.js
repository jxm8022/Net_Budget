import * as types from '../actions/actionTypes';
import { LoadTransactionData, SaveTransactionData } from '../api/TransactionAPI';

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

const sortTransactionsByDate = (a, b) => {
    if (a.date < b.date) {
        return -1;
    }
    if (a.date > b.date) {
        return 1;
    }
    return 0;
}

const getOverview = (transactions) => {
    let pTransactionTotal = 0;
    let pIncomeTotal = 0;
    let incomeTotal = 0;
    let transactionsTotal = 0;
    for (let transaction of transactions) {
        switch (transaction.type) {
            case 0:
            case 1:
            case 2:
            case 3:
                transactionsTotal += transaction.amount;
                break;
            case 4:
                incomeTotal += transaction.amount;
                break;
            case 5:
                pTransactionTotal += transaction.amount;
                break;
            case 6:
                pIncomeTotal += transaction.amount;
                break;
            default:
                break;
        }
    }
    const net = incomeTotal - transactionsTotal;
    const potNet = net - pTransactionTotal;
    const projNet = potNet + pIncomeTotal;
    return {
        potNet,
        projNet,
        net
    };
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
        case types.UPDATE_TRANSACTION:
            const prevMonthIndex = parseInt(action.payload.prev.date.split('-')[1]) - 1;
            const newMonthIndex = parseInt(action.payload.new.date.split('-')[1]) - 1;
            const indexOfTransaction = state.monthOverview[prevMonthIndex].transactions.findIndex((transaction) => transaction.id === action.payload.new.id);

            if (prevMonthIndex === newMonthIndex) {
                let newTransactions = [...state.monthOverview[prevMonthIndex].transactions];
                newTransactions[indexOfTransaction] = {
                    id: action.payload.new.id,
                    type: action.payload.new.type,
                    date: action.payload.new.date,
                    name: action.payload.new.name,
                    amount: action.payload.new.amount,
                }
                let newMonth = { ...state.monthOverview[prevMonthIndex] };
                const { potNet, projNet, net } = getOverview(newTransactions);
                newMonth = {
                    ...newMonth,
                    potNet,
                    projNet,
                    net,
                    transactions: newTransactions
                }
                let newMonthOverview = [...state.monthOverview];
                newMonthOverview[prevMonthIndex] = newMonth;
                let newState = {
                    ...state,
                    monthOverview: newMonthOverview
                };

                return newState;
            } else {
                // add to new month
                let newTransactions = [...state.monthOverview[newMonthIndex].transactions];
                newTransactions = [
                    ...newTransactions,
                    {
                        id: newTransactions.length,
                        type: action.payload.new.type,
                        date: action.payload.new.date,
                        name: action.payload.new.name,
                        amount: action.payload.new.amount
                    }
                ]
                let newMonth = { ...state.monthOverview[newMonthIndex] };
                const newOverview = getOverview(newTransactions);
                newMonth = {
                    ...newMonth,
                    potNet: newOverview.potNet,
                    projNet: newOverview.projNet,
                    net: newOverview.net,
                    transactions: newTransactions
                }
                // remove from old month
                let oldTransactions = [...state.monthOverview[prevMonthIndex].transactions];
                oldTransactions.splice(indexOfTransaction, 1);
                let oldMonth = { ...state.monthOverview[prevMonthIndex] };
                const oldOverview = getOverview(oldTransactions);
                oldMonth = {
                    ...oldMonth,
                    potNet: oldOverview.potNet,
                    projNet: oldOverview.projNet,
                    net: oldOverview.net,
                    transactions: oldTransactions
                }
                // new overview
                let newMonthOverview = [...state.monthOverview];
                newMonthOverview[prevMonthIndex] = oldMonth;
                newMonthOverview[newMonthIndex] = newMonth;
                let newState = {
                    ...state,
                    monthOverview: newMonthOverview
                };

                return newState;
            }
        case types.DELETE_TRANSACTION:
            const monthIndex_DELETE = parseInt(action.payload.prev.date.split('-')[1]) - 1;
            const indexOfTransaction_DELETE = state.monthOverview[monthIndex_DELETE].transactions.findIndex((transaction) => transaction.id === action.payload.prev.id);
            let newTransactions_DELETE = [...state.monthOverview[monthIndex_DELETE].transactions];
            newTransactions_DELETE.splice(indexOfTransaction_DELETE, 1);
            let newDeleteMonth = { ...state.monthOverview[monthIndex_DELETE] };
            const newDeleteOverview = getOverview(newTransactions_DELETE);
            newDeleteMonth = {
                ...newDeleteMonth,
                potNet: newDeleteOverview.potNet,
                projNet: newDeleteOverview.projNet,
                net: newDeleteOverview.net,
                transactions: newTransactions_DELETE
            }
            let newMonthOverview = [...state.monthOverview];
            newMonthOverview[monthIndex_DELETE] = newDeleteMonth;
            let newState = {
                ...state,
                monthOverview: newMonthOverview
            };

            return newState;
        case types.SAVE_TRANSACTIONS:
            SaveTransactionData(state);

            return state;
        case types.LOAD_TRANSACTIONS:
            const loadedOverview = LoadTransactionData(action.payload);
            let newLoadState = {
                ...state
            }

            if (loadedOverview) {
                newLoadState = {
                    ...state,
                    monthOverview: loadedOverview
                }
            }

            return newLoadState;
        case types.SET_DATE:
            const { month, year } = action.payload;
            let newDate = { ...state };
            if (month) {
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