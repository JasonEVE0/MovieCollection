import React from "react";
import { useNavigate } from "react-router-dom"
import "../styles/Header.css"

function Header(props) {

    const navigate = useNavigate();

    function navigateToAddMovie() {
        navigate("/addmovie")
    }

    return (
        <nav className="navbar homepage-navbar">
            <span className="navbar-brand mb-0 h1"><h2>My Movie Collection</h2></span>
            <div className="form-inline">
                <button className="btn btn-outline-info btn-lg lr-btns" onClick={navigateToAddMovie}>Add new movie</button>
                <button className="btn btn-outline-info btn-lg lr-btns" onClick={props.logout}>Logout</button>
            </div>
        </nav>
    )
}

export default Header;