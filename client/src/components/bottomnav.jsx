import { useState } from 'react';
import { IoAppsSharp, IoBagCheck } from 'react-icons/io5';
import {Link } from 'react-router-dom'
import basket from '../assets/basket.png'
import table from '../assets/dinner-table.png'
import cashierMachine from '../assets/cashier-machine.png'

const BottomItems = [
  {
    id:1,
    title: 'tables',
    link: 'home/',
    icon: table,
  },
  {
    id:2,
    title: 'cart',
    link: 'home/',
    icon: basket,
  },
  {
    id:3,
    title: 'caisse',
    link: 'home/',
    icon: cashierMachine,
  },
];

const BottomItem = ({ title, icon, link }) => {
  return (
    <li className="flex flex-col justify-center align-middle hover:bg-blue-gray-500 p-2 rounded-md ">
      <Link href={link}>
        <div className="flex justify-center align-middle"><img width={'40px'} src={icon} alt="" /></div>
        <div className="flex justify-center align-middle">
          <span className='text-white'>{title}</span>
        </div>
      </Link>
    </li>
  );
};

const BottomNav = () => {
  return (
    <div className="w-screen bg-blue-900 p-1 flex justify-between bottom-0  absolute">
      <ul className='flex flex-1 justify-around gap-5'>
        {BottomItems.map((item) => (
          <BottomItem key={item.id} title={item.title} icon={item.icon} link={item.link} />
        ))}
      </ul>
    </div>
  );
};
export default BottomNav;
