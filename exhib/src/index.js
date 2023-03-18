import React from 'react';
import ReactDOM from 'react-dom/client';
import './static/css/main.css';
import './static/css/bootstrap.min.css';
import App from './App';
import Nav from './layout/Nav'
import Footer from './layout/Footer'
import { BrowserRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <AuthContextProvider>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </AuthContextProvider>
);
