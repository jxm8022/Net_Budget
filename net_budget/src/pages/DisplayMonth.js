import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { labels } from "../assets/labels";
import MonthDetails from "../components/MonthDetails/MonthDetails";
import MonthSelector from "../components/MonthDisplay/MonthSelector";
import MonthOverview from "../components/Overview/MonthOverview";
import PieChart from "../components/UI/PieChart/PieChart";
import Template from "../components/UI/Template/Template";

const DisplayMonth = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { currentMonth, currentYear, monthOverview } = useSelector((state) => state.transaction);
    const [styleData, setStyleData] = useState();
    const [legendData, setLegendData] = useState();

    const month = searchParams.get('month');
    const year = searchParams.get('year');

    useEffect(() => {
        let transactions = monthOverview[month].transactions;
        if (transactions && transactions.length > 0) {
            let pieData = transactions.reduce((previous, current) => {
                switch (current.type) {
                    case 0:
                        previous[0] = { ...previous[0], amount: previous[0].amount + current.amount };
                        return previous;
                    case 1:
                        previous[1] = { ...previous[1], amount: previous[1].amount + current.amount };
                        return previous;
                    case 2:
                    case 3:
                        previous[2] = { ...previous[2], amount: previous[2].amount + current.amount };
                        return previous;
                    default:
                        return previous
                }
            }, [
                { id: 0, type: 'Want', amount: 0, color: 'pink' },
                { id: 1, type: 'Need', amount: 0, color: 'lightgoldenrodyellow' },
                { id: 2, type: 'Savings/Debt', amount: 0, color: 'lightblue' }
            ]);
            pieData.sort((a, b) => {
                if (a.amount < b.amount) return -1;
                if (a.amount > b.amount) return 1;
                return 0;
            });

            const total = pieData[0].amount + pieData[1].amount + pieData[2].amount;

            pieData[0] = { ...pieData[0], size: Math.round(pieData[0].amount / total * 100) };
            pieData[1] = { ...pieData[1], size: Math.round(pieData[1].amount / total * 100) };
            pieData[2] = { ...pieData[2], size: Math.round(pieData[2].amount / total * 100) };

            if (total > 0) {
                setLegendData(pieData);

                setStyleData([
                    { color: pieData[0].color, start: 0, end: pieData[0].size },
                    { color: pieData[1].color, start: pieData[0].size, end: pieData[0].size + pieData[1].size },
                    { color: pieData[2].color, start: pieData[0].size + pieData[1].size, end: 100 },
                ]);
            } else {
                setLegendData();
                setStyleData();
            }
        } else {
            setLegendData();
            setStyleData();
        }
    }, [monthOverview, month, currentMonth, currentYear]);

    return (
        <Template>
            <MonthSelector monthIndex={month} year={year} setSearchParams={{ prevMonth: month, prevYear: year, setSearchParams }} />
            <PieChart styleData={styleData} legendData={legendData} />
            <MonthOverview monthIndex={month} />
            <MonthDetails monthIndex={month} />
            <a href='#top' className="scroll-top">{labels.top}</a>
        </Template>
    );
}

export default DisplayMonth;