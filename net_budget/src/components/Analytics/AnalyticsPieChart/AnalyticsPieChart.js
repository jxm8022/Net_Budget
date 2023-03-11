import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PieChart from "../../UI/PieChart/PieChart";

const AnalyticsPieChart = () => {
    const { lifetimeTypes } = useSelector((state) => state.transaction);
    const [styleData, setStyleData] = useState();
    const [legendData, setLegendData] = useState();

    useEffect(() => {
        if (lifetimeTypes && lifetimeTypes.length > 0) {
            let pieData = [
                { id: 0, type: 'Want', amount: 0, color: 'pink' },
                { id: 1, type: 'Need', amount: 0, color: 'lightgoldenrodyellow' },
                { id: 2, type: 'Savings', amount: 0, color: 'lightblue' },
                { id: 3, type: 'Debt', amount: 0, color: 'lightsalmon' },
                { id: 4, type: 'Income', amount: 0, color: 'lightgreen' }
            ];

            lifetimeTypes.forEach(type => {
                switch (type[0]) {
                    case 'Want':
                        pieData[0].amount = type[1];
                        break;
                    case 'Need':
                        pieData[1].amount = type[1];
                        break;
                    case 'Savings':
                        pieData[2].amount = type[1];
                        break;
                    case 'Debt':
                        pieData[3].amount = type[1];
                        break;
                    case 'Income':
                        pieData[4].amount = type[1];
                        break;
                    default:
                        break;
                }
            });

            let total = pieData.reduce((previous, current) => {
                return previous += current.amount
            }, 0);

            pieData.forEach((pie, i) => {
                pieData[i] = { ...pie, size: Math.round(pie.amount / total * 100) };
            });

            setStyleData([
                { color: pieData[0].color, start: 0, end: pieData[0].size },
                { color: pieData[1].color, start: pieData[0].size, end: pieData[0].size + pieData[1].size },
                { color: pieData[2].color, start: pieData[0].size + pieData[1].size, end: pieData[0].size + pieData[1].size + pieData[2].size },
                { color: pieData[3].color, start: pieData[0].size + pieData[1].size + pieData[2].size, end: pieData[0].size + pieData[1].size + pieData[2].size + pieData[3].size },
                { color: pieData[4].color, start: pieData[0].size + pieData[1].size + pieData[2].size + pieData[3].size, end: 100 },
            ]);
            setLegendData(pieData);
        }
    }, [lifetimeTypes])

    return (
        <>
            <h3>Lifetime Transaction Types</h3>
            <PieChart styleData={styleData} legendData={legendData} />
        </>
    );
}

export default AnalyticsPieChart;