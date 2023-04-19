import { useState } from "react";
import menu from '../assets/menu.png'
import arrow from '../assets/arrow.png'

const TopBar = ()=>{
    const [isActive, setIsActive] = useState(false);
    function handleClick() {
        window.history.go(-1);
      }
    const handleSideBar = ()=>{
        setIsActive(!isActive)
    }
    return(
        <>
        <div className="relative  bg-blue-gray-900 w-[100%] flex justify-between p-2 text-white z-10">
           <div className="hover:bg-blue-gray-600 p-1 rounded"  onClick={handleClick} ><img width={'20px'} src={arrow} alt=""  /></div> 
           <div>logo</div> 
           <div className="hover:bg-blue-gray-600 p-1 rounded" onClick={handleSideBar}><img width={'23px'} src={menu} alt=""  /></div> 
        </div>
        { isActive && <SideBar/>  }
        </>
    );
}

export default TopBar;

const SideBar = () => {
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
            <a href="/se-deconnecter" className="text-white">Se déconnecter</a>
          </li>
        </ul>
      </div>
    );
  };
  
  