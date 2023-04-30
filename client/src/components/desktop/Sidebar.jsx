import React from 'react'
import useClientStore from '../../store/clientStore'

const Sidebar = () =>{
    const {setCurrentTab} = useClientStore();
  return (
    <div>
        <div onClick={()=>setCurrentTab('prodcuts')}>products</div>
        <div onClick={()=>setCurrentTab('users')}>users</div>
        <div onClick={()=>setCurrentTab('categories')}>categories</div>
    </div>
  )
}

export default Sidebar