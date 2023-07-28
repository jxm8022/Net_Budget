import { configureStore } from '@reduxjs/toolkit';
import pageReducer from '../reducers/pageReducer';
import transactionReducer from '../reducers/transactionReducer';
import userReducer from '../reducers/userReducer';
import statisticReducer from '../reducers/statisticReducer';

const store = configureStore(
    {
        reducer: {
            page: pageReducer,
            statistics: statisticReducer,
            transaction: transactionReducer,
            user: userReducer
        }
    }
);

export default store;