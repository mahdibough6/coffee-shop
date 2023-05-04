import React, { useEffect, useRef, useState } from 'react';
import { List, Button, message } from 'antd';
import usePosStore from '@store/posStore';
import { getRecipeOrders } from '@api/pos/recipes';
import { cancelOrder } from '@api/pos/orders';
import usePosAuthStore from '@store/posAuthStore';
import PosLayout from './PosLayout';
import {io} from 'socket.io-client'

const socketUrl = import.meta.env.VITE_API_URL

function Recipe() {
  const { recipeId } = usePosStore();
  const { coffeeShopId, employeeRole } = usePosAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  //const { setSelectedOrder, selectedOrder} = usePosStore();

  const [ setSelectedOrder, selectedOrder] = useState(null);
  const socket = useRef(null)
  useEffect(()=>{
    socket.current = io(socketUrl);
    socket.current.on('connect', ()=>{
      console.log('client connected')
    })
    socket.current.on('disconnect', ()=>{
      console.log('client disconnected')
    })
    return()=>{
      if(socket.current){
        console.log('sc disconnected')
        socket.current.disconnect();
      }
    }
    

  }, [])

  useEffect(() => {
    const fetchRecipeOrders = async (recipeId) => {
      try {
        const data = await getRecipeOrders(coffeeShopId, recipeId);
        console.log('orders: ', data);
        setOrders(data);
        setLoading(false);
      } catch (error) {
        message.error('Error fetching orders');
      }
    };
    fetchRecipeOrders(recipeId);
  }, [coffeeShopId, recipeId]);

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(coffeeShopId, orderId);
      setOrders(orders.map((order) => (order.id === orderId ? { ...order, state: 'canceled' } : order)));
      message.success('Order canceled');
    } catch (error) {
      message.error('Error canceling order');
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <PosLayout>
      <div>
        <div className="flex flex-row">
          <div className="flex-1 h-screen p-8 border-r-4 border-green-400">
            {loading && <p>Loading orders...</p>}
            <List
              dataSource={orders}
              renderItem={(item) => (
                <List.Item
                  className={`bg-${item.state === 'confirmed' ? 'green-100' : 'red-100'} rounded-md mb-2 cursor-pointer`}
                  onClick={() => handleOrderClick(item)}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-lg font-semibold text-green px-4`}>Order ID: {item.id}</span>
                    {employeeRole === 'manager' && item.state !== 'canceled' && (
                      <Button onClick={() => handleCancelOrder(item.id)} type="primary" danger>
                        Cancel
                      </Button>
                    )}
                  </div>
                  <div className="text-lg text-white px-4">Status: {item.state}</div>
                </List.Item>
              )}
            />
          </div>
          <div className="w-[400px]">
            <h2 className="text-xl font-bold mb-4">Order Details:</h2>
            {selectedOrder ? (
              <div>
                <p>
                  <strong>ID:</strong> {selectedOrder.id}
                </p>
                <p>
                  <strong>Status:</strong> {selectedOrder.state}
                </p>
                {/* Add more order details here */}
              </div>
            ) : (
              <p>Select an order to view its details.</p>
            )}
          </div>
        </div>
      </div>
    </PosLayout>
  );
}

export default Recipe

