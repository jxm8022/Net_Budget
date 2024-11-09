export const addAccountAPI = (userId, accountName, accountPayload, token) => {
    const addURL = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/${userId}/accounts/${accountName}.json?auth=${token}`;
    return fetch(
        addURL,
        {
            method: 'PUT',
            body: JSON.stringify(accountPayload),
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

export const loadAccountsAPI = (userId, token) => {
    const loadURL = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/${userId}/accounts.json?auth=${token}`;
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

export const deleteAccountAPI = (userId, transactionId, token) => {
    const deleteURL = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/${userId}/debts/${transactionId}.json?auth=${token}`;
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