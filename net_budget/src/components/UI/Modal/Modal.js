import { useDispatch, useSelector } from 'react-redux';
import { updateTransaction, deleteTransaction } from '../../../actions/transactionActions';
import { deleteTransactionAPI, updateTransactionAPI } from '../../../api/TransactionAPI';
import InputForm from '../Form/InputForm';
import { labels } from '../../../resources/labels';
import './Modal.css';

const Modal = (props) => {
    const { data, closeModal } = props;
    const { userId, token } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const submitTransaction = (info) => {
        const { submitType, transaction } = info;
        switch (submitType) {
            case 'Update':
                updateTransactionAPI(userId, transaction, data, token).then((res) => {
                    dispatch(updateTransaction({
                        new: {...transaction, id: data.id},
                        prev: data
                    }));
                });
                break;
            case 'Delete':
                deleteTransactionAPI(userId, data, token).then((res) => {
                    dispatch(deleteTransaction({
                        prev: data
                    }));
                });
                break;
            default:
                break;
        }
    }

    return (
        <div className='modal'>
            <div className='modal-header'>
                <span className='close' onClick={closeModal}>&times;</span>
                <h2>{labels.updateTransaction}</h2>
            </div>
            <div className='modal-body'>
                <InputForm submitType='Update' deleteTransaction={true} closeModal={closeModal} transactionAction={submitTransaction} defaults={data} />
            </div>
        </div>
    );
}

export default Modal;