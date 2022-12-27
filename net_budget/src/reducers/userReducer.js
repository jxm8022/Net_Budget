import * as types from '../actions/actionTypes';
import { LoadUserData, SaveUserData } from '../api/userAPI';

const initialState = {
    name: '',
    startYear: new Date().getFullYear(),
    currentYear: new Date().getFullYear(),
    totalSaved: 0,
    token: null,
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' ? true : false
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

            SaveUserData(newLoadState);
            return newLoadState;
        case types.LOGIN:
            let newLoginState = {
                ...state,
                token: action.payload.idToken,
                isLoggedIn: true
            }

            localStorage.setItem('isLoggedIn', true);
            SaveUserData(newLoginState);
            return newLoginState;
        case types.LOGOUT:
            const newToken = null;

            let newLogoutState = {
                ...state,
                token: newToken,
                isLoggedIn: false
            }

            localStorage.setItem('isLoggedIn', false);
            SaveUserData(newLogoutState);
            return newLogoutState;
        default:
            return state;
    }
}

export default userReducer;