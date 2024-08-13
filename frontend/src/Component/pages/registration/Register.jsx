import React, { useState, useContext } from "react";
import '../../../App.css';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../authenContext";

export const Register = (props) => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [full_name, setFullName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting:', { email, password, full_name });

        try {
            const response = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, full_name }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server response:', errorData);
                
                if (response.status === 409 || errorData.message === 'User already exists') {
                    setErrorMessage('User already exists. Please log in.');
                } else {
                    setErrorMessage('Registration failed. Please try again.');
                }
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);

            login({
                token: data.token,
                user: data.user,
            });

            navigate('/homepage');
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again.');
        }
    }

    return (
        <div className="container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="full_name">Full Name</label>
                <input
                    value={full_name}
                    name="full_name"
                    onChange={(e) => setFullName(e.target.value)}
                    id="full_name"
                    placeholder="Full Name"
                />
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
                <button type="submit">Register</button>
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>
                Already have an account? Login here.
            </button>
        </div>
    );
}
