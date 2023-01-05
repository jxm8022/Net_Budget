import * as types from '../actions/actionTypes';

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
            /* GET ADDED TRANSACTION MONTH INDEX AND MONTH OVERVIEW FOR INDEX */
            const monthIndex = parseInt(action.payload.date.split('-')[1]) - 1;
            const monthInfo = state.monthOverview[monthIndex];

            /* ADD TRANSACTION TO MONTH OVERVIEW FOR MONTH INDEX */
            const newTransactions = [...monthInfo.transactions, { ...action.payload }].sort(sortTransactionsByDate);

            /* CALCULATE NEW MONTH OVERVIEW INFORMATION FROM INCOMING TRANSACTION */
            let addTransaction_State = {};
            const { potNet, projNet, net } = getOverview(newTransactions);
            const addTransaction_Month = { ...monthInfo, potNet, projNet, net, transactions: newTransactions };
            let addTransaction_MonthOverview = [...state.monthOverview];
            addTransaction_MonthOverview[monthIndex] = addTransaction_Month;
            addTransaction_State = {
                ...state,
                monthOverview: addTransaction_MonthOverview
            }

            return addTransaction_State;
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
                    transactions: newTransactions.sort(sortTransactionsByDate)
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
                    transactions: newTransactions.sort(sortTransactionsByDate)
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
                    transactions: oldTransactions.sort(sortTransactionsByDate)
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
        case types.LOAD_TRANSACTIONS:
            let newMonthOverview_load = [...state.monthOverview];

            /* ITERATE THROUGH YEAR DATA */
            for (const key in action.payload) { // pssst keys are months
                let newTransactions_load = [];
                for (const transactions in action.payload[key]) {
                    newTransactions_load.push(action.payload[key][transactions]);
                }

                const newMonthInOverviewInfo = getOverview(newTransactions_load);

                let monthInOverview = {
                    ...state.monthOverview[key - 1],
                    potNet: newMonthInOverviewInfo.potNet,
                    projNet: newMonthInOverviewInfo.projNet,
                    net: newMonthInOverviewInfo.net,
                    transactions: newTransactions_load.sort(sortTransactionsByDate)
                };
                newMonthOverview_load[key - 1] = monthInOverview;
            }

            let newLoadState = {
                ...state,
                monthOverview: newMonthOverview_load
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
        case types.LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default transactionReducer;