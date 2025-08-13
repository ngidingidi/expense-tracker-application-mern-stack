import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BarGraph from "../BarGraphPage";
import LineChartVisual from "../LineChartPage";

function Navigation() {
    const navigate = useNavigate();
    const userName = localStorage.getItem("name");

    const handleLogout = () => {
        const confirmLogout = window.confirm("You are about to be logged out. Do you want to continue?");
        
        if (confirmLogout) {
            localStorage.removeItem('isLoggedIn'); // Clear login flag
            localStorage.removeItem('emailAddress'); // Clear user email address
            navigate('/login'); // Redirect to login page
        }
    }

    const handleVisualizeChange = (event) => {
        //console.log(expenses);
        const selected = event.target.value;
        navigate(selected);
    };

    return (
        <nav className="app-nav">
            <Link to="/home">Home</Link>
            <Link to="/add-expense">Add</Link>
            <select onChange={handleVisualizeChange} defaultValue="">
                <option value="" disabled>Visualize</option>
                <option value="/visualize/bar">Bar Graph</option>
                <option value="/visualize/line">Line Chart</option>
            </select>
            <Link to="/weather">Weather</Link>
            <Link to="/profile">User Profile</Link>
            <Link to="/help">Help</Link>
            <button className="log-out" onClick={handleLogout}>Logout, {userName}</button>
        </nav>
    )
}

export default Navigation;