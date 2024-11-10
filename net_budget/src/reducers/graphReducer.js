import * as types from '../actions/actionTypes';

const initialState = {
    graphData: {
        net: [0,0,0,0,0,0,0,0,0,0,0,0]
    },
}

const getAccountRelatedAmount = (transaction) => {
    switch(transaction.accountTypeId)
    {
        case 2: // Credit Account
            switch(transaction.type)
            {
                case 3: // Credit Account Payment
                    return transaction.amount;
                default:
                    return -transaction.amount;
            }
        default:
            switch(transaction.type)
            {
                case 4: // Checking Account Income
                    return transaction.amount;
                default:
                    return -transaction.amount;
            }
    }
}

const graphReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_ACCOUNTS:
            if (!action.payload) {
                return state;
            }

            let loadAccountsState = structuredClone(state);
            for (const accountId in action.payload)
            {
                if (!loadAccountsState.graphData[accountId])
                {
                    loadAccountsState.graphData[accountId] = [0,0,0,0,0,0,0,0,0,0,0,0];
                }
            }

            return loadAccountsState;
        case types.LOAD_TRANSACTIONS:
            let loadTransactionState = structuredClone(state);

            Object.keys(loadTransactionState.graphData).forEach((accountKey) => {
                loadTransactionState.graphData[accountKey] = [0,0,0,0,0,0,0,0,0,0,0,0];
            });

            if (!action.payload)
            {
                return loadTransactionState;
            }

            for (const month in action.payload)
            {
                for (const transactionId in action.payload[month])
                {
                    const monthIndex = month - 1;
                    const transaction = action.payload[month][transactionId];
                    loadTransactionState.graphData[transaction.accountId][monthIndex] += getAccountRelatedAmount(transaction);
                }
            }

            for (const account in loadTransactionState.graphData)
            {
                if (account != 'net')
                {
                    loadTransactionState.graphData.net = [0,0,0,0,0,0,0,0,0,0,0,0];
                    for (const accountNetIndex in loadTransactionState.graphData[account])
                    {
                        loadTransactionState.graphData.net[accountNetIndex] += loadTransactionState.graphData[account][accountNetIndex];
                    }
                }
            }

            return loadTransactionState;
        case types.DELETE_ALL_TRANSACTIONS:
            return initialState;
        case types.LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default graphReducer;