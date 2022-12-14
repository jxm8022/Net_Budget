import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../actions/userActions';
import { signIn } from '../../api/userAPI';

import './AuthForm.css';

const AuthForm = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);

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

    return (
        <section className='auth'>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className='control'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' required ref={emailInputRef} />
                </div>
                <div className='control'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        required
                        ref={passwordInputRef}
                    />
                </div>
                <div className='actions'>
                    <button>{isLogin ? 'Login' : 'Create Account'}</button>
                    <button
                        type='button'
                        className='toggle'
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;