import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './home';
import EmployeeRoute from './auth/EmployeeRoute';
import POS from './pages/POS';
import EmployeeLogin from './auth/EmployeeLogin';
import LicenseProtection from './auth/LicenseProtection';
import PrinterTest from './pages/PrinterTest';
import Switcher from './components/Switcher';
import POSSwitcher from './components/POSSwitcher';
import ClientLogin from './auth/ClientLogin';
import ClientSwitcher from './components/ClientSwitcher';
import ClientRoute from './auth/ClientRoute';
import Dashboard from './pages/Dashboard';
import MobileDashboard from './pages/MobileDashboard';
import Products from './components/desktop/products/Products';
import AddProduct from './components/desktop/products/AddProduct';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'pos/',
        element: <EmployeeRoute />,
        children: [
          {
            path: '',
            element: <POSSwitcher />,
          },
        ],
      },
      {
        path: 'employee-login/',
        element: <LicenseProtection />,
        children: [
          {
            path: '',
            element: <EmployeeLogin />,
          },
        ],
      },
    ],
  },
  {
    path: 'login/',
    element: <ClientLogin />,
    
  },


  {
    path: 'pm-panel/',
    element: <ClientRoute/>,
    children:[
      {
        path: '',
        element: <ClientSwitcher />,
        children:[
          {
            path: 'desktop/',
            element: <Dashboard/>,
            children:[
              {
                path:'dashboard/'
              },
              {
                path:'products/',
                element: <Products/>
              },
              {
                path:'products/new-product/',
                element: <AddProduct/>
              },
            ]
          },
          {
            path: 'mobile/',
            element: <MobileDashboard/>
          }
        ]
}
]

  },
  {
    path: 'home/',
    element: <Home />,
  },
  {
    path: 'print/',
    element: <PrinterTest />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
