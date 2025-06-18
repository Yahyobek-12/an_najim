import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import bookss from './assets/images/book.1.jpg'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
