import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { fetchOrderedProducts } from '@api/dashboard/orders';

const OrderedProductsList = ({ orderId }) => {
  const [orderedProducts, setOrderedProducts] = useState([]);

  useEffect(() => {
    const fetchAndSetOrderedProducts = async () => {
      try {
        const data = await fetchOrderedProducts(orderId);
        setOrderedProducts(data);
      } catch (error) {
        console.error('Error fetching ordered products:', error);
      }
    };

    fetchAndSetOrderedProducts();
  }, [orderId]);

  const columns = [
    {
      title: 'Category',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Quantity',
      dataIndex: 'qte',
      key: 'qte',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
  ];

  return (
    <div>
      <h3>Ordered Products:</h3>
      <Table dataSource={orderedProducts} columns={columns} rowKey="categoryName" />
    </div>
  );
};

export default OrderedProductsList;
