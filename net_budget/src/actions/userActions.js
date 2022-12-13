import * as types from './actionTypes';

export const loadUser = () => {
    return {
        type: types.LOAD_USER,
        info: 'Loading user information.'
    }
}

export const saveUser = () => {
    return {
        type: types.SAVE_USER,
        info: 'Saving user information.'
    }
}