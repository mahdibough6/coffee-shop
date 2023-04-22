import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import Login from './auth/login';
import Home from './home';
import Tables from './components/tables';
import Card from './pages/card';
import EmployeeRoutes from './utils/employee-routes';
import TableLayout from './layouts/tablelayout';
import ProductCategories from './components/ProductCategories';
import Products from './components/Products';
import Cashier from './components/cashier';


const router = createBrowserRouter([
  {
    path: '/',
    element: <BetaApp />,
    children: [
      {
        path: 'resto/',
        element: <EmployeeRoutes />,
        children: [
          {
            children: [
              {
                path: '',
                element: <Tables />,
              },
              {
                path:'products',
                element: <Products/>
              },
              {
                path: 'tables/',
                element:<TableLayout/>,
                children: [
                  {
                    path: 'card/',
                    element: <Card />,
                  },
                  {
                    path: 'productcategories/',
                    element: <ProductCategories />,
                  },
                ],
              },
            ],
          },
          {
            path: 'cashier/',
            element: <Cashier/>
          },
        ],
      },
    ],
  },

  {
    path: 'login/',
    element: <Login />,
  },
  {
    path: 'home/',
    element: <Home />,
  },
]);

function BetaApp() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
