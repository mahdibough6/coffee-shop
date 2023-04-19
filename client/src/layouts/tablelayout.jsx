import { useState } from 'react'
import { Outlet } from "react-router-dom";
import BottomNav from '../components/bottomnav'

function TableLayout() {

  return (
    <>
      <Outlet />
      <BottomNav/>
    </>
  )
}

export default TableLayout 

