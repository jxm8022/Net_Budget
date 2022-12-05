import * as types from './actionTypes';

export const xAction = (payload) => {
    return {
        type: types.DO_SOMETHING,
        info: 'Do something',
        payload
    }
}