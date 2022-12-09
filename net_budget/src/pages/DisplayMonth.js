import { useSearchParams } from "react-router-dom";
import MonthDetails from "../components/MonthDetails/MonthDetails";
import MonthSelector from "../components/MonthDisplay/MonthSelector";
import MonthOverview from "../components/Overview/MonthOverview";
import Template from "../components/UI/Template/Template";

const DisplayMonth = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const month = searchParams.get('month');
    const year = searchParams.get('year');

    return (
        <Template>
            <MonthSelector monthIndex={month} year={year} setSearchParams={{ prevMonth: month, prevYear: year, setSearchParams }} />
            <MonthOverview monthIndex={month} />
            <MonthDetails monthIndex={month} />
        </Template>
    );
}

export default DisplayMonth;