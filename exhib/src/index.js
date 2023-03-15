import React from 'react';
import ReactDOM from 'react-dom/client';
import './static/css/main.css';
import App from './App';
import Nav from './layout/Nav'
import Footer from './layout/Footer'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Nav/>
    <App />
    <Footer/>
  </React.StrictMode>
);
