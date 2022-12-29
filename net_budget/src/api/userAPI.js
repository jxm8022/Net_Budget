const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API}`;
const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API}`;

export const SaveUserData = (state) => {
    localStorage.setItem('userId', JSON.stringify(state.userId));
    localStorage.setItem('token', JSON.stringify(state.token));
    localStorage.setItem('expirationTime', JSON.stringify(state.expirationTime));
}

export const LoadUserData = () => {
    return {
        userId: localStorage.getItem('userId'),
        token: localStorage.getItem('token'),
        expirationTime: localStorage.getItem('expirationTime'),
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