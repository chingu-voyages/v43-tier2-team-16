import React from 'react';
import ReactDOM from 'react-dom/client';
import './static/css/bootstrap.min.css';
import './static/css/helpers.css';
import './static/css/main.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <AuthContextProvider>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </AuthContextProvider>
);
