import React, { useState, useEffect } from 'react';
import Products from '../components/Products';
import Categories from '../components/Categories';
import NavBar from '../components/NavBar';
import Orders from '../components/Orders';
import beep from '../assets/store-beep.mp3';
import usePOSStore from '../store/POSStore';
import { useNavigate } from 'react-router-dom';
import PrinterConfig from '../components/PrinterConfig';
import { getKitchenByProductId } from '../api/coffeeShopAPI';

const POS = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const {
    coffeeShopId,
    currentCategory,
    currentRecipe,
    setCurrentCategory,
    addProduct,
    orderedProducts,
    clearOrderedProducts,
    currentEmployee,
    kitchen,
    setKitchen,
  } = usePOSStore();

  const [sound, setSound] = useState(0);

  const handleOrderSubmit = async () => {
    const recipeId = currentRecipe.id;
    const employeeId = currentEmployee.id;

    try {
      // Create a new order in the database and retrieve its ID.
      const orderId = await createOrder(recipeId, employeeId);

      // Group the ordered items by kitchen.
      const productsByKitchen = {};
      try {
        for (const { id, qte } of orderedProducts) {
          const response = await getKitchenByProductId(id);
          const kitchen = response.data.kitchen;
          const kitchenId = kitchen.id;
      
          console.log(`Kitchen ID for product ${id}:`, kitchenId);
      
          if (!productsByKitchen[kitchenId]) {
            productsByKitchen[kitchenId] = [];
          }
          productsByKitchen[kitchenId].push({ id, qte });
        }
      } catch (error) {
        console.error('An error occurred while processing ordered products:', error);
      }
      

      // Create the ordered items in the database and print them for each kitchen.
      let allItemsCreated = true;
      for (const [kitchenId, products] of Object.entries(productsByKitchen)) {
        const printerName = await getPrinterNameByKitchenId(kitchenId);
        let printContent = `Kitchen: ${kitchenId}\nPrinter: ${printerName}\n\nItems:\n`;

        for (const { id, qte } of products) {
          
          const success = await createOrderedProduct(id, qte, orderId);
          if (!success) {
            allItemsCreated = false;
            break;
          }
          // Add the ordered item to the print content.
          printContent += `Item ${itemId}, Quantity ${quantity}\n`;
        }

        //Print the content using the printer name.
        //printJS({
         //printable: printContent,
          //type: 'raw-html',
          //targetStyles: ['*'],
          //documentTitle: `Kitchen ${kitchenId} Order`,
        //});
        console.log("+------------------------------------------------+")
        console.log("printing for ketchen with the id :: " , kitchenId);
        console.log("printing for ketchen with the name :: " , printerName);
        console.log(printContent)
        console.log("+------------------------------------------------+")
      }

      if (allItemsCreated) {
        // Clear the items from the Zustand store if all ordered items are created in the database.
        clearOrderedProducts();
        console.log('Order created successfully');
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

  const handleClick = () => {
    setSound(sound + 1);
    console.log('beep !');
  };
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-row-reverse flex-1">
        <div className="w-[400px] flex flex-col bg-gray-200">
          <div className="border-l-4 border-green-400 flex-1 ">
            <div
              style={{ maxWidth: `calc(${windowWidth}px - 50px)` }}
              className={
                'overflow-y-auto  pt-0 h-full w-full overflow-y-scroll'
              }
            >
              <Orders orderedProducts={orderedProducts} />
            </div>
          </div>
          <div className="border-l-4 border-green-400 h-[180px]">
            <div className="grid">
              <div
                onClick={handleClick}
                className="col-span-3 text-center p-3 font-bold bg-green-600 text-white   rounded m-2 "
              >
                {'120.00'}
              </div>
              <div
                className={
                  'col-span-2 rounded m-2 text-white font-bold p-3 text-center bg-blue-600'
                }
              >
                Printer Config
              </div>
              <div
                className={
                  'col-span-1 rounded p-3 m-2 text-center font-bold bg-yellow-800 text-white '
                }
              >
                {' '}
                Recipe
              </div>
              <div
                className={
                  'col-span-3 rounded p-3 m-2 text-center font-bold bg-gray-800 text-white '
                }
              >
                {' '}
                en cours preparation
              </div>
              <PrinterConfig />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full bg-white">
          <div
            style={{ maxHeight: `calc(${windowHeight}px - 249px)` }}
            className={'overflow-auto p-2 pt-0'}
          >
            <Products
              productCategoryId={currentCategory.id}
              coffeeShopId={coffeeShopId}
              addProduct={addProduct}
            />
          </div>
          <div className="h-[199px] bg-gray-300 border-t-4 border-green-400  ">
            <div
              style={{ maxWidth: `calc(${windowWidth}px - 49px)` }}
              className={
                'overflow-x-auto p-2 pt-0 h-full w-full overflow-x-scroll'
              }
            >
              <Categories
                coffeeShopId={coffeeShopId}
                setCurrentCategory={setCurrentCategory}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POS;
