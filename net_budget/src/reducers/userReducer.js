import * as types from '../actions/actionTypes';
import { LoadUserData, SaveUserData, signIn } from '../api/userAPI';

const initialState = {
    name: '',
    startYear: new Date().getFullYear(),
    currentYear: new Date().getFullYear(),
    totalSaved: 0,
    token: null
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
        case types.LOGIN:
            const loginResponse = signIn(action.payload.email, action.payload.password);

            console.log(loginResponse);

            let newLoginState = {
                ...state,
            }

            return newLoginState;
        case types.LOGOUT:
            const logoutResponse = null;

            console.log(logoutResponse);

            let newLogoutState = {
                ...state,
            }

            return newLogoutState;
        default:
            return state;
    }
}

export default userReducer;