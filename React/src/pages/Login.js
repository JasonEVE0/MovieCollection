import React from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../styles/Login.css"

function Login(props) {

    const navigate = useNavigate();

    let accountLogin = async (e) => {
        e.preventDefault();

        // empty email check
        if (e.target.email.value === "") {
            alert("username can't be empty");
            return;
        }
        // empty password check
        if (e.target.password.value === "") {
            alert("password can't be empty");
            return;
        }

        let res = await axios.post("/api/login/", {
            username: e.target.email.value,
            password: e.target.password.value
        }).then((res) => {
            if (res.status === 200) {
                localStorage.setItem("token", res.data.token)
                props.login()
                navigate("/dashboard")
            }
        }).catch((err) => {
            if (err.response.status === 400) {
                alert("No account was found with those credentials")
            } else if (err.response.status === 0) {
                alert("Sorry, the server is currently down for maintenance")
            }
        });
    }

    return (
        <div className="loginPage">
            <form className="loginForm" onSubmit={accountLogin}>
                <h2>Login</h2>
                <table>
                    <tbody>
                        <tr>
                            <td><input type="text" name="email" placeholder="Email" /></td>
                        </tr>
                        <tr>
                            <td><input type="password" name="password" placeholder="Password" /></td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" className="loginButton" />
            </form>
        </div>
    )
}

export default Login;