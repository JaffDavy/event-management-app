import React, { useState, useContext } from "react";
import '../../../App.css';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../authenContext";

export const Login = (props) => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            console.error('Email and password are required');
            setErrorMessage('Email and password are required');
            return;
        }

        try {
            console.log('Sending request with:', { email, password });

            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            console.log('Response status:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);

                login({
                    token: data.token,
                    user: data.user,
                });

                navigate('/homepage');
            } else {
                const errorData = await response.json();
                
                if (response.status === 404 || errorData.message === 'User not found') {
                    setErrorMessage('User not found. Please register.');
                } else {
                    setErrorMessage('Login failed. Please check your credentials or register.');
                }

                console.error('Login failed:', response.status, response.statusText, errorData);
            }
        } catch (error) {
            console.error('Error:', error.message);
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="youremail@gmail.com"
                    id="email"
                    name="email"
                />
                <label htmlFor="password">Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password"
                />
                <button type="submit">Log In</button>
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>
                Don't have an account? Register here.
            </button>
        </div>
    );
};
