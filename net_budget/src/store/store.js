import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from '../reducers/transactionReducer';

const store = configureStore(
    {
        reducer: {
            transaction: transactionReducer,
        }
    }
);

export default store;