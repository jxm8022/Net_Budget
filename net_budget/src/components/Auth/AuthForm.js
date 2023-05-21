import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMessage } from '../../actions/pageActions';
import { login } from '../../actions/userActions';
import { signIn, resetPassword } from '../../api/userAPI';
import { labels } from '../../assets/labels';

import showHidePassword from '../../assets/images/auth/icons8-eye-90.png';
import './AuthForm.css';

const AuthForm = () => {
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isLogin, setIsLogin] = useState(true);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        if (isLogin) {
            signIn(!isLogin, enteredEmail, enteredPassword).then((res) => {
                if (res) {
                    dispatch(login(res));
                    navigate({
                        pathname: '/yearOverview',
                    });
                }
            })
        } else {
            signIn(!isLogin, enteredEmail, enteredPassword).then((res) => {
                if (res) {
                    dispatch(login(res));
                    navigate({
                        pathname: '/yearOverview',
                    });
                }
            })
        }
    };

    const sendEmail = () => {
        const enteredEmail = emailInputRef.current.value;

        if (enteredEmail.length > 0) {
            setIsEmailValid(true);
            resetPassword(enteredEmail).then((res) => {
                if (res) {
                    dispatch(setMessage(`Instructions sent to ${res.email}`));
                }
            })
        } else {
            setIsEmailValid(false);
        }
    }

    const showPassword = () => {
        var type = document.getElementById('password');
        if (type.getAttribute('type') === 'password') {
            type.setAttribute('type', 'text');
        } else {
            type.setAttribute('type', 'password');
        }
    };

    return (
        <section className='auth'>
            <h1>{isLogin ? labels.login : labels.signUp}</h1>
            <form onSubmit={submitHandler}>
                <div className='control'>
                    <label style={{ color: 'white' }} htmlFor='email'>{labels.email}</label>
                    <input type='email' id='email' required ref={emailInputRef} />
                    {!isEmailValid ? <p className='error'>{labels.enterEmail}</p> : <></>}
                </div>
                <div className='control'>
                    <label style={{ color: 'white' }} htmlFor='password'>{labels.password}</label>
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
                    <button>{isLogin ? labels.login : labels.createAccount}</button>
                    <button
                        type='button'
                        className='toggle'
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? labels.signUp : labels.login}
                    </button>
                </div>
            </form>
            {isLogin ? <button onClick={sendEmail} className='forgotPassword'>{labels.forgotPassword}</button> : <></>}
        </section>
    );
};

export default AuthForm;