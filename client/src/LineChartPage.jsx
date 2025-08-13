import React from "react";
import { useState, useEffect} from "react";
import Navigation from "./components/Navigation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement,LineElement,BarElement, 
    Title, Tooltip, Legend} from 'chart.js';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, 
    BarElement, Title, Tooltip, Legend);


function LineChartVisual() {
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("emailAddress");

    const loadExpenses = async () => {
        const response = await axios.get(`http://localhost:5000/expenses/${userEmail}`);
        setExpenses(response.data);
    };

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

    // Group data: { [month]: { [category]: totalAmount } }
    const monthlyCategoryTotals = {};

    expenses.forEach(expense => {
        const monthNum = expense.date.split('-')[0];
        const category = expense.category;
        const amount = expense.amount;

        const month = getMonthName(monthNum);

        if (!monthlyCategoryTotals[month]) {
            monthlyCategoryTotals[month] = {};
        }

        if (!monthlyCategoryTotals[month][category]) {
            monthlyCategoryTotals[month][category] = 0;
        }

        monthlyCategoryTotals[month][category] += amount;
    });

    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const months = Object.keys(monthlyCategoryTotals).sort(
        (a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b)
    );

    const allCategories = Array.from(new Set(expenses.map(e => e.category)));

    const datasets = allCategories.map((category, idx) => ({
        label: category,
        data: months.map(month => monthlyCategoryTotals[month][category] || 0),
        borderColor: getColor(idx),
        backgroundColor: getColor(idx),
        fill: false,
        tension: 0.3, // Optional: smooth curves
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
                text: 'Monthly Expenses by Category (Line Chart)',
            },
        },
    };

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
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(100, 181, 246, 1)',
            'rgba(255, 138, 101, 1)',
            'rgba(156, 204, 101, 1)',
        ];
        return colors[index % colors.length];
    }

    return (
        <>
            <Navigation />
            <div style={{ width: '80%', margin: '0 auto', paddingTop: '2rem' }}>
                <h2>Line Chart</h2>
                <Line data={data} options={options} />
            </div>
        </>
    );
}

export default LineChartVisual;
