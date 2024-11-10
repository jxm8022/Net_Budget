import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { labels, months } from "../../../resources/labels";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Graph = () => {
    const { graphData } = useSelector((state) => state.graph);
    const { accountLabels } = useSelector((state) => state.accounts);
    const [ width, setWidth ] = useState(window.innerWidth);
    const [ isDarkMode ] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

    useEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    },[]);

    const data = {
        series: Object.keys(graphData).map(account => {
            return { name: accountLabels.find(accountLabel => accountLabel.id === account)?.label ?? account, data: graphData[account]}
        }),
        options: {
            noData: {
                text: labels.noDataText,
                style: {
                    color: 'var(--lightred)',
                    fontSize: '32px',
                }
            },
            chart: {
                type: 'line',
                zoom: {
                    enabled: false
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 5,
                curve: 'straight',
                dashArray: [0,0,5]
            },
            legend: {
                labels: {
                    colors: `${isDarkMode ? 'var(--pink)' : 'var(--teal)'}`
                }
            },
            markers: {
                size: 0,
                hover: {
                    sizeOffset: 6
                }
            },
            xaxis: {
                categories: months.map(month => month.abb),
                axisTicks: {
                    show: true,
                    borderType: 'dotted'
                },
                labels: {
                    style: {
                        colors: `${isDarkMode ? 'var(--pink)' : 'var(--teal)'}`,
                    }
                },
                crosshairs: {
                    show: true,
                    stroke: {
                        color: `${isDarkMode ? 'var(--pink)' : 'var(--teal)'}`
                    }
                },
                tooltip: {
                    enabled: false,
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: `${isDarkMode ? 'var(--pink)' : 'var(--teal)'}`,
                    },
                    formatter: function (val) {
                        return val?.toFixed(2)
                    }
                }
            },
            tooltip: {
                theme: true,
                y: Object.keys(graphData).map(account => {
                    return {
                        title: {
                            formatter: function (val) {
                                return val + " $"
                            }
                        }
                    }
                })
            },
            grid: {
                borderColor: `${isDarkMode ? 'var(--pink)' : 'var(--teal)'}`,
            }
        },
    };

    return (
        <GraphWrapper>
            <ReactApexChart options={data.options} series={data.series} type="line" height={400} width={width > 600 ? width * .8 : width} />
        </GraphWrapper>
    );
}

export default Graph;

const GraphWrapper = styled.div`
    .apexcharts-toolbar {
        color: var(--teal);
    }

    @media (prefers-color-scheme: dark) {
        .apexcharts-tooltip {
            background: var(--pink);
            color: var(--teal);
        }
    }

    @media (prefers-color-scheme: light) {
        .apexcharts-tooltip {
            background: var(--teal);
            color: var(--pink);
        }
    }
`;