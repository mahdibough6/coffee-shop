import React, { useEffect, useRef, useState } from 'react';
import { List, Button, message, Input } from 'antd';
import usePosStore from '@store/posStore';
import { getRecipeOrders, latestOngoingRecipe, getOngoingOrders, finishRecipe } from '@api/pos/recipes';
import { cancelOrder } from '@api/pos/orders';
import usePosAuthStore from '@store/posAuthStore';
import PosLayout from './PosLayout';
import socket from '@api/socket'
import { getOrderedProducts } from '@api/pos/orders';
import OrderedProductsTable from '../../common/OrderedProductsTable';
import NumPad from '../../common/NumPad';
import qz from 'qz-tray'
import { fetchRecipeSummary } from '../../../api/pos/orderedProducts';
import { getOngoingOrdersSummary } from '../../../api/pos/orders';

const tabs = [
  {
    name: 'live receipts',
    key:'live-receipts'
  },
  {
    name: 'my receipt',
    key:'my-receipt'
  }
]



function Recipe() {
  const { recipeId , setRecipeId, defaultPrinter} = usePosStore();
  const { coffeeShopId, employeeRole, employeeId } = usePosAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(0);
  const [orderedProducts, setOrderedProducts] = useState(null);

  const [searchValue, setSearchValue] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const [showNumPad, setShowNumPad] =useState(true)
  const [currentTab, setCurrentTab] =useState(tabs[0].key)

//const { setSelectedOrder, selectedOrder} = usePosStore();

  const [ setSelectedOrder, selectedOrder] = useState(null);
  useEffect(()=>{

    const confirmedOrders = orders?.filter(item => item.state === 'confirmed');

    const calculateTotalPrice = confirmedOrders.reduce((total, item) => {
      return total + item.totalPrice;
    }, 0);

    setTotalPrice(calculateTotalPrice)
  }, [isUpdated, orders])
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  useEffect(() => {

    socket.connect();

    socket.emit('setEmployeeRole' , employeeRole)
    socket.on('newOrder', () => {
      setIsUpdated((prev) => prev + 1);
      console.log(isUpdated);
      console.log('New order received from staff');
    });
    
    return () => {
        socket.disconnect();
    };
  }, []);
  useEffect(()=>{
    const getlatestOngoingRecipe= async()=>{
    try {
      const response = await latestOngoingRecipe(coffeeShopId, employeeId);
      setRecipeId(response.data.id)
      setIsUpdated((prev) => prev + 1);
    } catch (error) {
      console.error(error)
    }

    }
    getlatestOngoingRecipe()
  }, [])
    const fetchRecipeOrders = async (recipeId) => {
      try {
        const data = await getRecipeOrders(coffeeShopId, recipeId);
        setOrders(data);
        setLoading(false);
      } catch (error) {
        message.error('Error fetching orders');
      }
    }
      const fetchOngoingOrders = async() =>{
        try{
          const data = await getOngoingOrders(coffeeShopId);
          console.log('orders', data);

          setOrders(data.sort((a, b) => b.id - a.id));
          setLoading(false);
        }catch(err){
          message.error('Error fetching orders:', err);
        }
      }


  useEffect(() => {
    const confirmedOrders = orders?.filter(item => item.state === 'confirmed');

    const calculateTotalPrice = confirmedOrders.reduce((total, item) => {
      return total + item.totalPrice;
    }, 0);
    setTotalPrice(calculateTotalPrice)

    if(employeeRole === 'staff'){
      fetchRecipeOrders(recipeId);
    }
    else if (employeeRole === 'manager'){
      fetchOngoingOrders();
    }
    else{
      console.error('you\'re not allowed to see the content')
    }
  }, [isUpdated, recipeId]);

  


  const handleCancelOrder = async (orderId) => {

    try {
      await cancelOrder(coffeeShopId, orderId);
      setOrders(orders.map((order) => (order.id === orderId ? { ...order, state: 'canceled' } : order)));
      message.success('Order canceled');
 setIsUpdated((prev) => prev + 1);
    } catch (error) {
      message.error('Error canceling order');
    }
  };

  const handleOrderClick = (order) => {

    const fetchOrderDetails =async()=>{
      try {
        const data = await getOrderedProducts(order.id);
        setOrderedProducts(data)
      } catch (error) {

        message.error('connot get the order details please try again !')
        console.error(error)

      }
    }
    fetchOrderDetails()
  };

  const handleNumPad = (value)=>{

    setSearchValue(value)
  }
  const handleTerminateReceipt = async ()=>{
    try{
     await finishRecipe(coffeeShopId, recipeId, totalPrice)

    }catch(error){
      console.error(error)
    }
  }
  const [recipeSummary, setRecipeSummary] = useState(null)
  useEffect(()=>{
    const getRecipeOrderedProducts = async () =>{
      try{
      
      const response=await fetchRecipeSummary(coffeeShopId, recipeId)
      setRecipeSummary(response.data)
      if(response.success){
        console.log('here is the product summary !')
      }
      }catch(error){

        console.error(error);
      }

    }
    const ongoingOrdersSummary = async () =>{
      try{
      
      const response=await getOngoingOrdersSummary(coffeeShopId)
      setRecipeSummary(response.data)
      if(response.success){
        console.log('here is the product summary !')
      }
      }catch(error){

        console.error(error);
      }

    }
    if(currentTab === 'my-receipt')
    getRecipeOrderedProducts()
    else{
      ongoingOrdersSummary()
    }
  }, [currentTab])
  const handlePrint = ()=>{
    if(!defaultPrinter) message.error("set a default printer first")
    console.log("handle print")


    console.log(" recipe summary", recipeSummary)
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
     
    const products = recipeSummary.products;
    const recipeTotalPrice = recipeSummary.recipeTotalPrice
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
      const productInfo = `${product.name} x${product.qte}`;
      const priceInfo = `${product.totalPrice.toFixed(2)}`;
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
                                                     // **for legacy drawer cable CD-005A.  Research before using.
                                                     // see also http://keyhut.com/popopen4.htm
     ];
     
     qz.print(config, data).catch(function(e) { console.error(e); });

  }
  useEffect(()=>{
    if(currentTab === 'my-receipt')
      fetchRecipeOrders(recipeId);
      else{
        fetchOngoingOrders()
      }
  }, [currentTab])
  return (
    <PosLayout>
      <div className='bg-gray-100'>
        <div className="flex flex-row">
          <div className="flex-1 h-screen p-8 border-r-4 border-green-400">
            {loading && <p>Loading orders...</p>}

<div> 
</div>

              <div className='relative mb-4  rounded '>
<div className='my-2 flex '>
             {tabs.map((t, i)=>{
                return (
                  <div key={i} className='  bg-gray-200 p-1 rounded'>
                  <div className=' p-1 bg-blue-400 text-white rounded font-bold' 
                  onClick={()=>setCurrentTab(t.key)}
                  >{t.name}</div>
                  </div>
                )
              })}


</div>

                <div className='flex items-center gap-x-4'>

<div>


                <Input

                  className='p-2 border-green-400 border-2'
                  placeholder={searchValue ? searchValue : 'enter a reference'}
                  onChange={handleSearchChange}
                  onClick={()=>setShowNumPad(true)}
                  style={{ width: '100%' }}

                />
                </div>
                <div className='flex-1'></div>
                <div>Total : <span className='font-bold text-3xl'>{totalPrice.toFixed(2)}</span>  DHs</div>
                <div className='flex-1'></div>
                {recipeId && currentTab === 'my-receipt' &&
                <>
                <div 
                onClick={handleTerminateReceipt}
                className='bg-red-700 text-white font-bold p-2 rounded'>Terminate receipt

                </div>

</>
}
               <div 
               onClick={handlePrint}
               className='bg-blue-400 p-2 text-white rounded'>
                print
               </div> 
                
              </div>
</div>
           {/* {employeeRole === 'manager' ? (
            ) : 
            }*/}
            <div className='h-screen overflow-auto '>
              <List
                dataSource={orders.filter((order) => order.ref.toString().includes(searchValue))}
                renderItem={(item) => (
                  <List.Item
                    className={employeeRole === 'manager' ? (`bg-${item.state === 'confirmed' ? 'green-100' : 'red-100'} rounded-md mb-2 cursor-pointer`) : ('bg-gray-200 rounded-md mb-2 cursor-pointer')}
                    onClick={() => handleOrderClick(item)}
                  >
                    <div className="flex items-center ">
                      <div>
                      <span className={`text-lg font-bold text-green px-4 `}>#{item.ref}</span>
</div>
                    </div>

                    <div className='flex-1'></div>
                    <div className="text-lg text-white px-4">Status: {item.state}</div>
                    <div className='flex-1'></div>
                      {employeeRole === 'manager' && item.state !== 'canceled' && (
                        <Button className='mx-2' onClick={() => handleCancelOrder(item.id)} type="primary" danger>
                          Cancel
                        </Button>
                      )}
                  </List.Item>


                )}
              />
            </div>
          </div>
          <div className="w-[400px]">
            <div className=''>
            {selectedOrder ? (
              <OrderedProductsTable orderedProducts={orderedProducts} />
            ) : (
              <p>Select an order to view its details.</p>
            )}
</div>
<div className={`fixed bottom-0 right-0 w-[400px] ${showNumPad ? '' : 'hidden'}`}>
  <div className='text-center p-3  m-3 ' onClick={()=>setShowNumPad(false)}>
    <div className='bg-red-600 rounded inline text-white p-4'>close</div>
  </div>
  <NumPad
    value={searchValue}
    onChange={handleNumPad}
  />
</div>

          </div>
        </div>
      </div>
    </PosLayout>
  );
  
}

export default Recipe

