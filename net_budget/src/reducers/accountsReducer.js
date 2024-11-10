import * as types from '../actions/actionTypes';
import { accountTypes, transactionCategories } from '../resources/labels';

const initialState = {
    accounts: [],
    accountLabels: [],
}

const getAccountType = (typeId) => accountTypes[typeId].type;
const getTransactionType = (typeId) => transactionCategories[typeId].type;

const getTransactionTotal = (accountTypeId, transactions) => {
    let total = 0;

    if (!transactions)
    {
        return total;
    }

    for (const year in transactions)
    {
        for (const month in transactions[year])
        {
            for (const transactionId in transactions[year][month])
            {
                const transaction = transactions[year][month][transactionId];
                if (accountTypeId == 2 || accountTypeId == 'Credit') // Credit Cards
                {
                    switch(transaction.type)
                    {
                        case 3:
                        case 'Debt Payment':
                            total -= transaction.amount;
                            break;
                        default:
                            total += transaction.amount;
                            break;
                    }
                }
                else
                {
                    switch(transaction.type)
                    {
                        case 4:
                        case 'Income':
                            total += transaction.amount;
                            break;
                        default:
                            total -= transaction.amount;
                            break;
                    }
                }
            }
        }
    }

    return total;
}

/* handle sorting */
const accountsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_ACCOUNT:
            let addAccountState = structuredClone(state);
            const newAccount = {
                ...action.payload,
                type: getAccountType(action.payload.type)
            }
            addAccountState.accounts.push(newAccount);
            addAccountState.accountLabels.push({id: newAccount.id, label: newAccount.name});
            return addAccountState;
        case types.LOAD_ACCOUNTS:
            if (!action.payload) {
                return state;
            }

            const mappedAccounts = Object.keys(action.payload).map(key => {
                return {
                    ...action.payload[key],
                    id: key,
                    displayBalance: action.payload[key].balance + getTransactionTotal(action.payload[key].type, action.payload[key].transactions),
                    type: getAccountType(action.payload[key].type),
                }
            });
            return {
                ...state,
                accounts: mappedAccounts,
                accountLabels: mappedAccounts.map(account => {return {id: account.id, label: account.name}}),
            };
        case types.ADD_TRANSACTION:
            const newTransaction = {
                ...action.payload,
                type: getTransactionType(action.payload.type)
            }
            const targetYear = action.payload.date.substring(0, 4);
            const targetMonth = action.payload.date.substring(5, 7);
            
            let updatedAccounts = structuredClone(state.accounts);
            const accountIndex = updatedAccounts.findIndex(account => account.id == newTransaction.accountId);

            if (!updatedAccounts[accountIndex].transactions) {
                updatedAccounts[accountIndex].transactions = {};
            }
            
            if (!updatedAccounts[accountIndex].transactions[targetYear]) {
                updatedAccounts[accountIndex].transactions[targetYear] = {};
            }

            if (!updatedAccounts[accountIndex].transactions[targetYear][targetMonth]) {
                updatedAccounts[accountIndex].transactions[targetYear][targetMonth] = {};
            }

            updatedAccounts[accountIndex].transactions[targetYear][targetMonth][newTransaction.id] = newTransaction;

            updatedAccounts[accountIndex].displayBalance = updatedAccounts[accountIndex].balance + getTransactionTotal(updatedAccounts[accountIndex].type, updatedAccounts[accountIndex].transactions);

            return {
                ...state,
                accounts: updatedAccounts,
            };
        case types.DELETE_ALL_TRANSACTIONS:
            return initialState
        case types.LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default accountsReducer;