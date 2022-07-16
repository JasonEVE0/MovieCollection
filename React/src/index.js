import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import './App.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
            <Routes>
                <Route path="/*" element={<App />} /> 
            </Routes>
    </BrowserRouter>
);
