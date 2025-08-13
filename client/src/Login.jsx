import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/login', {email, password})
        .then(result => {
            console.log(result)
            if (result.statusText === "OK" && result.data !== "No record exists"
                && result.data !== "The password is not correct") {
                // Store a token or flag when login is successful. Persists when user refreshes page
                localStorage.setItem("isLoggedIn", "true");

                // Also store user name and email address
                localStorage.setItem("emailAddress", email);
                localStorage.setItem("name", result.data.name);
                navigate('/home')
            }
            if (result.data === "The password is not correct") {
                alert("The password is not correct. Try again");
            }
             if (result.data === "No record exists") {
                alert("No record exists. Register first");
            }
            
        })
        .catch(err => console.log(err))
    }

    return (
        <> <div>
            <h1>Expense Tracker App</h1>
            <p>Track your spending habits to stay on budget</p>
        </div>
            <div>
                <h2 className="log-h2">Login</h2>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                            <label htmlFor="email">
                                <strong>Email</strong>
                            </label>
                        <div>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                autoComplete="off"
                                name="email"
                                className=""
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                            <label htmlFor="email">
                                <strong>Password</strong>
                            </label>
                        <div>
                            <input
                                type="password"
                                placeholder="Enter password"
                                autoComplete="off"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                    </div><br />

                    <button type="submit" className="btn btn-success rounded-0">
                        Login
                    </button>
                    </fieldset>
                </form>
                <div>
                    <p className="p-register">Do Not Have an Account Yet</p>
                    <Link to="/register" className="btn btn-default">
                            <button className="btn-login">Sign Up</button>
                    </Link>
                </div>
            </div>
            </>
    )
}


export default Login;