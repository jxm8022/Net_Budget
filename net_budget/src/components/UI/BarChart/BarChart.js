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
            {max ? <g className='container'>{barGroups}</g> : <text id="noData" x={400 - (387.5 / 2)} y='300' fontSize={50} fill='#ff0000'>No data to display.</text>}
        </svg >
    );
}

export default BarChart;