import React from 'react';
import { Table } from 'antd';

const OrderedProductsTable = ({ orderedProducts }) => {
  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
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
    <Table
      columns={columns}
      dataSource={orderedProducts}
      rowKey={(record) => record.name}
      pagination={false}
    />
  );
};

export default OrderedProductsTable;
