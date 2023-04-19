import { useState } from 'react'
import Dashboard from './dashboard/Dashboard'
import { Outlet } from "react-router-dom";
import BottomNav from './components/bottomnav'
import TopBar from './components/topbar'

function App() {

  return (
    <div className='flex flex-col h-screen blue-gray-light'>
      <TopBar/>
      <div className='flex flex-1 flex-col flex-1'>
        <Outlet />
      </div>
    </div>
  )
}

export default App
