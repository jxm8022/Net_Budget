import { useSelector } from 'react-redux';
import { labels } from '../../assets/labels';
import './Overview.css';

const MonthOverview = (props) => {
    const { monthIndex } = props;
    const { potNet, projNet, net } = useSelector((state) => state.transaction.monthOverview[monthIndex]);

    const textClass = (amount) => amount < 0 ? 'negative' : '';

    return (
        <ul className='overview'>
            <li>
                <h4>{labels.potentialNet}</h4>
                <p className={textClass(potNet)}>{'$' + potNet.toFixed(2)}</p>
            </li>
            <li className='middle'>
                <h4>{labels.net}</h4>
                <p className={textClass(net)}>{'$' + net.toFixed(2)}</p>
            </li>
            <li>
                <h4>{labels.projectedNet}</h4>
                <p className={textClass(projNet)}>{'$' + projNet.toFixed(2)}</p>
            </li>
        </ul >
    );
}

export default MonthOverview;