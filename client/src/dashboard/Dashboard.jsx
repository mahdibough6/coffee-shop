import React, {useState, useEffect} from "react";
import { FaBars, FaHome, FaCog } from 'react-icons/fa';

import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
  } from "@material-tailwind/react";

const Dashboard = () => {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavVisible(!isMobileNavVisible);
  };
const [openNav, setOpenNav] = useState(false);
 
useEffect(() => {
  window.addEventListener(
    "resize",
    () => window.innerWidth >= 960 && setOpenNav(false)
  );
}, []);

const navList = (
  <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-normal"
    >
      <a href="#" className="flex items-center">
        Pages
      </a>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-normal"
    >
      <a href="#" className="flex items-center">
        Account
      </a>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-normal"
    >
      <a href="#" className="flex items-center">
        Blocks
      </a>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-normal"
    >
      <a href="#" className="flex items-center">
        Docs
      </a>
    </Typography>
  </ul>
);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-700 p-4 flex items-center justify-between lg:justify-end">
        <button
          className="text-white lg:hidden"
          onClick={toggleMobileNav}
        >
          <FaBars />
        </button>
        {/* Add header content here */}
      </header>
      <div className="flex">
        <aside
          className={`bg-gray-800 w-64 p-4 absolute inset-y-0 left-0 transform transition-transform duration-300 ease-in-out ${
            isMobileNavVisible ? 'translate-x-0' : '-translate-x-full'
          } lg:relative lg:translate-x-0`}
        >
        <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
        >
          <span>Material Tailwind</span>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <Button variant="gradient" size="sm" className="hidden lg:inline-block">
          <span>Buy Now</span>
        </Button>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Buy Now</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar> 
        </aside>
        <main className="flex-1 p-8">
          {/* Add your main content here */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;


