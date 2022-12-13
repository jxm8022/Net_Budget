export const SaveTransactionData = (state) => {
    const { currentYear, monthOverview } = state;
    localStorage.setItem(currentYear, JSON.stringify(monthOverview));
}

export const LoadTransactionData = (year) => {
    const yearOverview = localStorage.getItem(year);
    return JSON.parse(yearOverview);
}