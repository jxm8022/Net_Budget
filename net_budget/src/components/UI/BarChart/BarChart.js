import BarGroup from "./BarGroup";
import './BarChart.css';

let state = {
    data: [
        { name: 'Jan', value: 1 },
        { name: 'Feb', value: 2 },
        { name: 'Mar', value: 3 },
        { name: 'Apr', value: 4 },
        { name: 'May', value: 5 },
        { name: 'Jun', value: 6 },
        { name: 'Jul', value: 7 },
        { name: 'Aug', value: 8 },
        { name: 'Sep', value: 9 },
        { name: 'Oct', value: 10 },
        { name: 'Nov', value: 11 },
        { name: 'Dec', value: -30 }
    ]
}

let max = 0;

for (let x of state.data) {
    if (Math.abs(x.value) > max) max = Math.abs(x.value);
}

let barHeight = 50;

const BarChart = () => {
    let barGroups = state.data.map((d, i) => <g key={i} transform={`translate(100, ${i * barHeight})`}>
        <BarGroup d={d} barHeight={barHeight} barWidth={max} />
    </g>);

    return (
        <svg width='800' height='600' className="chart">
            <g className='container'>{barGroups}</g>
        </svg >
    );
}

export default BarChart;