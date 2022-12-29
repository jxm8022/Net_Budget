const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API}`;
const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API}`;

export const SaveUserData = (state) => {
    localStorage.setItem('user', JSON.stringify(state));
}

export const LoadUserData = () => {
    const userData = localStorage.getItem('user');
    return JSON.parse(userData);
}

export const signIn = (newUser, email, password) => {
    const url = newUser ? signUpUrl : signInUrl;

    return fetch(
        url,
        {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
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

export const addTransactionAPI = (userId, transaction) => {
    const addURL = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/${userId}/transactions/${transaction.date.substring(0, 4)}.json`;
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