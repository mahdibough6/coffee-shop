import React, { useState, useEffect, useRef } from 'react';
import {
  Products,
  Categories,
  NavBar,
  Orders,
  PrinterConfig,
} from '@components/common';
import EscPosEncoder from 'esc-pos-encoder';
import qz from 'qz-tray';

import beep from '@assets/store-beep.mp3';
import usePosStore from '@store/posStore';
import { useNavigate } from 'react-router-dom';
import {
  latestOngoingRecipe,
  createOrder,
  createOrderedProduct,
  getKitchenById,
} from '@api/pos';
import { calculateTotalPrice, summarizeProducts } from '@utils/helpers';
import usePosAuthStore from '@store/posAuthStore';
import PosLayout from './PosLayout';
import { message } from 'antd';
import socket from '@api/socket';
import OrderReference from '../../common/OrderReference';
import Wifi from '../../common/Wifi';
import { getValue } from '../../../api/pos/configs';

function Pos() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const {
    currentCategory,
    setCurrentCategory,
    addProduct,
    setOrderedProducts,
    orderedProducts,
    clearOrderedProducts,
    setRecipeId,
    removeProduct,
    defaultPrinter
  } = usePosStore();

  const navigate = useNavigate();

  const { coffeeShopId, employeeId, employeeRole } = usePosAuthStore();

        const [wifiPassword, setWifiPassword] =useState(null);
  const [totalPrice, setTotalPrice] = useState(
    calculateTotalPrice(orderedProducts)
  );
  // emit event when the new order is added
