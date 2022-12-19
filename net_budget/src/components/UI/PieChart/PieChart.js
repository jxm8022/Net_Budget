import { useSelector } from 'react-redux';
import './PieChart.css';

const LegendPart = (props) => {
    const { type, size, color } = props.pie;
    return (
        <div className='legend-part'>
            <div className='legend-color' style={{ 'backgroundColor': color }} />
            <p>{size}% - {type}</p>
        </div>
    );
}

const PieChart = (props) => {
    const { monthIndex } = props;
    const { transactions } = useSelector((state) => state.transaction.monthOverview[monthIndex]);

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
        { id: 1, type: 'Need', amount: 0, color: 'yellow' },
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

    const pie1 = pieData[0].size.toString();
    const pie2 = (pieData[0].size + pieData[1].size).toString();

    let pies = { 'backgroundImage': `conic-gradient(${pieData[0].color} 0% ${pie1}%, ${pieData[1].color} ${pie1}% ${pie2}%, ${pieData[2].color} ${pie2}% 100%)` };

    return (
        <div className='chart'>
            <div className="pie-chart" style={pies}></div>
            <div className='legend'>
                {pieData.map((pie) =>
                    <LegendPart key={pie.id} pie={pie} />
                )}
            </div>
        </div>
    );
}

export default PieChart;