import { months } from '../../../assets/months';
import './BarGroup.css';

const BarGroup = (props) => {
    const { net } = props.month;
    const { index } = props;

    let barPadding = 10;

    let widthScale = net => net * (630 / props.barWidth);
    let width = widthScale(Math.abs(net));

    let yMid = props.barHeight * 0.5;

    let barColour = 'rgb(0, 91, 0)';
    let textColour = '#000';
    if (net < 0) {
        barColour = 'rgb(91, 0, 0)';
        textColour = 'rgb(91, 0, 0)';
    }

    return (
        <g className="bar-group">
            <text className="name-label" x="-25" y={yMid} alignmentBaseline="middle" >{months[index].abb}</text>
            <rect y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
            <text className="value-label" x={700} y={yMid} alignmentBaseline="middle" fill={textColour} >${net}</text>
        </g>
    );
}

export default BarGroup;