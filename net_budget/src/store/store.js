import { configureStore } from '@reduxjs/toolkit';
import xReducer from '../reducers/xReducer';

const store = configureStore(
    {
        reducer: {
            x: xReducer,
        }
    }
);

export default store;