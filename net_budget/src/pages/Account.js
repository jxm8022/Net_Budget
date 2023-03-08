import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Template from "../components/UI/Template/Template";

import showHidePassword from '../assets/images/auth/icons8-eye-90.png';
import { setMessage } from "../actions/pageActions";
import { changePassword } from "../api/userAPI";
import { login } from "../actions/userActions";
import Analytics from "../components/Analytics/AnalyticsBase";

const Account = () => {
    const dispatch = useDispatch();
    const passwordInputRef = useRef();
    const { token } = useSelector((state) => state.user);

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredPassword = passwordInputRef.current.value;

        if (token) {
            changePassword(token, enteredPassword).then((res) => {
                if (res) {
                    dispatch(login(res));
                    dispatch(setMessage('Password successfully changed'));
                }
            });
        }

        passwordInputRef.current.value = '';
    };

    const showPassword = () => {
        var type = document.getElementById('password');
        if (type.getAttribute('type') === 'password') {
            type.setAttribute('type', 'text');
        } else {
            type.setAttribute('type', 'password');
        }
    };

    return (
        <Template>
            <h1>Account</h1>
            <hr style={{ width: "50%" }} />
            <Analytics />
            <hr style={{ width: "50%" }} />
            <form onSubmit={submitHandler}>
                <div className='control'>
                    <label htmlFor='password'>Change Password</label>
                    <div className='passwordContainer'>
                        <input
                            type='password'
                            id='password'
                            required
                            ref={passwordInputRef}
                        />
                        <img onClick={showPassword} src={showHidePassword} alt='Hide or show password' className='showPassword' />
                    </div>
                </div>
                <div className='actions'>
                    <button>Submit</button>
                </div>
            </form>
        </Template>
    );
}

export default Account;