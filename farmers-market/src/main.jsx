import React from 'react';
import ReactDOM from 'react-dom/client';  // For React 18+
import App from './App';  // Import your App component
import './index.css';  // Your CSS file

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);  // For React 18+
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
