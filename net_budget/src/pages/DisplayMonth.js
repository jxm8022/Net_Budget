import MonthDetails from "../components/MonthDetails/MonthDetails";
import MonthSelector from "../components/MonthDisplay/MonthSelector";
import MonthOverview from "../components/Overview/MonthOverview";
import Template from "../components/UI/Template/Template";

const DisplayMonth = () => {
    return (
        <Template>
            <MonthSelector />
            <MonthOverview />
            <MonthDetails />
        </Template>
    );
}

export default DisplayMonth;