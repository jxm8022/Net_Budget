export const addTransactionAPI = (userId, transaction, token) => { // date format yyyy-mm-dd
    const year = transaction.date.substring(0, 4);
    const month = transaction.date.substring(5, 7);
    const addURL = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/${userId}/transactions/${year}/${month}.json?auth=${token}`;
    return fetch(
        addURL,
        {
            method: 'POST',
            body: JSON.stringify(transaction),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((data) => {
                    throw new Error(data.error);
                })
            }
        })
        .catch((err) => {
            alert(err.message);
        })
}

export const loadTransactionsAPI = (userId, token) => {
    const loadURL = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/${userId}.json?auth=${token}`;
    return fetch(loadURL)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((data) => {
                    throw new Error(data.error);
                });
            }
        })
        .catch((err) => {
            alert(err.message);
        });
}

export const deleteTransactionAPI = (userId, transaction, token) => {
    const transactionDate = transaction.date.split('-');
    const deleteURL = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/${userId}/transactions/${transactionDate[0]}/${transactionDate[1]}/${transaction.id}.json?auth=${token}`;
    return fetch(
        deleteURL,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((data) => {
                    throw new Error(data.error.message);
                })
            }
        })
        .catch((err) => {
            alert(err.message);
        })
}

export const updateTransactionAPI = (userId, updatedTransaction, previousTransaction, token) => {
    const updatedDate = updatedTransaction.date.split('-');
    const previousDate = previousTransaction.date.split('-');
    if (updatedDate[0] !== previousDate[0] || updatedDate[1] !== previousDate[1]) {
        return addTransactionAPI(userId, updatedTransaction, token).then((res) => {
            if (res) {
                deleteTransactionAPI(userId, previousTransaction, token);
                return res;
            }
        });
    } else {
        const updateURL = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/${userId}/transactions/${updatedDate[0]}/${updatedDate[1]}/${previousTransaction.id}.json?auth=${token}`;
        return fetch(
            updateURL,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    amount: updatedTransaction.amount,
                    date: updatedTransaction.date,
                    name: updatedTransaction.name,
                    type: updatedTransaction.type
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then((data) => {
                        throw new Error(data.error.message);
                    })
                }
            })
            .catch((err) => {
                alert(err.message);
            })
    }
}