import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "./components/Navigation";

export const AddExpensePage = () => {

    const [date, setDate] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const categoryOptions = ["Select category", "Grocery", "Entertainment", "Alcohol", "Other"];
    const [amount, setAmount] = useState('');
    const [zipCode, setZipCode] = useState('');
    const userEmail = localStorage.getItem("emailAddress");
    const navigate = useNavigate();

    const addExpense = (e) => {
        e.preventDefault();
       
        axios.post('http://localhost:3000/expenses', {date, name, amount, zipCode, category, userEmail})
        .then(result => {
            console.log(result)
            if (result.status === 201) {
                navigate('/home')
            }
            
        })
        .catch(err => {
            console.log(err);
            alert(`There was an error adding request: ${err.message}`);
        })
    }
    
    return (
        <div>
            <br />
            <br />
            <Navigation />
            <br />
            <h1 className="action-desc">Add Expense</h1>
            <p>Fill date, name of expense, amount in USD, category and zipCode</p>
            <p>Expense dates are limited for the year 2025. Format must be mm-dd-yy</p>
            <form className="form-add">
                <fieldset>
                    <legend>Fill in Details</legend>
                    <label>   </label>
                    <input
                        type="text"
                        value={date}
                        placeholder="09-29-25"
                        onChange={e => setDate(e.target.value)} 
                        required/>
                    <label>   </label>
                    <input
                        type="text"
                        placeholder="Enter expense here"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required />
                    <label>   </label>
                    <input
                        type="number"
                        value={amount}
                        placeholder="Enter amount here"
                        onChange={e => setAmount(e.target.valueAsNumber)} 
                        required/>
                    <label>   </label>
                    <input
                        type="number"
                        placeholder="Enter zipcode here"
                        value={zipCode}
                        onChange={e => setZipCode(e.target.valueAsNumber)} 
                        required/>
                    <label>  </label>
                    <select
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        >
                        {categoryOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </fieldset>
                <br />
                <button className="btn-add"
                onClick={addExpense}
                >Add</button>
            </form>
            
        </div>
    );
}

export default AddExpensePage;