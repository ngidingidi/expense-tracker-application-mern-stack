import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Navigation from "./components/Navigation";

export const UpdateProfilePage = () => {

    const var_location = useLocation();
    const userProfile = var_location.state?.userProfile;
    const email = localStorage.getItem("emailAddress");
    const [name, setName] = useState(userProfile.name);
    const genderOptions = ["Select gender", "Male", "Female", "Other"];
    const [gender, setGender] = useState(userProfile.gender);
    const [location, setLocation] = useState(userProfile.location);
    const [state, setState] = useState(userProfile.state);
    const [zipcode, setZipCode] = useState(userProfile.zipcode);
    const [occupation, setOccupation] = useState(userProfile.occupation);

    const navigate = useNavigate();

    //console.log('UserProfile object:', userProfile);

    const addUserProfile = (e) => {
        e.preventDefault();
       
        axios.post('http://localhost:3005/create-user-profile', {email, name, gender, location, state, zipcode, occupation})
        .then(result => {
            console.log(result)
            if (result.status === 201) {
                alert('success')
                //navigate('/home')
            }
            
        })
        .catch(err => {
            console.log(err);
            alert(`There was an error. Check request details or try the Update button. ${err.message}`);
        })
    };

    const updateUserProfile = (e) => {
        e.preventDefault();
       
        axios.put('http://localhost:3005/edit-user-profile', {email, name, gender, location, state, zipcode, occupation})
        .then(result => {
            console.log(result)
            if (result.status === 200) {
                alert('Profile successfully updated');
                navigate('/profile');
            }
            
        })
        .catch(err => {
            console.log(err);
            alert(`There was an error. ${err.message}`);
        })
    };
    
    return (
        <div>
            <br />
            <br />
            <Navigation />
            <br />
            <h1 className="action-desc">Update User Profile</h1>
            <p>Fill the fields below for user profile information</p>
            <form className="form-add">
                <fieldset>
                    <legend>Fill in Details</legend>
                    <label>   </label>
                    <input
                        type="text"
                        value={email}
                        placeholder="Enter email here"
                        onChange={e => setEmail(e.target.value)} 
                        required/>
                    <label>   </label>
                    <input
                        type="text"
                        placeholder="Enter name here"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        />
                    <label>   </label>
                    <input
                        type="text"
                        value={location}
                        placeholder="Enter location here"
                        onChange={e => setLocation(e.target.value)} 
                        />
                    <label>   </label>
                    <input
                        type="text"
                        value={state}
                        placeholder="Enter state here"
                        onChange={e => setState(e.target.value)} 
                        />
                    <label>   </label>
                    <input
                        type="number"
                        placeholder="Enter zipcode here"
                        value={zipcode}
                        onChange={e => setZipCode(e.target.valueAsNumber)} 
                        />
                    <label>   </label>
                    <input
                        type="text"
                        value={occupation}
                        placeholder="Enter occupation here"
                        onChange={e => setOccupation(e.target.value)} 
                        />
                    <label>  </label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        >
                        {genderOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </fieldset>
                <br />
                <button onClick={addUserProfile} className="btn-add"
                >Add</button>
                <br /><br />
                <button onClick={updateUserProfile} className="btn-add"
                >Update</button>
            </form>
            
        </div>
    );
}

export default UpdateProfilePage;