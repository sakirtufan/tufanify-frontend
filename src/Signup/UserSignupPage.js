import React from "react";
import './signup.css';
import Axios from "axios";
import { useState } from "react";
import signup from "../images/bg-signup.png"

export const UserSignupPage = () => {

    const [state, setState] = useState({
        username: "",
        displayName: "",
        password: "",
        passwordRepeat: "",
    });

    const [agreed, setAgreed] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value,
        });
    };

    const { username, displayName, password } = state;

    const signupBody = {
        username,
        displayName,
        password,
    };

    const onClickSignup = (e) => {
        e.preventDefault();
        const signupURL = "/api/1.0/users";
        Axios.post(signupURL, signupBody);
    };

    return (
        <div id="signup" style={{
            backgroundImage: `url(${signup})`, backgroundPosition: 'right',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>
            <section className="signup container d-flex justify-content-center align-items-center">
                <form className="bg-primary text-light">
                    <h1 className="text-center mb-3"> Sign Up </h1>
                    <div className="mb-3">
                        <label className="form-label"> Username </label>
                        <input className="form-control" name="username" value={state.username} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label"> Display Name </label>
                        <input
                            className="form-control"
                            name="displayName"
                            value={state.displayName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label"> Password </label>
                        <input
                            className="form-control"
                            name="password"
                            type="password"
                            value={state.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label"> Password Repeat </label>
                        <input
                            className="form-control"
                            name="passwordRepeat"
                            type="password"
                            value={state.passwordRepeat}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-3 form-check">                       
                        <input
                            className="form-check-input"
                            checked={agreed}
                            onChange={() => setAgreed(!agreed)}
                            type="checkbox"
                        />
                         <label className="form-check-label"> Agreed </label>
                    </div>
                    <button className="btn btn-info w-100 mt-5" onClick={onClickSignup} disabled={!agreed}>
                        Sign up
                    </button>
                </form>
            </section>

        </div>

    );
};
