import './BarGroup.css';

const BarGroup = (props) => {
    const { name, value } = props.d;

    let barPadding = 10;

    let widthScale = d => d * (630 / props.barWidth);
    let width = widthScale(Math.abs(value));

    let yMid = props.barHeight * 0.5;

    let barColour = 'rgb(0, 91, 0)';
    let textColour = '#000';
    if (value < 0) {
        barColour = 'rgb(91, 0, 0)';
        textColour = 'rgb(91, 0, 0)';
    }

    return (
        <g className="bar-group">
            <text className="name-label" x="-25" y={yMid} alignmentBaseline="middle" >{name}</text>
            <rect y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
            <text className="value-label" x={700} y={yMid} alignmentBaseline="middle" fill={textColour} >{value}</text>
        </g>
    );
}

export default BarGroup;