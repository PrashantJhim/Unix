import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes ,Route } from 'react-router-dom';
import './index.css';
import Signup from './signup'
import Login from './login'
import Menu from "./Menu"
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Signup/>}></Route>
      <Route path = "/Login" element = {<Login/>}></Route>
      <Route path = "/Menu" element = {<Menu/>}></Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
