import { labels } from "../assets/labels";
import AddTransaction from "../components/AddTransaction/AddTransaction";
import Template from "../components/UI/Template/Template";

const InsertItem = () => {
    return (
        <Template>
            <h2>{labels.addTransaction}</h2>
            <AddTransaction />
        </Template>
    );
}

export default InsertItem;