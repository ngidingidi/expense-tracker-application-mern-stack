import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/register', {name, email, password})
        .then(result => {
            console.log(result)
            if (result.status === 201) {
                alert("User registered successfully");
                navigate('/login')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <> <div>
            <h1>Expense Tracker App</h1>
            <p>Track your spending habits to stay on budget</p>
           </div>
            <div className="">
                <h2 className="reg-h2">Register</h2>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                            <label htmlFor="email">
                                <strong>Name</strong>
                            </label>
                        <div>
                            <input
                                type="text"
                                placeholder="Enter name"
                                autoComplete="off"
                                name="name"
                                className=""
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
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
                        Register
                    </button>
                    </fieldset>
                </form>
                <div>
                    <p className="p-login">Already Have an Account</p>
                        <Link to="/login" className="btn btn-default">
                            <button className="btn-login">Login</button>
                        </Link>
                </div>
            </div>
            </>
    )
}

export default Signup