import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import Home from '@components/landingPage/Home';
import PosRoutes from '@routes/pos/PosRoutes';
import DashboardRoutes from '@routes/dashboard/DashboardRoutes';
import ClientLogin from '@components/common/ClientLogin';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />}/>
      <Route path="pos/*" element={<PosRoutes />} />
      <Route path="pm-panel/*" element={<DashboardRoutes />} />
      <Route path="pm-panel/login/" element={<ClientLogin />} />
    </Route>
  )
);
/*
const router1 = createBrowserRouter([
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
    element: <ClientRoute />,
    children: [
      {
        path: '',
        element: <ClientSwitcher />,
        children: [
          {
            path: 'desktop/',
            element: <Dashboard />,
            children: [
              {
                path: 'dashboard/',
              },
              {
                path: 'products/',
                element: <Products />,
              },
              {
                path: 'products/new-product/',
                element: <AddProduct />,
              },
              {
                path: 'categories/',
                element: <Categories />,
              },
              {
                path: 'categories/new-category/',
                element: <AddCategory />,
              },
              /*
              {
                path:'kitchens/',
                element: <Kitchens/>
              },
              {
                path:'Kitchen/new-kitchen/',
                element: <AddKitchen/>
              },
              {
                path:'Accounts/',
                element: <Accounts/>
              },
              {
                path:'Accounts/new-account/',
                element: <AddAccount/>
              },
              {
                path:'Recipes/',
                element: <Recipes/>
              },
            ],
          },
          {
            path: 'mobile/',
            element: <MobileDashboard />,
          },
        ],
      },
    ],
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
*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
