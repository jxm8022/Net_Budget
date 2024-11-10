import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { labels, months } from '../../../resources/labels';
import './Overview.css';

const YearOverview = (props) => {
    const { graphData } = useSelector((state) => state.graph);
    const [bestMonth, setBestMonth] = useState({value: 0, index: 0});
    const [worstMonth, setWorstMonth] = useState({value: 0, index: 0});
    const [monthNet, setMonthNet] = useState(0);

    useEffect(() => {
        if (graphData) {
            let best = {value: 0, index: 0};
            let worst = {value: 0, index: 0};

            for (const monthIndex in graphData.net)
            {
                if (graphData.net[monthIndex] > best.value)
                {
                    best = {value: graphData.net[monthIndex], index: monthIndex}
                }

                if (graphData.net[monthIndex] < worst.value)
                {
                    worst = {value: graphData.net[monthIndex], index: monthIndex}
                }
            } 

            const net = graphData.net.reduce((total, monthValue) => total + monthValue, 0)

            setBestMonth(best);
            setWorstMonth(worst);
            setMonthNet(net);
        }
    }, [graphData]);

    const textClass = (amount) => amount < 0 ? 'negative' : '';

    return (
        <>
            <ul className='overview'>
                <li>
                    <h4>{labels.bestNet}{` (${months[bestMonth.index].abb})`}</h4>
                    <p className={textClass(bestMonth.value)}>{`$${bestMonth.value.toFixed(2)}`}</p>
                </li>
                <li className='middle'>
                    <h4>{labels.net}</h4>
                    <p className={textClass(monthNet)}>{`$${monthNet.toFixed(2)}`}</p>
                </li>
                <li>
                    <h4>{labels.worstNet}{worstMonth && ` (${months[worstMonth.index].abb})`}</h4>
                    <p className={textClass(worstMonth.value)}>{`$${worstMonth.value.toFixed(2)}`}</p>
                </li>
            </ul >
        </>
    );
}

export default YearOverview;