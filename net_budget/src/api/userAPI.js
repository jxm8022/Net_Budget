const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API}`;
const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API}`;

export const SaveUserData = (state) => {
    localStorage.setItem('isLoggedIn', JSON.stringify(state.isLoggedIn));
    localStorage.setItem('userId', JSON.stringify(state.userId));
    localStorage.setItem('token', JSON.stringify(state.token));
    localStorage.setItem('expirationTime', JSON.stringify(state.expirationTime));
}

export const LoadUserData = () => {
    return {
        startYear: JSON.parse(localStorage.getItem('startYear')),
        isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')),
        userId: JSON.parse(localStorage.getItem('userId')),
        token: JSON.parse(localStorage.getItem('token')),
        expirationTime: JSON.parse(localStorage.getItem('expirationTime')),
    };
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