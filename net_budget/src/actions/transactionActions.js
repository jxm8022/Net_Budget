import * as types from './actionTypes';

export const addTransaction = (payload) => {
    return {
        type: types.ADD_TRANSACTION,
        info: 'Add transaction to specified month.',
        payload
    }
}