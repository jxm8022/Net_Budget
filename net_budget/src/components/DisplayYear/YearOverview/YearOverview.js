import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDate } from '../../../actions/transactionActions';
import { labels, months } from '../../../resources/labels';
import { SELECTORTYPES } from '../../../resources/constants';
import Selector from '../../UI/Selector/Selector';
import './Overview.css';

const YearOverview = (props) => {
    const { year, setSearchParams } = props;
    const { monthOverview } = useSelector((state) => state.transaction);
    const [bestMonth, setBestMonth] = useState({value: 0, index: 0});
    const [worstMonth, setWorstMonth] = useState({value: 0, index: 0});
    const [monthNet, setMonthNet] = useState(0);
    const dispatch = useDispatch();

    const onYearChange = (event) => {
        dispatch(setDate({ year: parseInt(event.target.value) }));
        setSearchParams(`year=${event.target.value}`);
    }

    useEffect(() => {
        if (monthOverview) {
            const best = monthOverview.reduce((best, month, index) => {
                if (month.net > best.value) {
                    return {
                        value: month.net.toFixed(2),
                        index: index
                    };
                }
                return best;
            }, {value: monthOverview[0].net.toFixed(2), index: 0});

            const worst = monthOverview.reduce((worst, month, index) => {
                if (month.net < worst.value) {
                    return {
                        value: month.net.toFixed(2),
                        index: index
                    };
                }
                return worst;
            }, {value: monthOverview[0].net.toFixed(2), index: 0});

            const net = monthOverview.reduce((net, month) => {
                return month.net + net;
            }, 0);

            setBestMonth(best);
            setWorstMonth(worst);
            setMonthNet(net.toFixed(2));
        }
    }, [monthOverview]);

    const textClass = (amount) => amount < 0 ? 'negative' : '';

    return (
        <>
            <h2>{year} Overview</h2>
            <Selector type={SELECTORTYPES.YEAR} onYearChange={onYearChange} />
            <ul className='overview'>
                <li>
                    <h4>{labels.bestNet}{` (${months[bestMonth.index].abb})`}</h4>
                    <p className={textClass(bestMonth.value)}>{`$${bestMonth.value}`}</p>
                </li>
                <li className='middle'>
                    <h4>{labels.net}</h4>
                    <p className={textClass(monthNet)}>{`$${monthNet}`}</p>
                </li>
                <li>
                    <h4>{labels.worstNet}{worstMonth && ` (${months[worstMonth.index].abb})`}</h4>
                    <p className={textClass(worstMonth.value)}>{`$${worstMonth.value}`}</p>
                </li>
            </ul >
        </>
    );
}

export default YearOverview;