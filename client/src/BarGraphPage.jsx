import React from "react";
import { useState, useEffect} from "react";
import Navigation from "./components/Navigation";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarGraph() {

    const [expenses, setExpenses] = useState([]);
    // get email address of logged user
    const userEmail = localStorage.getItem("emailAddress");
    
    const loadExpenses = async () => {
            //const response = await axios.get(`http://localhost:5000/expenses/${userEmail}`);
            const response = await axios.get(`https://expense-tracker-application-visualizer.onrender.com/expenses/${userEmail}`);
            setExpenses(response.data);
            }
    
    useEffect(() => {
    
            if (!userEmail) {
                navigate('/home');
            } else {
                loadExpenses();
            }
            }, []);

    if (!Array.isArray(expenses) || expenses.length === 0) {
        return (
            <>
            <Navigation />
            <div style={{ padding: '2rem' }}>
                <h2>No expenses found</h2>
                <p>Please navigate to Home Page and try again</p>
            </div>
            </>
        );
    }

    // 1. Group data: { [month]: { [category]: totalAmount } }
    const monthlyCategoryTotals = {};

    expenses.forEach(expense => {
        const monthNum = expense.date.split('-')[0];
        const category = expense.category;
        const amount = expense.amount;

        const month = getMonthName(monthNum);

        // Sum expenses by month and category

        if (!monthlyCategoryTotals[month]) {
            monthlyCategoryTotals[month] = {};
        }

        if (!monthlyCategoryTotals[month][category]) {
            monthlyCategoryTotals[month][category] = 0;
        }

        monthlyCategoryTotals[month][category] += amount;
    });

    // 2. Sort the months in chronological order
    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const months = Object.keys(monthlyCategoryTotals).sort(
        (a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b)
    );

    const allCategories = Array.from(
        new Set(expenses.map(e => e.category))
    );
    //console.log(allCategories);

    // 3. Build datasets 
    const datasets = allCategories.map((category, idx) => ({
        label: category,
        data: months.map(month => monthlyCategoryTotals[month][category] || 0),
        backgroundColor: getColor(idx),
    }));

     const data = {
        labels: months,
        datasets,
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Expenses by Category',
            },
        },
    };

    // Convert 2 digit month to Jan/Feb
function getMonthName(monthNum) {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const index = parseInt(monthNum, 10) - 1;
    return months[index] || 'Unknown';
}

function getColor(index) {
    const colors = [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(100, 181, 246, 0.6)',
        'rgba(255, 138, 101, 0.6)',
        'rgba(156, 204, 101, 0.6)',
    ];

    return colors[index % colors.length];
}

    return (
        <>
        <Navigation />
        <div style={{ width: '80%', margin: '0 auto', paddingTop: '2rem' }}>
            <h2>Bar Graph</h2>
            <Bar data={data} options={options} />
        </div>
        </>
    );
}

export default BarGraph;
