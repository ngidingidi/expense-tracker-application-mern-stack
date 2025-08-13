import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "./components/Navigation";

export const EditExpensePage = ({expenseToEdit}) => {

    // want to initialize these to the expense to edit properties instead of empty strings
    const originalDate = expenseToEdit.date;
    const originalName = expenseToEdit.name;
    const originalAmount = expenseToEdit.amount;
    const originalZipCode = expenseToEdit.zipCode;
    const originalCategory = expenseToEdit.category;
    //console.log(originalZipCode)
    const userEmail = localStorage.getItem("emailAddress");
    const navigate = useNavigate();

    const [date, setDate] = useState(originalDate);
    const [name, setName] = useState(originalName);
    const [amount, setAmount] = useState(originalAmount);
    const [zipCode, setZipCode] = useState(originalZipCode);
    const categoryOptions = ["Select category", "Grocery", "Entertainment", "Alcohol", "Other"];
    const [category, setCategory] = useState(originalCategory);

    const editExpense = async (e) => {
        e.preventDefault();
        //console.log(name);
        
        axios.put(`http://localhost:3000/expenses/${expenseToEdit._id}`, {date, name, amount, zipCode, 
                                                                         category, userEmail})
        .then(result => {
            console.log(result)
            if (result.status === 200) {
                alert(`Successfully edited the expense with id = ${expenseToEdit._id}`);
                navigate('/home')
            }
            
        })
        .catch(err => console.log(err)) 
    }

    return (
        <div>
            <br />
            <br />
            <Navigation />
            <br />
            <h1 className="action-desc">Edit Expense</h1>
            <form className="form-add">
                <fieldset>
                    <legend>Fill in Details</legend>
                    <label>   </label>
                    <input
                        type="text"
                        value={date}
                        onChange={e => setDate(e.target.value)} 
                        required/>
                    <label>   </label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required />
                    <label>   </label>
                    <input
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.valueAsNumber)} 
                        required/>
                    <label>   </label>
                    <input
                        type="number"
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
                onClick={editExpense}
                >Save</button>
            </form>
        </div>
    );
}

export default EditExpensePage;