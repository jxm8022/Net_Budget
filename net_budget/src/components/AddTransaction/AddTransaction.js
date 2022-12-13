import { useDispatch } from "react-redux";
import { addTransaction, saveTransactions } from "../../actions/transactionActions";
import InputForm from "../UI/Form/InputForm";

const currentDate = new Date();
const defaultDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2 })}`;

const AddTransaction = () => {
    const dispatch = useDispatch();
    const defaultData = { type: 0, date: defaultDate, name: '', amount: null };

    const submitTransaction = (info) => {
        dispatch(addTransaction(info.transaction));
        dispatch(saveTransactions());
    }

    return (
        <InputForm submitType='Add' transactionAction={submitTransaction} defaults={defaultData} />
    );
}

export default AddTransaction;