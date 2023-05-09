import React from 'react'
import NavBar from '../../common/NavBar'

const PosLayout = ({children})=> {
  return (
    <div className="flex flex-col h-screen">
    <NavBar/>
    {children}
    </div>
  )
}

export default PosLayout