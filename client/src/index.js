import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "jquery/dist/jquery";
import "popper.js/dist/popper";
import "bootstrap/dist/js/bootstrap";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
<BrowserRouter>
<App />
</BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
