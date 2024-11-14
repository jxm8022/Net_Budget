import { useEffect, useState } from "react";
import Graph from "../DisplayYear/Graph/Graph";
import styled from "styled-components";
import { useSelector } from "react-redux";

const NetSummary = (props) => {
    const { accountDictionary } = useSelector((state) => state.accounts);
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        let updatedGraphData = [];
        for (const month in props.statistics)
        {
            const monthIndex = month - 1;
            for (const accountId in props.statistics[month])
            {
                const accountName = accountDictionary[accountId];
                let accountSeries = updatedGraphData.find(d => d.name == accountName);
                if (!accountSeries)
                {
                    let accountData = new Array(12).fill(0);
                    accountData[monthIndex] = props.statistics[month][accountId].net;
                    updatedGraphData.push({name: accountName, data: accountData});
                }
                else
                {
                    accountSeries.data[monthIndex] = props.statistics[month][accountId].net;
                }
            }
        }

        setGraphData(updatedGraphData);
    },[props.statistics]);

    return (
        <NetSummaryWrapper>
            <Graph series={graphData} />
        </NetSummaryWrapper>
    );
}

export default NetSummary;

const NetSummaryWrapper = styled.div`
`;