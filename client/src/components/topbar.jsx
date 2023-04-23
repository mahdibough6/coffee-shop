import { useState } from "react";
import menu from '../assets/menu.png'
import arrow from '../assets/arrow.png'
import { Navigate, useNavigate } from "react-router-dom";
import logo from '../assets/pub-maroc.ico'
const TopBar = ()=>{
    const [isActive, setIsActive] = useState(false);
    function handleClick() {
      setIsActive(false)
        window.history.go(-1);
      }
    const handleSideBar = ()=>{
        setIsActive(!isActive)
    }
    return(
        <>
        <div className="relative  bg-blue-gray-900 w-[100%] flex justify-between p-2 text-white z-10">
           <div className="hover:bg-blue-gray-600 p-1 rounded flex align-middle"  onClick={handleClick} ><img width={'35px'}  src={arrow} alt=""  /></div> 
           <div><img src={logo} width={'40px'} /></div> 
           <div className="hover:bg-blue-gray-600 p-1 rounded flex align-middle" onClick={handleSideBar}><img width={'35px'} src={menu} alt=""  /></div> 
        </div>
        { isActive && <SideBar/>  }
        </>
    );
}

export default TopBar;

const SideBar = () => {
  const navigate = useNavigate();
  const handleLogOut = ()=>{
    if(localStorage.getItem('jwtToken')){
      localStorage.removeItem('jwtToken');
      navigate('./login');
    }
  }
    return (
      <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-blue-gray-700 z-0">
        <ul className="flex flex-col justify-center items-center">
          <li className="py-2 hover:bg-gray-800">
            <a href="/" className="text-white">Home</a>
          </li>
          <li className="py-2 hover:bg-gray-800">
            <a href="/parametres" className="text-white">Paramètres</a>
          </li>
          <li className="py-2 hover:bg-gray-800">
            <button onClick={handleLogOut} className="text-white">Se déconnecter</button>
          </li>
        </ul>
      </div>
    );
  };
  
  