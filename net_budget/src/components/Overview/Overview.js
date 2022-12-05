import './Overview.css';

let state = {
    data: [
        { name: 'Jan', value: 1 },
        { name: 'Feb', value: 2 },
        { name: 'Mar', value: 3 },
        { name: 'Apr', value: 4 },
        { name: 'May', value: 5 },
        { name: 'Jun', value: 6 },
        { name: 'Jul', value: 7 },
        { name: 'Aug', value: 8 },
        { name: 'Sep', value: 9 },
        { name: 'Oct', value: 10 },
        { name: 'Nov', value: 11 },
        { name: 'Dec', value: -30 }
    ]
}

let netTotal = 0;
let max = state.data[0].value;
let min = state.data[0].value;

for (let x of state.data) {
    netTotal += x.value;
    if (x.value > max) max = x.value;
    if (x.value < min) min = x.value;
}

const Overview = () => {
    const textClass = (amount) => amount < 0 ? 'negative' : '';
    return (
        <ul className='overview'>
            <li>
                <h4>Best Month</h4>
                <p className={textClass(max)}>{'$' + max.toFixed(2)}</p>
            </li>
            <li className='middle'>
                <h4>Net</h4>
                <p className={textClass(netTotal)}>{'$' + netTotal.toFixed(2)}</p>
            </li>
            <li>
                <h4>Worst Month</h4>
                <p className={textClass(min)}>{'$' + min.toFixed(2)}</p>
            </li>
        </ul >
    );
}

export default Overview;