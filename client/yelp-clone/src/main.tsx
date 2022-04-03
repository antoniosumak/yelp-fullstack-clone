import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './core/App';
import { BrowserRouter as Router } from 'react-router-dom';
import ApiService from './core/Axios/ApiService';

const renderApp = () => {
  ApiService.init('http://localhost:3005');
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

renderApp();
