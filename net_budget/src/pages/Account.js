import { labels } from "../resources/labels";
import Template from "../components/UI/Template/Template";
import UpdatePassword from "../components/Auth/UpdatePassword/UpdatePassword";
// import RecurringTransactions from "../components/Account/RecurringTransactions/RecurringTransactions";
import DataManagement from "../components/Account/DataManagement";

const Account = () => {
    return (
        <Template>
            <h1>{labels.account}</h1>
            {/*<RecurringTransactions /> temporarily disable recurring transactions*/}
            <UpdatePassword />
            <DataManagement />
        </Template>
    );
}

export default Account;