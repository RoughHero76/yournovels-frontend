import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import boyImage from "../../assets/boy2.png";
import starImage from "../../assets/star.png";

function SignUp() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessgae, setErrorMessage] = useState('');
    const [starPositions, setStarPositions] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const positions = Array.from({ length: 15 }, () => ({
            x: Math.random() * 80,
            y: Math.random() * 80
        }));

        setStarPositions(positions);
    }, []);


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const handleSubmit = (event) => {

        event.preventDefault();

        if (!validateEmail(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 character long.");
            return;
        }

        navigate("/signupdetails", { state: { email, password } });
    }

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };
    return (
        <div className="signup-container">
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
            <div className="signupCard">
                <h1 style={{ padding: 0, margin: 0 }}>Sign Up Now!</h1>
                <p>Enter your details below</p>
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
                            placeholder="password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            className="password-input"
                        />
                    </div>

                    {errorMessgae && <p className="ErrorMessage">{errorMessgae}</p>}

                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
                <p>Alreayd have an account? <Link to="/">Sign in</Link></p>
            </div>
        </div>
    );
}

export default SignUp;
