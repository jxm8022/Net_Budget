import * as types from '../actions/actionTypes';
import { categories } from '../resources/labels';
import { getOverview, sortByAmount, sortByTimes } from '../utilities/ReducerHelper';

const initialState = {
    lifetimeNet: 0,
    lifetimeTransactions: {},
    transactionDictionary: [],
    topVisited_amount: [],
    topVisited_times: [],
    activeYears: [],
}

const statisticReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_TRANSACTION:
            let transactionToAdd = action.payload;
            let year = parseInt(action.payload.date.split('-')[0]);
            let month = action.payload.date.split('-')[1];
            let existingTransactions = {...state.lifetimeTransactions};
            let updatedActiveYears = state.activeYears;
            if (existingTransactions[year]){
                if (existingTransactions[year][month]) {
                    let updatedYear = {...existingTransactions[year]};
                    let updatedMonth = {...existingTransactions[year][month]};
                    updatedMonth = {
                        ...updatedMonth,
                        [transactionToAdd.id]: {
                            amount: transactionToAdd.amount,
                            date: transactionToAdd.date,
                            name: transactionToAdd.name,
                            type: transactionToAdd.type,
                        }
                    };
    
                    updatedYear = {
                        ...updatedYear,
                        [month]: updatedMonth
                    };
    
                    existingTransactions = {
                        ...existingTransactions,
                        [year]: updatedYear
                    };
                } else if (existingTransactions[year]) {
                    existingTransactions[year] = {
                        ...existingTransactions[year],
                        [month]: {[transactionToAdd.id]: {
                            amount: transactionToAdd.amount,
                            date: transactionToAdd.date,
                            name: transactionToAdd.name,
                            type: transactionToAdd.type,
                        }}
                    };
                }
            } else {
                existingTransactions = {
                    ...existingTransactions,
                    [year]: {
                        [month]: {[transactionToAdd.id]: {
                            amount: transactionToAdd.amount,
                            date: transactionToAdd.date,
                            name: transactionToAdd.name,
                            type: transactionToAdd.type,
                        }}
                    }
                }
                updatedActiveYears = Object.keys(existingTransactions);
            }
            
            return {
                ...state,
                lifetimeTransactions: existingTransactions,
                activeYears: updatedActiveYears,
            };
        case types.UPDATE_TRANSACTION:
            let updatedTransactions = {...state.lifetimeTransactions};
            // REMOVE TRANSACTION
            let old_Transaction = action.payload.prev;
            let old_Year = old_Transaction.date.split('-')[0];
            let old_Month = old_Transaction.date.split('-')[1];
            let old_updatedYearTransactions = {...updatedTransactions[old_Year]};
            let newMonthTransactions;
            for (let transaction in updatedTransactions[old_Year][old_Month]) {
                if (transaction !== old_Transaction.id) {
                    newMonthTransactions = {
                        ...newMonthTransactions,
                        [transaction]: updatedTransactions[old_Year][old_Month][transaction],
                    }
                }
            }

            old_updatedYearTransactions = {
                ...old_updatedYearTransactions,
                [old_Month]: newMonthTransactions
            };

            updatedTransactions = {
                ...updatedTransactions,
                [old_Year]: old_updatedYearTransactions
            };
            // ADDING TRANSACTION
            let new_Transaction = action.payload.new;
            let new_Year = new_Transaction.date.split('-')[0];
            let new_Month = new_Transaction.date.split('-')[1];
            let new_updatedActiveYears = state.activeYears;
            if (updatedTransactions[new_Year]){
                if (updatedTransactions[new_Year][new_Month]) {
                    let updatedYear = {...updatedTransactions[new_Year]};
                    let updatedMonth = {...updatedTransactions[new_Year][new_Month]};
                    updatedMonth = {
                        ...updatedMonth,
                        [new_Transaction.id]: {
                            amount: new_Transaction.amount,
                            date: new_Transaction.date,
                            name: new_Transaction.name,
                            type: new_Transaction.type,
                        }
                    };
    
                    updatedYear = {
                        ...updatedYear,
                        [new_Month]: updatedMonth
                    };
    
                    updatedTransactions = {
                        ...updatedTransactions,
                        [new_Year]: updatedYear
                    };
                } else if (updatedTransactions[new_Year]) {
                    updatedTransactions[new_Year] = {
                        ...updatedTransactions[new_Year],
                        [new_Month]: {[new_Transaction.id]: {
                            amount: new_Transaction.amount,
                            date: new_Transaction.date,
                            name: new_Transaction.name,
                            type: new_Transaction.type,
                        }}
                    };
                }
            } else {
                updatedTransactions = {
                    ...updatedTransactions,
                    [new_Year]: {
                        [new_Month]: {[new_Transaction.id]: {
                            amount: new_Transaction.amount,
                            date: new_Transaction.date,
                            name: new_Transaction.name,
                            type: new_Transaction.type,
                        }}
                    }
                }
                new_updatedActiveYears = Object.keys(updatedTransactions);
            }

            return {
                ...state,
                lifetimeTransactions: updatedTransactions,
                activeYears: new_updatedActiveYears,
            };
        case types.DELETE_TRANSACTION:
            let delete_updatedTransactions = {...state.lifetimeTransactions};
            let transactionToDelete = action.payload.prev;
            let delete_Year = transactionToDelete.date.split('-')[0];
            let delete_Month = transactionToDelete.date.split('-')[1];
            let delete_updatedYearTransactions = {...delete_updatedTransactions[delete_Year]};
            let delete_newMonthTransactions;
            for (let transaction in delete_updatedTransactions[delete_Year][delete_Month]) {
                if (transaction !== transactionToDelete.id) {
                    delete_newMonthTransactions = {
                        ...delete_newMonthTransactions,
                        [transaction]: delete_updatedTransactions[delete_Year][delete_Month][transaction],
                    }
                }
            }

            delete_updatedYearTransactions = {
                ...delete_updatedYearTransactions,
                [delete_Month]: delete_newMonthTransactions
            };

            delete_updatedTransactions = {
                ...delete_updatedTransactions,
                [delete_Year]: delete_updatedYearTransactions
            };
            return {
                ...state,
                lifetimeTransactions: delete_updatedTransactions,
            };
        case types.SAVE_ALL_TRANSACTIONS:
            let activeYears = Object.keys(action.payload);
            localStorage.setItem('startYear', JSON.stringify(activeYears[0]));

            return {
                ...state,
                lifetimeTransactions: action.payload,
                activeYears: activeYears,
            }
        case types.CALCULATE_STATISTICS:
            let data = state.lifetimeTransactions;

            let transactions = [];
            let transactionWantsDictionary = {};
            let transactionDictionary = [];
            for (let year in data) {
                for (let month in data[year]) {
                    for (let transactionId in data[year][month]) {
                        let transaction = data[year][month][transactionId];
                        transactions.push(transaction);
                        if (transaction.name in transactionWantsDictionary && categories[transaction.type].type === 'Want') {
                            transactionWantsDictionary[transaction.name].times += 1;
                            transactionWantsDictionary[transaction.name].amount += transaction.amount;
                        } else if (categories[transaction.type].type === 'Want') {
                            transactionWantsDictionary = { ...transactionWantsDictionary, [transaction.name]: { times: 1, amount: transaction.amount } };
                        }
                        if (!transactionDictionary.includes(transaction.name)) {
                            transactionDictionary = [ ...transactionDictionary, transaction.name ];
                        }
                    }
                }
            }
            let transactionOverview = getOverview(transactions);
            let sortedDictionary = Object.keys(transactionWantsDictionary).map((key) => [key, transactionWantsDictionary[key]]);
            let sortTimes = sortedDictionary.sort(sortByTimes).slice(0, 10).map((data, i) => {
                return {
                    id: i,
                    place: i + 1,
                    name: data[0],
                    amount: data[1].times
                }
            });
            let sortAmount = sortedDictionary.sort(sortByAmount).slice(0, 10).map((data, i) => {
                return {
                    id: i,
                    place: i + 1,
                    name: data[0],
                    amount: data[1].amount
                }
            });

            return {
                ...state,
                lifetimeNet: transactionOverview.net,
                transactionDictionary: transactionDictionary,
                topVisited_amount: sortAmount,
                topVisited_times: sortTimes
            };
        case types.LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default statisticReducer;