import { labels } from "../resources/labels";
import Template from "../components/UI/Template/Template";
import UpdatePassword from "../components/Auth/UpdatePassword/UpdatePassword";

const Account = () => {
    return (
        <Template>
            <h1>{labels.account}</h1>
            <UpdatePassword />
        </Template>
    );
}

export default Account;