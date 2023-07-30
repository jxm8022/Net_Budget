import { useDispatch, useSelector } from 'react-redux';
import { setDate } from '../../../actions/transactionActions';
import { labels } from '../../../assets/labels';
import { SELECTORTYPES } from '../../../assets/constants';
import Selector from '../../UI/Selector/Selector';
import './Overview.css';

const YearOverview = (props) => {
    const { year, setSearchParams } = props;
    const { monthOverview } = useSelector((state) => state.transaction);
    const dispatch = useDispatch();

    const max = monthOverview.reduce((max, month) => month.net > max ? month.net : max, monthOverview[0].net);
    const min = monthOverview.reduce((min, month) => month.net < min ? month.net : min, monthOverview[0].net);
    const netTotal = monthOverview.reduce((total, month) => month.net + total, 0);

    const onYearChange = (event) => {
        dispatch(setDate({ year: parseInt(event.target.value) }));
        setSearchParams(`year=${event.target.value}`);
    }

    const textClass = (amount) => amount < 0 ? 'negative' : '';

    return (
        <>
            <h2>{year} Overview</h2>
            <Selector type={SELECTORTYPES.YEAR} onYearChange={onYearChange} />
            <ul className='overview'>
                <li>
                    <h4>{labels.bestMonth}</h4>
                    <p className={textClass(max)}>{'$' + max.toFixed(2)}</p>
                </li>
                <li className='middle'>
                    <h4>{labels.net}</h4>
                    <p className={textClass(netTotal)}>{'$' + netTotal.toFixed(2)}</p>
                </li>
                <li>
                    <h4>{labels.worstMonth}</h4>
                    <p className={textClass(min)}>{'$' + min.toFixed(2)}</p>
                </li>
            </ul >
        </>
    );
}

export default YearOverview;