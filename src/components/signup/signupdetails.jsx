import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./signup.css";
import boyImage from "../../assets/girl2.png";
import axios from 'axios';

function Signupdetails() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const location = useLocation();
    const navigate = useNavigate();


    const { email, password } = location.state || {};

    useEffect(() => {
        if (email === undefined || password === undefined) {
            navigate("/signup");
        };
    }, [email, navigate, password]);

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }
    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    }
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');
        try {
            const registrationData = {
                firstName: firstName,
                lastName: lastName,
                username: userName,
                email: email,
                password: password,
                isAdmin: false,
                penName: '',
                isAuthor: false
            };
            const response = await axios.post('https://cheerful-raindrop-d0fd07.netlify.app/.netlify/functions/api/register', registrationData);
            if (response.status !== 201) {
                throw new Error(response.data.message);
            }

            setErrorMessage(response.data.message);
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message || 'Error registering user. Please try again later.');
            } else {
                setErrorMessage('Failed to connect to server')
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signupDetails-container">
            <img src={boyImage} alt="Boy" className="girl-image" />

            <p className="heading-girl"> One Last Step <br /> for your breakthrough!</p>
            <div className="signupDetailsCard">
                <h1 style={{ padding: 0, margin: 0 }}>Additional Details</h1>
                <p>Enter your details below</p>


                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="userName">Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            id="userName"
                            value={userName}
                            onChange={handleUserNameChange}
                            required
                            className="userName-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            placeholder="First Name"
                            id="firstName"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            required
                            className="firstName-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            placeholder="Last Name"
                            id="lastName"
                            value={lastName}
                            onChange={handleLastNameChange}
                            required
                            className="lastName-input"
                        />
                    </div>
                    {errorMessage && <p className="ErrorMessage">{errorMessage}</p>}
                    <button type="submit" className="signup-button" disabled={loading}>
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signupdetails;