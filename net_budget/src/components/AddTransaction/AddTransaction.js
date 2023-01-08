import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../../actions/transactionActions";
import { addTransactionAPI } from "../../api/TransactionAPI";
import InputForm from "../UI/Form/InputForm";

const currentDate = new Date();
const defaultDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2 })}`;

const AddTransaction = () => {
    const { userId, token } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const defaultData = { type: 0, date: defaultDate, name: '', amount: null };

    const submitTransaction = (info) => {
        addTransactionAPI(userId, info.transaction, token).then((res) => {
            if (res) {
                dispatch(addTransaction({
                    ...info.transaction,
                    id: res.name
                }));
            }
        });
    }

    return (
        <InputForm submitType='Add' transactionAction={submitTransaction} defaults={defaultData} />
    );
}

export default AddTransaction;