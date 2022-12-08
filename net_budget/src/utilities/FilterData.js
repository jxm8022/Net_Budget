const AddFilter = (filter, sortedTransactions) => {
    return sortedTransactions.filter((transaction) => transaction.type === filter); // filtered data is filtered again
}

const RemoveFilter = (filter, sortedTransactions) => {

}

const ClearFilter = (filter, sortedTransactions) => {

}

const FilterData = (data) => {
    const { type, filter, sortedTransactions } = data;
    switch (type) {
        case 'ADD':
            return AddFilter(filter, sortedTransactions);
        case 'REMOVE':
            return RemoveFilter(filter, sortedTransactions);
        case 'CLEAR':
            return ClearFilter(filter, sortedTransactions);
        default:
            return sortedTransactions;
    }
}

export default FilterData;