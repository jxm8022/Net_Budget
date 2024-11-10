import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AccountSummary = () => {
    const navigate = useNavigate();
    const { accounts } = useSelector((state) => state.accounts);
    const [gridCount, setGridCount] = useState(1);
    const [accountList, setAccountList] = useState([]);

    useEffect(() => {
        if (accounts.length > 1) {
            setGridCount(accounts.length)
            setAccountList([...accounts, {id: 'placeholder-account'}]);
        }
    }, [accounts]);

    const handleAddAccount = () => {
        // this should eventually open modal
        navigate({
            pathname: '/account',
        });
    }

    const AccountWrapper = (account) => {
        if (account.id === 'placeholder-account') {
            return <div key={account.id} className="placeholder">
                <button onClick={handleAddAccount}>Add account</button>
            </div>;
        }
        return <div key={account.id} className="accountWrapper">
            <p className="accountHeader">{account.name}</p>
            <hr className="accountSeparator" />
            <p className="accountBody">${account.displayBalance.toFixed(2)}</p>
        </div>;
    }

    return (
        <AccountSummaryWrapper>
            <h2>Summary</h2>
            <AccountsWrapper $columns={gridCount === 1 ? 1 : 2}>
                {accountList.map(account => AccountWrapper(account))}
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