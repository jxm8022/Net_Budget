import { useDispatch } from 'react-redux';
import { updateTransaction } from '../../../actions/transactionActions';
import InputForm from '../Form/InputForm';
import './Modal.css';

const Modal = (props) => {
    const { data, closeModal } = props;
    const dispatch = useDispatch();

    const submitTransaction = (transaction) => {
        dispatch(updateTransaction({
            new: transaction,
            prev: data
        }));
    }

    return (
        <div className='modal'>
            <div className='modal-header'>
                <span className='close' onClick={closeModal}>&times;</span>
                <h2>Update Transaction</h2>
            </div>
            <div className='modal-body'>
                <InputForm type='Update' transactionAction={submitTransaction} defaults={data} />
            </div>
        </div>
    );
}

export default Modal;