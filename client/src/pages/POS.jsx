import React, { useState, useEffect } from 'react';
import Products from '../components/Products';
import Categories from '../components/Categories';
import NavBar from '../components/NavBar';
import Orders from '../components/Orders';
import beep from '../assets/store-beep.mp3'


const POS = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const [sound, setSound] = useState(0);
  useEffect(()=>{
    if(sound !== 0) makeBeep()
  }, [sound])
  const makeBeep = ()=>{
    new Audio(beep).play();
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      console.log(
        'Viewport width:',
        window.innerWidth,
        'Viewport height:',
        window.innerHeight
      );
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = () => {
    setSound(sound+1)
    console.log('beep !');
  };
  return (
    <div className="flex flex-col h-screen">
      <NavBar/>
      <div className="flex flex-row-reverse flex-1">
        <div className="w-[400px] flex flex-col bg-gray-200">
          <div className="test flex-1 ">
            <div
              style={{ maxWidth: `calc(${windowWidth}px - 49px)` }}
              className={
                'overflow-y-auto p-2 pt-0 h-full w-full overflow-y-scroll'
              }
            >

              <Orders n={40} />
            </div>
          </div>
          <div className="test h-[180px]">
            <div className="grid">
              <div
                onClick={handleClick}
                className="col-span-3 text-center p-3 bg-green-400 text-white"
              >
                payer
              </div>
              <div>Config 1</div>
              <div>Config 2</div>
              <div>Config 3</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full bg-white">
          <div
            style={{ maxHeight: `calc(${windowHeight}px - 249px)` }}
            className={'overflow-auto p-2 pt-0'}
          >
            <Products n={99} />
          </div>
          <div className="h-[199px] bg-gray-300 test ">
            <div
              style={{ maxWidth: `calc(${windowWidth}px - 49px)` }}
              className={
                'overflow-x-auto p-2 pt-0 h-full w-full overflow-x-scroll'
              }
            >
              <Categories n={99} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default POS;
