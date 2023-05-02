import React, { useState, useEffect } from 'react';
import Products from '../components/Products';
import Categories from '../components/Categories';
import NavBar from '../components/NavBar';
import Orders from '../components/Orders';
import beep from '../assets/store-beep.mp3';
import usePOSStore from '../store/POSStore';
import { useNavigate } from 'react-router-dom';
import PrinterConfig from '../components/PrinterConfig';
import { getKitchenByProductId, latestOngoingRecipe, createOrder, createOrderedProduct, getKitchenById } from '../api/coffeeShopAPI';
import { calculateTotalPrice, summarizeProducts } from '../utils/helpers';

const POS = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const {
    coffeeShopId,
    currentCategory,
    currentRecipe,
    setCurrentCategory,
    addProduct,
    setOrderedProducts,
    orderedProducts,
    clearOrderedProducts,
    currentEmployee,
    kitchen,
    removeProduct,
    setKitchen,
  } = usePOSStore();

  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice(orderedProducts))
  useEffect(()=>{
    setTotalPrice(calculateTotalPrice(orderedProducts))
  }, [orderedProducts])
  const [sound, setSound] = useState(0);

  const handleOrderSubmit = async () => {
    if (orderedProducts.length === 0) {
      console.error("No ordered products found.");
      // Handle the empty orderedProducts array case here, e.g., show an error message or disable the submit button
      return;
    }
    const employeeId = currentEmployee.id;

    try {
      //find or create an ongoing recipe  
      const response = await latestOngoingRecipe(coffeeShopId, employeeId)
      const recipeId = response.data.id;
      console.log('recipe id', recipeId)
      
      //calculate the total price of the current order 

      // Create a new order in the database and retrieve it.
      const order = await createOrder({employeeId, recipeId , totalPrice, isPaid:true});
      const orderId = order.id

      // Group the ordered items by kitchen.
      const productsByKitchen = {};
      try {
        for (const { id, qte, kitchenId } of summarizeProducts(orderedProducts) ) {
          console.log("qqqqqqqqqqqqqqqqqqqqqqqqqq",summarizeProducts(orderedProducts))
      
          console.log(`Kitchen ID for product ${id}:`, kitchenId);
      
          if (!productsByKitchen[kitchenId]) {
            productsByKitchen[kitchenId] = [];
          }
          productsByKitchen[kitchenId].push({ id, qte });
        }
      } catch (error) {
        console.error('An error occurred while processing ordered products: ', error);
      }
      

      // Create the ordered items in the database and print them for each kitchen.
      let allItemsCreated = true;
      for (const [kitchenId, products] of Object.entries(productsByKitchen)) {
        const response = await getKitchenById(kitchenId);
        console.log("fffff",response)
        const printerName = response.data.printer; 
        let printContent = `Kitchen: ${kitchenId}\nPrinter: ${printerName}\n\nItems:\n`;

          console.log("++++++++++product++++++++++",products)
        for (const { id, qte } of products) {

          

          const success = await createOrderedProduct({productId:id, qte, orderId});
          if (!success) {
            allItemsCreated = false;
            break;
          }
          // Add the ordered item to the print content.
          printContent += `Item ${id}, Quantity ${qte}\n`;
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
              <Orders orderedProducts={orderedProducts} removeProduct={removeProduct} />
            </div>
          </div>
          <div className="border-l-4 border-green-400 h-[180px]">
            <div className="grid">
              <div
                onClick={handleOrderSubmit}
                className="col-span-3 text-center p-3 font-bold bg-green-600 text-white   rounded m-2 "
              >
                {totalPrice.toFixed(2)}
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
