import { useSelector } from 'react-redux';
import Selector from '../UI/Selector/Selector';
import './Overview.css';

const YearOverview = (props) => {
    const { year, setSearchParams } = props;
    const { monthOverview } = useSelector((state) => state.transaction);

    const max = monthOverview.reduce((max, month) => month.net > max ? month.net : max, monthOverview[0].net);
    const min = monthOverview.reduce((min, month) => month.net < min ? month.net : min, monthOverview[0].net);
    const netTotal = monthOverview.reduce((total, month) => month.net + total, 0);

    const onYearChange = (event) => {
        setSearchParams(`year=${event.target.value}`);
    }

    const textClass = (amount) => amount < 0 ? 'negative' : '';

    return (
        <>
            <h2>{year} Overview</h2>
            <Selector type='YEAR' onYearChange={onYearChange} />
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
        </>
    );
}

export default YearOverview;