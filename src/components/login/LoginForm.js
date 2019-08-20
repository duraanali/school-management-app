import React from 'react'
import './LoginForm.css';
export default function LoginForm() {
    return (
        <div className="form-module">
            <h2>Log In</h2>
            <form className="loginForm">
                <input className="zr_un_email valid" type="username" name="username" placeholder="username" />
                <input type="password" name="password" placeholder="Password" />

                <button type="submit">Login</button>
            </form>

            <div>

            </div>
        </div>

    );
}
