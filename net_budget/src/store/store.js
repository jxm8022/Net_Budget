import { configureStore } from '@reduxjs/toolkit';
import pageReducer from '../reducers/pageReducer';
import transactionReducer from '../reducers/transactionReducer';
import userReducer from '../reducers/userReducer';

const store = configureStore(
    {
        reducer: {
            page: pageReducer,
            transaction: transactionReducer,
            user: userReducer
        }
    }
);

export default store;