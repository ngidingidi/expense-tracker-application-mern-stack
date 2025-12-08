import React from "react";
import Navigation from "./components/Navigation";
import ExpenseTable from "./components/ExpenseTable";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ConvertedExpenseTable from "./components/ConvertedExpenseTable";

function NewCurrencyHome({setExpenseToEdit}) {

    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("emailAddress");

    const loadExpenses = async () => {
        const response = await axios.get(`https://expense-tracker-application-mern-stack-axas.onrender.com/expenses/${userEmail}`);
        setExpenses(response.data);
        };

    const convertExpenses = async () => {
        try {
                const response = await fetch(
                    `http://localhost:3002/convert`, {
                        method: 'PUT', 
                        headers: {'Content-type': 'application/json'}, 
                        body: JSON.stringify(usdExpenses)
                    }
                );

                if (response.status === 200){
                    //alert("Sucessfully converted amount!");

                } else {
                    alert("Failed to convert, status code = " + response.status);
                }
            } catch (err){
                alert(error.message);
            }
        };


    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        if (!isLoggedIn) {
            navigate('/login');
        } else {
            loadExpenses();
        }
        }, []);
    
    //convertExpenses();

        const onDelete = async (_id) => {
            
            const response = await axios.delete(`https://expense-tracker-application-mern-stack-axas.onrender.com/expenses/${_id}`);
            if (response.status === 204) {
                                    alert(`Successfully deleted the expense with id = ${_id}`);

                                    // When expense gets deleted want to update expenses array to only have expenses that have not been deleted
                                    setExpenses(expenses.filter(expense => expense._id !== _id));
                                } else {
                                    alert(`Failed to delete expense with id = ${_id}, status code = ${response.status}`);
                                }
                        }

        const onEdit = (expense) => {
                setExpenseToEdit(expense);

                navigate("/edit-expense");
            }

    return (
        <>
            <Navigation />
            <h2>Home Component</h2>
                <p>Be very careful on this page. Keep track of the currency you convert to to
                    avoid confusing results
                </p>
                <p>Use at your own discretion</p>
                <div>
                    <ConvertedExpenseTable expenseData={expenses} loadExpenses={loadExpenses}/>
                </div>
        </>
    )
}

export default NewCurrencyHome;