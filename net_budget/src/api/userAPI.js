const signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[]';
const signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[]';

export const SaveUserData = (state) => {
    localStorage.setItem('user', JSON.stringify(state));
}

export const LoadUserData = () => {
    const userData = localStorage.getItem('user');
    return JSON.parse(userData);
}

export const signIn = (newUser, email, password) => {
    let response = { data: null, error: null };

    const url = newUser ? signUpUrl : signInUrl;

    fetch(
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
                    response = { ...response, error: data.error.message };
                    throw new Error(response);
                });
            }
        })
        .then((data) => {
            response = { ...response, data };
        })
        .catch((err) => {
            alert(err.message);
        });

    return response;
}