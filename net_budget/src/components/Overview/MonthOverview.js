import { useSelector } from 'react-redux';
import './Overview.css';

const MonthOverview = (props) => {
    const { monthIndex } = props;
    const { potNet, projNet, net } = useSelector((state) => state.transaction.monthOverview[monthIndex]);

    const textClass = (amount) => amount < 0 ? 'negative' : '';

    return (
        <ul className='overview'>
            <li className='tooltip'>
                <h4>Potential Net</h4>
                <p className={textClass(potNet)}>{'$' + potNet.toFixed(2)}</p>
                <span className='tooltiptext tooltip-left arrow-right'>Potential Net is calculated by subtracting potential transactions from your current net. (Net + Potential Transactions)</span>
            </li>
            <li className='middle'>
                <h4>Net</h4>
                <p className={textClass(net)}>{'$' + net.toFixed(2)}</p>
            </li>
            <li className='tooltip'>
                <h4>Projected Net</h4>
                <p className={textClass(projNet)}>{'$' + projNet.toFixed(2)}</p>
                <span className='tooltiptext tooltip-right arrow-left'>Projected Net is calculated by adding your projected income to your potential net. (Potential Net + Projected Income)</span>
            </li>
        </ul >
    );
}

export default MonthOverview;