useEffect(()=>{
        const getWifiPassword = async ()=>{
          try {
            const response = await getValue(coffeeShopId, 'wifi')
            setWifiPassword(response[0].value);

          } catch (error) {
            console.log(error)
          }
        }
        getWifiPassword()
}, [])
  useEffect(() => {
    socket.connect(() => {});

    socket.emit('setEmployeeRole', employeeRole);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(orderedProducts));
  }, [orderedProducts]);
  const [sound, setSound] = useState(0);

  const handleOrderSubmit = async (employeeId) => {

    if (orderedProducts.length === 0) {
      message.error('No ordered products found.');
      return;
    }
    try {
      //find or create an ongoing recipe
      console.log('employeeid', employeeId);
      const response = await latestOngoingRecipe(coffeeShopId, employeeId);
      const recipeId = response.data.id;
      setRecipeId(recipeId);


      // Create a new order in the database and retrieve it.
      const order = await createOrder({
        employeeId,
        recipeId,
        totalPrice,
        coffeeShopId,
        isPaid: true,
      });
      const orderId = order.id;

      socket.emit('newOrder');

      // Group the ordered items by kitchen.
      const productsByKitchen = {};
      try {
        for (const {
          id,
          name,
          qte,
          totalPrice,
          kitchenId,
        } of summarizeProducts(orderedProducts)) {
          if (!productsByKitchen[kitchenId]) {
            productsByKitchen[kitchenId] = [];
          }
          productsByKitchen[kitchenId].push({ id, name, qte, totalPrice });
        }
      } catch (error) {
        console.error(
          'An error occurred while processing ordered products: ',
          error
        );
      }

      // Create the ordered items in the database and print them for each kitchen.
      let allItemsCreated = true;
      let printContent = null;
      for (const [kitchenId, products] of Object.entries(productsByKitchen)) {
        const response = await getKitchenById(kitchenId);
        const printerName = response.data.printer;
        printContent = `Kitchen: ${kitchenId}\nPrinter: ${printerName}\n\nItems:\n`;
        for (const { id, name, qte, totalPrice } of products) {
          const success = await createOrderedProduct({
            productId: id,
            qte,
            orderId,
          });
          if (!success) {
            allItemsCreated = false;
            break;
          }
          // Add the ordered item to the print content.
          printContent += ` \x0A ${qte} x ${name}  \x0A `;
        }


        const config = qz.configs.create(printerName);
        const ESC = '\x1B';
        const GS = '\x1D';
        
        // Initialize printer
        const initPrinter = ESC + '@';
        
        // Set text alignment: Left
        const alignLeft = ESC + 'a' + '\x00';
        
        // Set text alignment: Center
        const alignCenter = ESC + 'a' + '\x01';
        
        // Set text alignment: Right
        const alignRight = ESC + 'a' + '\x02';
        
        // Bold text: On
        const boldOn = ESC + 'E' + '\x01';
        
        // Bold text: Off
        const boldOff = ESC + 'E' + '\x00';
        
        // Underline text: On
        const underlineOn = ESC + '-' + '\x01';
        
        // Underline text: Off
        const underlineOff = ESC + '-' + '\x00';
        
        // Cut paper
        const cutPaper = GS + 'V' + '\x41' + '\x03';
        const currentDate = new Date();
        const dateString = currentDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'Africa/Casablanca'
        });
         
        const maxLineWidth = 48;

        let receipt = '';
        receipt += initPrinter;
        
        // Header
        receipt += alignCenter;
        
        // Date
        receipt += dateString + '\n';
        receipt += '------------------------\n';
        
        // Products
        receipt += alignLeft;

          //const productInfo = `${ product.qte } x ${ product.name }`;
         // const priceInfo = `${product.price.toFixed(2)}`;
          //const paddingSize = maxLineWidth - productInfo.length - priceInfo.length;
        
          //const padding = ' '.repeat(paddingSize);
        
          //receipt += productInfo + padding + priceInfo + '\n';
        
        // Total price
    
        receipt += '-'.repeat(maxLineWidth) + '\n';
        receipt += `${printContent }\n`;
        
        // Footer
        receipt += cutPaper;
    
    
    
    
          var data = [
    
            '\x1B' + '\x40',          // init
            '\x1B' + '\x61' + '\x31', // center align
            receipt,
         // '\x1D' + '\x56'  + '\x31' // partial cut (new syntax)
            '\x10' + '\x14' + '\x01' + '\x00' + '\x05',  // Generate Pulse to kick-out cash drawer**
         ];
         
         qz.print(config, data).catch(function(e) { console.error(e); });
      }

      if (allItemsCreated) {
  

        const ESC = '\x1B';
        const GS = '\x1D';
        
        // Initialize printer
        const initPrinter = ESC + '@';
        
        // Set text alignment: Left
        const alignLeft = ESC + 'a' + '\x00';
        
        // Set text alignment: Center
        const alignCenter = ESC + 'a' + '\x01';
        
        // Set text alignment: Right
        const alignRight = ESC + 'a' + '\x02';
        
        // Bold text: On
        const boldOn = ESC + 'E' + '\x01';
        
        // Bold text: Off
        const boldOff = ESC + 'E' + '\x00';
        
        // Underline text: On
        const underlineOn = ESC + '-' + '\x01';
        
        // Underline text: Off
        const underlineOff = ESC + '-' + '\x00';
        
        // Cut paper
        const cutPaper = GS + 'V' + '\x41' + '\x03';
        const currentDate = new Date();
        const dateString = currentDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'Africa/Casablanca'
        });
         
        const products = summarizeProducts(orderedProducts);
        const recipeTotalPrice = calculateTotalPrice(products);
        const maxLineWidth = 48;

        let receipt = '';
        receipt += initPrinter;
        
        // Header
        receipt += alignCenter;
       receipt += boldOn;
        receipt += 'Revnue \n';
        receipt += '------------------------\n';
        receipt += boldOff;
        
        // Date
        receipt += dateString + '\n';
        receipt += '------------------------\n';
        
        // Products
        receipt += alignLeft;
        products.forEach(product => {

          const productInfo = `${ product.qte } x ${ product.name }`;
          const priceInfo = `${product.price.toFixed(2)}`;
          const paddingSize = maxLineWidth - productInfo.length - priceInfo.length;
        
          const padding = ' '.repeat(paddingSize);
        
          receipt += productInfo + padding + priceInfo + '\n';
        });
        
        // Total price
    
        receipt += '-'.repeat(maxLineWidth) + '\n';
        receipt += alignRight;
        receipt += boldOn;
        receipt += `Total: ${recipeTotalPrice.toFixed(2)}\n`;
        receipt += boldOff;
        receipt += alignLeft;
        receipt += `wifi : ${wifiPassword} \n`
        receipt += `Welcome !\n`;

        
        // Footer
        receipt += cutPaper;
    
    
    
    
         var config = qz.configs.create(defaultPrinter); 
          var data = [
    
            '\x1B' + '\x40',          // init
            '\x1B' + '\x61' + '\x31', // center align
            { type: 'raw', format: 'image', data: 'http://localhost:5000/images/icon-200x200.png'
            ,  options: { language: "ESCPOS", dotDensity: 'double' , width:'20px', height:'20px'} },
            '\x1B' + '\x40',          // init
            receipt,
         // '\x1D' + '\x56'  + '\x31' // partial cut (new syntax)
            '\x10' + '\x14' + '\x01' + '\x00' + '\x05',  // Generate Pulse to kick-out cash drawer**
         ];
         
         qz.print(config, data).catch(function(e) { console.error(e); });

        clearOrderedProducts();
        console.log('Order created successfully');
        setSound(sound + 1);
      } else {
        console.log('Error creating some ordered items');
      }
    } catch (error) {
      console.error('|Error creating order:', error);
    }
  };

  useEffect(() => {
    if (sound !== 0) makeBeep();
  }, [sound]);
  const makeBeep = () => {
    new Audio(beep).play();
  };

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

  return (
    <PosLayout>
      <div className="flex flex-row-reverse flex-1">
        <div className="w-[400px] flex flex-col bg-gray-200">
          <div className="border-l-4 border-green-400 flex-1 ">
            <div
              style={{ maxWidth: `calc(${windowWidth}px - 50px)` }}
              className={'overflow-y-auto  pt-0 h-full w-full '}
            >
              <Orders
                orderedProducts={orderedProducts}
                removeProduct={removeProduct}
              />
            </div>
          </div>
          <div className="border-l-4 border-green-400 h-[180px]">
            <div className="grid grid-cols-3">
              <div
                onClick={() => handleOrderSubmit(employeeId)}
                className="col-span-2 text-center p-3 font-bold bg-green-600 text-white   rounded m-2 "
              >
                {totalPrice.toFixed(2)}
              </div>
              
              <div
                onClick={() => navigate('recipe')}
                className={
                  'col-span-1 rounded p-3 my-2 mr-3 text-center font-bold bg-yellow-800 text-white '
                }
              >
                {' '}
                Recipe
              </div>
             
              <div className='col-span-3 my-3 mx-3'>
              <PrinterConfig />
</div>
            </div>
 {employeeRole === 'manager'? (

                <div className='grid grid-cols-3 text-white font-bold text-center'>

                  <div className='col-span-2  mx-3 bg-red-400 p-3 rounded'> <OrderReference/> </div>
                  <div className='col-span-1 me-3 bg-blue-500 p-3 rounded'> <Wifi/></div>
                </div>
              ): (
                
                <div>
              

</div>
              )}
          </div>
        </div>

        <div className="flex flex-col w-full  gap-0 bg-gray-100 gap-2 ">
          <div
            style={{ maxHeight: `calc(${windowHeight}px - 249px)` }}
            className={'overflow-auto p-2 pt-0  '}
          >
            <Products
              productCategoryId={currentCategory.id}
              coffeeShopId={coffeeShopId}
              addProduct={addProduct}
            />
          </div>
          <div className="flex-1"></div>
          <div className="  h-[199px] bg-gray-300 border-t-4 border-green-400 overflow-x-auto">
            <div
              style={{ maxWidth: `calc(${windowWidth}px - 249px)` }}
              className={'overflow-auto p-2 pt-0  '}
            >
              <Categories
                coffeeShopId={coffeeShopId}
                setCurrentCategory={setCurrentCategory}
              />
            </div>
          </div>
        </div>
      </div>
    </PosLayout>
  );
}

export default Pos;
