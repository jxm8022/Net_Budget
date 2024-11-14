import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AccountSummary = (props) => {
    const navigate = useNavigate();

    const accountArray = [...Object.entries(props.accounts), ['placeholder', {isPlaceHolder: true}]];

    const handleAddAccount = () => {
        // this should eventually open modal
        navigate({
            pathname: '/account',
        });
    }

    const AccountWrapper = (accountPayload) => {
        const accountId = accountPayload[0];
        const account = accountPayload[1];

        if (account.isPlaceHolder) {
            return <div key={accountId} className="placeholder">
                <button onClick={handleAddAccount}>Add account</button>
            </div>;
        }
        return <div key={accountId} className="accountWrapper">
            <p className="accountHeader">{account.name}</p>
            <hr className="accountSeparator" />
            <p className="accountBody">${account.currentBalance.toFixed(2)}</p>
        </div>;
    }

    return (
        <AccountsWrapper $columns={accountArray.length === 1 ? 1 : 2}>
            {accountArray.map(account => AccountWrapper(account))}
        </AccountsWrapper>
    );
}

export default AccountSummary;

const AccountsWrapper = styled.div`
    /* mobile */
    display: grid;
    grid-template-columns: ${({ $columns }) => `repeat(${$columns}, 1fr)`};
    grid-gap: 25px;
    margin: 0px;

    .accountWrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    
        .accountHeader {
            height: 3em;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            margin: 0px;
        }

        .accountSeparator {
            margin: 0px;
        }

        .accountBody {
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
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