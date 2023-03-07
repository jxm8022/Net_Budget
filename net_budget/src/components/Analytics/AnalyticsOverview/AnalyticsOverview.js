import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../UI/Table/Table";
import "./AnalyticsOverview.css";

const sortByTimes = (a, b) => {
    if (a[1].times > b[1].times) {
        return -1;
    }
    if (a[1].times < b[1].times) {
        return 1;
    }
    return 0;
}

const sortByAmount = (a, b) => {
    if (a[1].amount > b[1].amount) {
        return -1;
    }
    if (a[1].amount < b[1].amount) {
        return 1;
    }
    return 0;
}

const AnalyticsOverview = () => {
    const { mostVisited, lifetimeEarnings } = useSelector(state => state.transaction);
    const [topWantsByTimes, setTopWantsByTimes] = useState([]);
    const [topWantsByAmount, setTopWantsByAmount] = useState([]);

    useEffect(() => {
        let sortedDictionary = Object.keys(mostVisited).map((key) => [key, mostVisited[key]]);
        setTopWantsByTimes(sortedDictionary.sort(sortByTimes).slice(0, 5).map((data, i) => {
            return {
                id: i,
                place: i + 1,
                name: data[0],
                amount: data[1].times
            }
        }));
        setTopWantsByAmount(sortedDictionary.sort(sortByAmount).slice(0, 5).map((data, i) => {
            return {
                id: i,
                place: i + 1,
                name: data[0],
                amount: data[1].amount
            }
        }));
    }, [mostVisited]);

    const textClass = (amount) => amount < 0 ? 'negative' : '';

    return (
        <>
            <ul className="analyticsOverview">
                <li>
                    <h4>Lifetime Net</h4>
                    <p className={textClass(lifetimeEarnings)}>${lifetimeEarnings.toFixed(2)}</p>
                </li>
            </ul >
            <Table
                tableTitle={'Top Wants by Visits'}
                dataType={'TOPTRANSACTIONS'}
                headers={['#', 'Name', 'Times Visited']}
                data={topWantsByTimes}
            />
            <Table
                tableTitle={'Top Wants by Amount'}
                dataType={'TOPTRANSACTIONS'}
                headers={['#', 'Name', 'Amount Spent']}
                data={topWantsByAmount}
            />
        </>
    );
}

export default AnalyticsOverview;