export const addTransactionAPI = (userId, transaction) => { // date format yyyy-mm-dd
    const year = transaction.date.substring(0, 4);
    const month = transaction.date.substring(5, 7);
    const addURL = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/${userId}/transactions/${year}/${month}.json`;
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
                    throw new Error(data.error.message);
                })
            }
        })
        .catch((err) => {
            alert(err.message);
        })
}

export const loadTransactionsAPI = (userId) => {
    const loadURL = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/${userId}/transactions.json`;
    return fetch(loadURL)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((data) => {
                    throw new Error(data.error.message);
                });
            }
        })
        .catch((err) => {
            alert(err.message);
        });
}
