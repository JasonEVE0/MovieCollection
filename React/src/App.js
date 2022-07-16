import React, { useState, useEffect } from "react";
import axios from "axios"
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import AddMovie from "./pages/AddMovie";
import './App.css';
import Missing from "./pages/Missing"
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    const [user, setUser] = useState(false);

    const login = () => setUser(true)

    const logout = () => {
        setUser(false)
        localStorage.removeItem("token")
    }

    async function authenticateToken() {
        // don't make axios request if the user doesn't have a token
        if (!localStorage.getItem("token")) {
            return
        }
        return await axios.post("/api/authenticate/", {
            // body data
        },
            {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                }
            }).then((res) => {
                login()
            }).catch((err) => {
                console.log(err)
            });
    }

    useEffect(() => {
        authenticateToken()
    }, [])

    return (
        <div className="app">
            <Routes>
                {/* public routes */}/
                <Route path="/" element={<Homepage />} />

                <Route element={<ProtectedRoute path="/dashboard" isAllowed={!user} replace={"/"} />}>
                    <Route path="/login" element={<Login login={login} />} />
                    <Route path="/register" element={<Register login={login} />} />
                </Route>

                {/* protected routes */}
                <Route element={<ProtectedRoute path="/" isAllowed={user} replace={null} />}>
                    <Route path="/dashboard" element={<Dashboard logout={logout} />} />
                    <Route path="/addmovie" element={<AddMovie />} />
                </Route>

                {/* catch all */}
                <Route path="*" element={<Missing />} />
            </Routes>
        </div>
    );
}

export default App;
