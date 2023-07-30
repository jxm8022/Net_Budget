import * as types from './actionTypes';

export const saveAllTransactions = (payload) => {
    return {
        type: types.SAVE_ALL_TRANSACTIONS,
        info: 'Saving all transactions',
        payload
    }
}

export const calculateStatistics = () => {
    return {
        type: types.CALCULATE_STATISTICS,
        info: 'Calculating statistics'
    }
}