import { useSelector } from "react-redux";
import { labels } from "../../../assets/labels";
import { TABLETYPES } from "../../../assets/constants";
import Table from "../../UI/Table/Table";
import "./AnalyticsOverview.css";

const AnalyticsOverview = () => {
    const { topVisited_amount, topVisited_times, lifetimeNet } = useSelector(state => state.statistics);

    const textClass = (amount) => amount < 0 ? 'negative' : '';

    return (
        <>
            <ul className="analyticsOverview">
                <li>
                    <h4>{labels.lifetimeNet}</h4>
                    <p className={textClass(lifetimeNet)}>${lifetimeNet.toFixed(2)}</p>
                </li>
            </ul >
            <Table
                tableTitle={labels.topWantVisits}
                dataType={TABLETYPES.TOPTRANSACTIONS}
                headers={labels.topWantVisitsHeaders}
                data={topVisited_times}
            />
            <Table
                tableTitle={labels.topWantAmounts}
                dataType={TABLETYPES.TOPTRANSACTIONS}
                headers={labels.topWantAmountsHeaders}
                data={topVisited_amount}
            />
        </>
    );
}

export default AnalyticsOverview;