import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../firebase/auth'

import "./login.css";
function Login() {
    const { signIn, user } = useAuth();
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        const { username, password } = e.target;
        await signIn(username.value, password.value);
        navigate("/");
    }
    return (
        <div className='login'>
            <form onSubmit={handleSignIn}>
                <h2 className='heading'>E-comm</h2>
                <section>
                    <label htmlFor="username"><strong>Username</strong></label>
                    <input type="text" name="username" id="username" />
                </section>
                <section>
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" name="password" id="password" />
                </section>
                <button type='submit'>Sign In</button>
                <section>
                    <p>New user? <Link to="/signup">Sign Up</Link></p>
                </section>
            </form>
        </div>
    )
}

export default Login