import axios from "axios"
import { useNavigate } from "react-router-dom";
import "../styles/Register.css"

function Register(props) {

    const navigate = useNavigate();

    let createAccountAPI = async (e) => {
        e.preventDefault();

        // passwords match check
        if (e.target.password.value != e.target.confirmPassword.value) {
            alert("Passwords don't match");
            return;
        }
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

        let res = await axios.post("/api/register/", {
            username: e.target.email.value,
            password: e.target.password.value
        }).then((res) => {
            if (res.status === 200) {
                localStorage.setItem("token", res.data.token)
                props.login()
                navigate("/dashboard")
            }
        }).catch((err) => {
            if (err.response.status === 0) {
                alert("Sorry, the server is currently down for maintenance")
                return;
            }
            alert(err.response.data.detail)
        });
    }

    return (
        <div className="registerPage">
            <form className="signUpForm" onSubmit={createAccountAPI}>
                <h2>Sign up</h2>
                <table>
                    <tbody>
                        <tr>
                            <td><input type="text" name="email" placeholder="Email" /></td>
                        </tr>
                        <tr>
                            <td><input type="password" name="password" placeholder="Password" /></td>
                        </tr>
                        <tr>
                            <td><input type="password" name="confirmPassword" placeholder="Confirm password" /></td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" className="registerButton" />
            </form>
        </div>
    )
}

export default Register;