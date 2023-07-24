import { months, labels } from "../../../assets/labels";
import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import './MonthSelector.css';
import { useDispatch } from "react-redux";
import { setDate } from "../../../actions/transactionActions";

const MonthSelector = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const month = searchParams.get('month');
    const year = searchParams.get('year');

    const addTransaction = () => {
        navigate({
            pathname: '/monthOverview/addTransaction',
            search: createSearchParams({
                month: month,
                year: year
            }).toString()
        });
    }

    const submitForm = (e) => {
        setSearchParams(`month=${e.target.value}&year=${year}`);
        dispatch(setDate({ month: parseInt(e.target.value) }));
    }

    return (
        <>
            <h2>{months[month].month} {year}</h2>
            <form className='month-input-form' onChange={submitForm}>
                <label>{labels.month}
                    <select id='month' defaultValue={month}>
                        {months.map((month, index) => <option key={month.abb} value={index}>{month.abb}</option>)}
                    </select>
                </label>
            </form>
            <button onClick={addTransaction}>{labels.addTransaction}</button>
        </>
    );
}

export default MonthSelector;