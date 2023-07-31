import { labels } from "../resources/labels";
import Template from "../components/UI/Template/Template";
import UpdatePassword from "../components/Auth/UpdatePassword/UpdatePassword";
import AccountBase from "../components/Account/AccountBase";

const Account = () => {
    return (
        <Template>
            <h1>{labels.account}</h1>
            <AccountBase />
            <UpdatePassword />
        </Template>
    );
}

export default Account;