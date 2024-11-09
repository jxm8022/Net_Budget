import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AccountSummary = () => {
    const navigate = useNavigate();
    const { accounts } = useSelector((state) => state.accounts);
    const accountsWithPlaceholder = [...accounts, {key: 'placeholder-account'}];

    const handleAddAccount = () => {
        // this should eventually open modal
        navigate({
            pathname: '/account',
        });
    }

    const AccountWrapper = (account) => {
        if (account.key === 'placeholder-account') {
            return <div key={account.key} className="placeholder">
                <button onClick={handleAddAccount}>Add account</button>
            </div>;
        }
        return <div key={account.key} className="accountWrapper">
            <p className="accountHeader">{account.key}</p>
            <hr className="accountSeparator" />
            <p className="accountBody">${account.value.balance}</p>
        </div>;
    }

    return (
        <AccountSummaryWrapper>
            <h2>Summary</h2>
            <AccountsWrapper>
                {accountsWithPlaceholder.map(account => AccountWrapper(account))}
            </AccountsWrapper>
        </AccountSummaryWrapper>
    );
}

export default AccountSummary;

const AccountSummaryWrapper = styled.div`
    h2 {
        text-align: center;
    }
`;

const AccountsWrapper = styled.div`
    /* mobile */
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 25px;
    margin: 0px;

    .accountWrapper {
        .accountHeader {
            margin: 0px;
            text-align: center;
        }

        .accountSeparator {
            margin: 0px;
        }

        .accountBody {
            text-align: center;
        }
    }

    .placeholder {
        margin: auto;
    }

    /* tablets */
    @media only screen and (min-width: 600px) {
    }

    /* desktop */
    @media only screen and (min-width: 900px) {
    }

    @media (prefers-color-scheme: dark) {
    }

    @media (prefers-color-scheme: light) {
    }
`;