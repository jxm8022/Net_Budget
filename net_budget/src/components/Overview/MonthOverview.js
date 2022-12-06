import './Overview.css';

const MonthOverview = () => {
    const max = 0;
    const min = 0;
    const netTotal = 0;

    const textClass = (amount) => amount < 0 ? 'negative' : '';

    return (
        <ul className='overview'>
            <li className='tooltip'>
                <h4>Potential Net</h4>
                <p className={textClass(max)}>{'$' + max.toFixed(2)}</p>
                <span className='tooltiptext tooltip-left arrow-right'>Potential Net is calculated by subtracting potential transactions from your current net. (Net - Potential Transactions)</span>
            </li>
            <li className='middle'>
                <h4>Net</h4>
                <p className={textClass(netTotal)}>{'$' + netTotal.toFixed(2)}</p>
            </li>
            <li className='tooltip'>
                <h4>Projected Net</h4>
                <p className={textClass(min)}>{'$' + min.toFixed(2)}</p>
                <span className='tooltiptext tooltip-right arrow-left'>Projected Net is calculated by adding your projected income to your potential net. (Potential Net + Projected Income)</span>
            </li>
        </ul >
    );
}

export default MonthOverview;