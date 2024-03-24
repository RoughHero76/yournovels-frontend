import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import starImage from "../../assets/star.png";
import boyImage from "../../assets/boy.png";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [starPositions, setStarPositions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const positions = Array.from({ length: 15 }, () => ({
            x: Math.random() * 80,
            y: Math.random() * 80
        }));
        setStarPositions(positions);

    }, []);


    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        } 
    })
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const loginData = {
                email: email,
                password: password
            };

            const response = await axios.post('https://cheerful-raindrop-d0fd07.netlify.app/.netlify/functions/api/login', loginData);

            if (response.status !== 200) {
                throw new Error(response.data.message)
            }

            setErrorMessage(response.data.message);

            if (response.status === 200) {
                const data = response.data;
                if (rememberMe) {
                    localStorage.setItem('token', data.token);
                } else {
                    sessionStorage.setItem('token', data.token);
                }
                navigate('/dashboard');
            }
        } catch (error) {
            /* console.error('Error: ', error); */
            if (error.response) {
                setErrorMessage(error.response.data.message || 'Something went wrong, please try again later.');
            } else {
                setErrorMessage('Failed to connect to the server.');
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="login-container">
            {starPositions.map((pos, index) => (
                <img
                    key={index}
                    src={starImage}
                    alt="Star"
                    className="star-image"
                    style={{ top: `${pos.y}%`, left: `${pos.x}%` }}
                />
            ))}

            <img src={boyImage} alt="Boy" className="boy-image" />

            <p className="heading"> Elevate your storytelling <br /> journey: publish, connect, and  <br /> pitch for the big screen.</p>
            <div className="loginCard">
                <h1 style={{ padding: 0, margin: 0 }}>Welcome back!</h1>
                <p>Enter your email and password to sign in</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" style={{ padding: 5 }}>Email</label>
                        <input
                            type="text"
                            placeholder="Email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            className="email-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            className="password-input"
                        />
                    </div>
                    <div className="form-group checkbox-group">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                        />
                        <label htmlFor="rememberMe">Remember Me</label>
                    </div>

                    {errorMessage && <p className="ErrorMessage">{errorMessage}</p>}

                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Please wait...' : 'Login'}
                    </button>
                </form>
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
        </div>
    );
}

export default Login;
