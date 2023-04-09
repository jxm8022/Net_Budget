import { useSelector } from 'react-redux';
import './SiteInfo.css';

const Definitions = () => {
    return (
        <>
            <h2 id='definitions'>Definitions</h2>
            <div className='about-body'>
                <p><b>50/30/20: </b>A budgeting rule that divides your monthly income into three categories, spending 50% on needs, 30% on wants, and 20% on savings and/or debt reduction.</p>
                <p><b>Zero-Based: </b>A budgeting rule where you subtract expenses from your monthly income until you have a remainder that goes to fund whatever is most pressing that month.</p>
                <p><b>Net-Based: </b>A budgeting rule based off of Zero-Based where you subtract expenses from your monthly income. The goal is to spend less than the monthly income to achieve positive net income.</p>
                <p><b>Net: </b>The amount of money available to spend in the corresponding month based off of month net after potential transactions are factored.</p>
                <p className='equation'>Net = Income - Transactions</p>
                <p><b>Potential Net: </b>The amount of money available to spend in the corresponding month based off of month net after potential transactions are factored.</p>
                <p className='equation'>Potential Net = Net - Potential Transactions</p>
                <p><b>Projected Income: </b>The amount of money that will be potentially available during the month.</p>
                <p><b>Projected Net: </b>The amount of money available to spend in the corresponding month based off of month net after potential transactions are factored.</p>
                <p className='equation'>Projected Net = Potential Net + Projected Income</p>
                <p><b>Want: </b>Transactions that are not crucial.</p>
                <p className='equation'>Examples: movies, fast food, snacks, etc</p>
                <p><b>Need: </b>Transactions that are necessary for daily life.</p>
                <p className='equation'>Examples: bills, groceries, gas, etc</p>
                <p><b>Savings: </b>Money set aside to not be spent.</p>
                <p className='equation'>Example: transfer from debit account to savings account.</p>
                <p><b>Debt: </b>Money put towards paying off a debt.</p>
                <p className='equation'>Examples: credit cards, loans, etc</p>
                <p><b>Income: </b>Money received from any medium.</p>
                <p className='equation'>Examples: paycheck, zelle, etc</p>
                <p><b>pTransaction: </b>Potential transactions that have not happened yet that are of any type, besides income.</p>
                <p><b>pIncome: </b>Potential incomes that have not happened yet.</p>
            </div>
        </>
    );
}

const HowTo = () => {
    return (
        <>
            <h2 id='howto'>How To</h2>
            <p className='about-body'>
                Based off of your personal bank records, <a href='./addTransaction' className='inline-anchor'>add a transaction</a> when a payment has been finalized on your account.
                The transaction type determines how your budget is calculated. For pending transactions, they have their own types, <b>pTransaction</b> and <b>pIncome</b>.
            </p>
        </>
    );
}

const SiteInfo = () => {
    const { currentMonth, currentYear } = useSelector((state) => state.transaction);
    return (
        <>
            <ul className='page-references'>
                <li><a href='#howto'>How To</a></li>
                <li className='middle'><a href='#developer'>About Developer</a></li>
                <li><a href='#definitions'>Definitions</a></li>
            </ul >
            <p className='about-body'>
                The <a href='.' className='inline-anchor'>bar chart</a> displays the net information for each month in a given year.
                The <a href={`./monthOverview?month=${currentMonth}&year=${currentYear}`} className='inline-anchor'>month overview</a> shows how you are doing in a given month.
                The month overview has <b>Potential Net</b>, <b>Net</b>, <b>Projected Net</b>, and a table with corresponding transactions.
            </p>
            <p className='about-body'>
                This website uses two main budgeting strategies. The first strategy is the <b>50/30/20</b> budget. The second strategy is loosely based on the <b>Zero-Based Budget</b>, <b>Net-Based Budget</b>.
            </p>
            <HowTo />
            <Definitions />
        </>
    );
}

export default SiteInfo;