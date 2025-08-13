import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import Navigation from "./components/Navigation";

function Help() {

    return (
        <> 
        <div className="help-container">
            <Navigation />
            <div className="help-content">
                <h2>Instructions</h2>
                <ol className="help-list">
                <li>To add or create an expense, click on <strong>Add</strong> in the
                    navigation menu and enter expense details.
                </li>
                <li>
                    To edit an expense, click on <strong>Home</strong> and then the ✏️
                    Edit icon.
                </li>
                <li>
                    To delete an expense, click on <strong>Home</strong> and then the 🗑️
                    Delete icon.
                </li>
                <li>
                    For help, email us at <a href="mailto:expensetracker@gmail.com">expensetracker@gmail.com</a> or call <a href="tel:7142059878">714-205-9878</a>.
                </li>
                </ol>
            </div>
        </div>
        </>
    )
}

export default Help