import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Homepage.css"
import dsposter from "../images/ds-poster.jpg"
import beanposter from "../images/mrbean-poster.jpg"
import angerposter from "../images/anger-poster.jpg"
import flubberposter from "../images/flubber-poster.jpg"

function Homepage() {

    const navigate = useNavigate();

    function login() {
        navigate("/login")
    }

    function register() {
        navigate("/register")
    }

    return (
        <div className="masterContainer">
            <nav className="navbar homepage-navbar">
                <span className="navbar-brand mb-0 h1"><h2>My Movie Collection</h2></span>
                <div className="form-inline">
                    <button className="btn btn-outline-info btn-lg lr-btns" onClick={login}>Login</button>
                    <button className="btn btn-outline-info btn-lg lr-btns" onClick={register}>Register</button>
                </div>
            </nav>

            <div className="container">
                <div className="headingText">
                    <h1 className="text-light">Build a collection of all your favorite movies</h1>
                    <h1 className="text-light">all in one place</h1>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-12"><img className="poster" src={dsposter}></img></div>
                        <div className="col-lg-3 col-md-6 col-sm-12"><img className="poster" src={beanposter}></img></div>
                        <div className="col-lg-3 col-md-6 col-sm-12"><img className="poster" src={angerposter} ></img></div>
                        <div className="col-lg-3 col-md-6 col-sm-12"><img className="poster" src={flubberposter} ></img></div>
                    </div>
                </div>

                <footer>
                    <p>Open source MIT licence<br /><a href="https://github.com/JasonEVE0/MovieCollection" target="_blank">https://github.com/JasonEVE0/MovieCollection</a></p>
                </footer>
            </div>
        </div>
    )
}

export default Homepage;