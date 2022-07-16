import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddMovieHeader.css";

function AddMovieHeader() {

    const navigate = useNavigate();

    function returnToDashboard() {
        navigate("/dashboard")
    }

    return (
        <nav className="navbar homepage-navbar">
            <span className="navbar-brand mb-0 h1"><h2>Add Movies to Collection</h2></span>
            <div className="form-inline">
                <button className="btn btn-outline-info btn-lg lr-btns" onClick={returnToDashboard}>Return to Dashboard</button>
            </div>
        </nav>
    )
}

export default AddMovieHeader;