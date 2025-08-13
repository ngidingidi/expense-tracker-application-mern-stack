import React from "react";
import Navigation from "./components/Navigation";
import ExpenseTable from "./components/ExpenseTable";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function UserProfile() {

        const email = localStorage.getItem("emailAddress");
        const [userProfile, setUserProfile] = useState([]);

        const loadUserProfile = async () => {
        const response = await axios.get(`http://localhost:3005/get-user-profile/${email}`);
        //console.log(response.data)
        setUserProfile(response.data);
        }
    
    useEffect(() => {
        loadUserProfile();
        }, []);
    
    //console.log(userProfile);

        return (
        <> 
            <Navigation />
            <h2>User Profile</h2>
            <p>Click Update Button To Update Profile</p>
            <div className="profile-card">
                <div className="profile-row">
                    <span className="profile-label">Name:</span>
                    <span>{userProfile.name}</span>
                </div>
                <div className="profile-row">
                    <span className="profile-label">Email:</span>
                    <span>{email}</span>
                </div>
                <div className="profile-row">
                    <span className="profile-label">Gender:</span>
                    <span>{userProfile.gender}</span>
                </div>
                <div className="profile-row">
                    <span className="profile-label">Location:</span>
                    <span>{userProfile.location}</span>
                </div>
                <div className="profile-row">
                    <span className="profile-label">State:</span>
                    <span>{userProfile.state}</span>
                </div>
                <div className="profile-row">
                    <span className="profile-label">Zip Code:</span>
                    <span>{userProfile.zipcode}</span>
                </div>
                <div className="profile-row">
                    <span className="profile-label">Occupation:</span>
                    <span>{userProfile.occupation}</span>
                </div>
            </div>
            <div>
                <Link to="/update-profile" state={{userProfile}}> 
                <button className="btn-fetch">Update</button>
                </Link>
            </div>
        </>
    )
}

export default UserProfile;