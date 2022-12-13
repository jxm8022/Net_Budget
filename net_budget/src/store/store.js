import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from '../reducers/transactionReducer';
import userReducer from '../reducers/userReducer';

const store = configureStore(
    {
        reducer: {
            transaction: transactionReducer,
            user: userReducer
        }
    }
);

export default store;