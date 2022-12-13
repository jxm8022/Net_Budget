export const SaveUserData = (state) => {
    localStorage.setItem('user', JSON.stringify(state));
}

export const LoadUserData = () => {
    const userData = localStorage.getItem('user');
    return JSON.parse(userData);
}