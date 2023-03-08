import * as types from './actionTypes';

export const addTransaction = (payload) => {
    return {
        type: types.ADD_TRANSACTION,
        info: 'Add transaction to specified month.',
        payload
    }
}

export const updateTransaction = (payload) => {
    return {
        type: types.UPDATE_TRANSACTION,
        info: 'Update transaction information.',
        payload
    }
}

export const deleteTransaction = (payload) => {
    return {
        type: types.DELETE_TRANSACTION,
        info: 'Delete transaction information.',
        payload
    }
}

export const loadTransactions = (payload) => {
    return {
        type: types.LOAD_TRANSACTIONS,
        info: 'Loading transactions for specified year.',
        payload
    }
}

export const setDate = (payload) => {
    return {
        type: types.SET_DATE,
        info: 'Setting date to specified date',
        payload
    }
}

export const logout = () => {
    return {
        type: types.LOGOUT,
        info: 'Logging out user.'
    }
}

export const saveAllTransactions = (payload) => {
    return {
        type: types.SAVE_ALL_TRANSACTIONS,
        info: 'Saving all transactions',
        payload
    }
}