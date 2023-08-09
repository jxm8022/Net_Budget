import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { months } from "../../../resources/labels";
import { useEffect, useState } from "react";
import './Graph.css';

const Graph = (props) => {
    const { graphData } = useSelector((state) => state.transaction);
    const [ width, setWidth ] = useState(window.innerWidth);
    const [ isDarkMode, setIsDarkMode ] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

    useEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    },[]);

    const data = {
        series: [
            {
                name: "Income",
                data: graphData.income
            },
            {
                name: "Spent",
                data: graphData.spent
            },
            {
                name: 'Net',
                data: graphData.net
            }
        ],
        options: {
            noData: {
                text: 'No data',
                style: {
                    color: 'var(--lightred)',
                    fontSize: '32px',
                }
            },
            chart: {
                height: 650,
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
            colors: ['#69995D', '#e43939', '#213029'],
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
                    }
                }
            },
            tooltip: {
                theme: true,
                y: [
                    {
                        title: {
                            formatter: function (val) {
                                return val + " $"
                            }
                        }
                    },
                    {
                        title: {
                            formatter: function (val) {
                                return val + " $"
                            }
                        }
                    },
                    {
                        title: {
                            formatter: function (val) {
                                return val + " $";
                            }
                        }
                    }
                ]
            },
            grid: {
                borderColor: `${isDarkMode ? 'var(--pink)' : 'var(--teal)'}`,
            }
        },
    };

    return (
        <>
            <ReactApexChart options={data.options} series={data.series} type="line" height={350} width={width > 600 ? width * .8 : width} />
        </>
    );
}

export default Graph;