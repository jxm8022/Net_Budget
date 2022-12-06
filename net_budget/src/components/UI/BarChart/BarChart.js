import { useSelector } from 'react-redux';
import BarGroup from "./BarGroup";
import './BarChart.css';

let barHeight = 50;

const BarChart = () => {
    const { monthOverview } = useSelector((state) => state.transaction);

    const max = monthOverview.reduce((max, month) => month.net > max ? month.net : max, monthOverview[0].net);

    let barGroups = monthOverview.map((month, index) => <g key={index} transform={`translate(100, ${index * barHeight})`}>
        <BarGroup index={index} month={month} barHeight={barHeight} barWidth={max} />
    </g>);

    return (
        <svg width='800' height='600' className="chart">
            <g className='container'>{barGroups}</g>
        </svg >
    );
}

export default BarChart;