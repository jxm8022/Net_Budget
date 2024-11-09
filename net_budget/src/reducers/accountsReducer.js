import * as types from '../actions/actionTypes';
import { accountTypes } from '../resources/labels';

const initialState = {
    accounts: [],
    accountLabels: [],
}

/* handle sorting */
const accountsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_ACCOUNT:
            const newAccount = action.payload;
            const newAccountKey = newAccount.name;
            const newAccountValue = {
                ...newAccount.payload,
                type: accountTypes[newAccount.payload.type].type
            }
            return {
                ...state,
                accounts: [...state.accounts, {key: newAccountKey, value: newAccountValue}],
                accountLabels: [...state.accountLabels, newAccountKey],
            };
        case types.LOAD_ACCOUNTS:
            if (!action.payload) {
                return state;
            }

            const mappedAccounts = Object.keys(action.payload).map(key => {
                return {
                    key,
                    value: {
                        ...action.payload[key],
                        type: accountTypes[action.payload[key].type].type,
                    }
                }
            });
            return {
                ...state,
                accounts: mappedAccounts,
                accountLabels: Object.keys(action.payload),
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