import React, { useState, useEffect } from 'react';
import {Button, Modal, message} from 'antd';
import NumPad from './NumPad';
import { createOrder } from '../../api/pos';
import usePosStore from '../../store/posStore';
import usePosAuthStore from '../../store/posAuthStore';
import posApi from '../../api/pos/posApi';
function OrderReference() {
    const [visible, setVisible] = useState(false);
    const {employeeId, coffeeShopId} =usePosAuthStore() 
    const {recipeId} =usePosStore() 
    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        const changeOrderReference = async(orderReference)=>{
            await posApi.post('orders/order-reference',
                {
                coffeeShopId,
                employeeId,
                ref: orderReference-1 ,
                isActive:false
                }
            )
        }
        changeOrderReference(orderReference)
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const [orderReference, setOrderReference] = useState('')
  const handleOrderReferenceChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    setOrderReference(numericValue);
  };


  return (
    <div>

<div  onClick={showModal}>order preference</div>

    <Modal
        title="Select the default printer"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
        okButtonProps={{className:`bg-green-500 `}}
        
    >



<div className="w-full px-6 py-8">
            <input
              className="text-3xl font-semibold w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:shadow-outline"
              id="password"
              name="password"
              placeholder="enter a new orderReference"
              value={orderReference}
              onChange={handleOrderReferenceChange}
            />
          </div>
          <NumPad value={orderReference} onChange={setOrderReference} />

    </Modal>    
    </div>
  )
}

export default OrderReference