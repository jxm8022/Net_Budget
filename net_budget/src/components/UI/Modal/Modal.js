import { useDispatch } from 'react-redux';
import { updateTransaction, deleteTransaction, saveTransactions } from '../../../actions/transactionActions';
import InputForm from '../Form/InputForm';
import './Modal.css';

const Modal = (props) => {
    const { data, closeModal } = props;
    const dispatch = useDispatch();

    const submitTransaction = (info) => {
        const { submitType, transaction } = info;
        switch (submitType) {
            case 'Update':
                dispatch(updateTransaction({
                    new: transaction,
                    prev: data
                }));
                dispatch(saveTransactions());
                break;
            case 'Delete':
                dispatch(deleteTransaction({
                    prev: data
                }));
                dispatch(saveTransactions());
                break;
            default:
                break;
        }
    }

    return (
        <div className='modal'>
            <div className='modal-header'>
                <span className='close' onClick={closeModal}>&times;</span>
                <h2>Update Transaction</h2>
            </div>
            <div className='modal-body'>
                <InputForm submitType='Update' deleteTransaction={true} closeModal={closeModal} transactionAction={submitTransaction} defaults={data} />
            </div>
        </div>
    );
}

export default Modal;