import React from "react";
import Navigation from "./components/Navigation";
import ExpenseTable from "./components/ExpenseTable";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Home({setExpenseToEdit}) {

    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("emailAddress");

    const loadExpenses = async () => {
        //const response = await axios.get(`http://localhost:3000/expenses/${userEmail}`);
        const response = await axios.get(`https://expense-tracker-application-mern-stack-axas.onrender.com/expenses/${userEmail}`);
        //console.log(response.data, typeof response.data)
        //const expenses = await response.json();
        setExpenses(response.data);
        }
    
    // get called once during page load
    // Check for isLoggedIn in localStorage during useEffect. If not logged in, redirect to the login page
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        if (!isLoggedIn) {
            navigate('/login');
        } else {
            loadExpenses();
        }
        }, []);

        //console.table(expenses)

        const onDelete = async (_id) => {
            
            //const response = await axios.delete(`http://localhost:3000/expenses/${_id}`);
            const response = await axios.delete(`https://expense-tracker-application-mern-stack-axas.onrender.com/expenses/${_id}`);
            //console.log(response);
            if (response.status === 204) {
                                    alert(`Successfully deleted the expense with id = ${_id}`);

                                    // When expense gets deleted want to update expenses array to only have expenses that have not been deleted
                                    setExpenses(expenses.filter(expense => expense._id !== _id));
                                } else {
                                    alert(`Failed to delete expense with id = ${_id}, status code = ${response.status}`);
                                }
                        }

        const onEdit = (expense) => {
                //console.log("OnEdit called with " + expense.name);
                setExpenseToEdit(expense);

                navigate("/edit-expense");
            }

        return (
        <>   {/* Pass expenses to Navigation but will not do for microservice purposes.*/}
            <Navigation />
            <h2>Home</h2>
            <p>Table Showing Name, Date, Amount, Category, and ZipCode of Expenses</p>
            <p>Click <span style={{ color: 'blue', fontWeight: 'bold' }}>Edit/Delete</span> Icon to Edit or Delete Expense</p>
            <Link to="/convert-currency" >
                            <button className="curr-conv">Explore Another Currency</button>
            </Link>
            
                <div>
                    <ExpenseTable expenses={expenses} onDelete={onDelete} onEdit={onEdit} />
                </div>
        </>
    )
}

export default Home;