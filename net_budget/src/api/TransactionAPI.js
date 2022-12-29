export const SaveTransactionData = (state) => {
    const { currentYear, monthOverview } = state;
    localStorage.setItem(currentYear, JSON.stringify(monthOverview));
}

export const LoadTransactionData = (year) => {
    const yearOverview = localStorage.getItem(year);
    return JSON.parse(yearOverview);
}

export const addTransactionAPI = (userId, transaction) => {
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

export const loadTransactionsAPI = (userId, year) => {
    const loadURL = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/${userId}/transactions/${year}.json`;
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
