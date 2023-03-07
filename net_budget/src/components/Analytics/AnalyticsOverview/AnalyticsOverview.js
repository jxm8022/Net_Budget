import { useSelector } from "react-redux";
import "./AnalyticsOverview.css";

const AnalyticsOverview = () => {
    const { mostVisited, lifetimeEarnings } = useSelector(state => state.transaction);

    const textClass = (amount) => amount < 0 ? 'negative' : '';

    return (
        <ul className="analyticsOverview">
            <li>
                <h4>Most Visited</h4>
                <p>{mostVisited}</p>
            </li>
            <li>
                <h4>Lifetime Net</h4>
                <p className={textClass(lifetimeEarnings)}>{lifetimeEarnings.toFixed(2)}</p>
            </li>
        </ul >
    );
}

export default AnalyticsOverview;