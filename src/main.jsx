import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Home from './pages/Home';
import App from './pages/App';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/fastodo/",
    element: <Home />
  },
  {
    path: "/fastodo/app",
    element: <App />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
