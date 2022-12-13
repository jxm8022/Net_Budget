import * as types from '../actions/actionTypes';
import { LoadUserData, SaveUserData } from '../api/userAPI';

const initialState = {
    name: '',
    startYear: new Date().getFullYear(),
    currentYear: new Date().getFullYear(),
    totalSaved: 0
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_USER:
            const loadedUser = LoadUserData();
            let newLoadState = {
                ...state
            }

            if (loadedUser) {
                newLoadState = {
                    ...loadedUser,
                    currentYear: new Date().getFullYear()
                }
            }

            return newLoadState;
        case types.SAVE_USER:
            SaveUserData(state);

            return state;
        default:
            return state;
    }
}

export default userReducer;