import React from 'react'
import ClientRoute from '@components/common/ClientRoute';
import Products from '@components/adminDashboard/desktop/products/Products';
import AddProduct from '@components/adminDashboard/desktop/products/AddProduct';
import Categories from '@components/adminDashboard/desktop/categories/Categories';
import AddCategory from '@components/adminDashboard/desktop/categories/AddCategory';
import AddEmployee from '@components/adminDashboard/desktop/employees/AddEmployee';
import Employees from '@components/adminDashboard/desktop/employees/Employees';
import Dashboard from '@components/adminDashboard/desktop/Dashboard';
import { Routes, Route } from 'react-router-dom';
import Statistics from '@components/adminDashboard/desktop/Statistics';
import Recipe from '@components/adminDashboard/desktop/Recipes';

function DashboardRoutes() {
  return (
    <Routes>
      <Route path={'dashboard/*'} element={<ClientRoute/>} >
        <Route element={<Dashboard/>} >
        <Route index  path='' element={<Statistics/>}/>
        <Route path={'products'} element={<Products/>}/>
        <Route path={'products/new-product'} element={<AddProduct/>}/>
        <Route path={'categories'} element={<Categories/>}/>
        <Route path={'accounts'} element={<Employees/>}/>
        <Route path={'categories/new-category'} element={<AddCategory/>}/>
        <Route path={'accounts/new-account'} element={<AddEmployee/>}/>
        <Route path={'recipes'} element={<Recipe/>}/>
        <Route path={'recipes/:recipeId'} element={<Recipe/>}/>
        <Route path={'orders/:orderId'} element={<Recipe/>}/>
</Route>
      </Route>
    </Routes>
  )
}

export default DashboardRoutes