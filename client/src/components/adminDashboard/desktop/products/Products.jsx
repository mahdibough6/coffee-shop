import React, { useEffect, useState } from 'react';
import { Table, Layout } from 'antd';
import { fetchProductsWithPagination } from '@api/dashboard/products';
import useClientStore from '@store/clientStore';

const { Content } = Layout;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Category',
    dataIndex: 'category',
  },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const {coffeeShopId} = useClientStore();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchData = async (page, pageSize) => {
    try {
      const data = await fetchProductsWithPagination(page, pageSize, coffeeShopId);

      setProducts(data.products);
      setPagination((prev) => ({
        ...prev,
        total: data.count,
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, []);

  const handleTableChange = (pagination) => {
    fetchData(pagination.current, pagination.pageSize);
  };

  return (
    <Layout>
      <Content>
        <Table
          columns={columns}
          dataSource={products}
          pagination={pagination}
          onChange={handleTableChange}
          rowKey="id"
        />
      </Content>
    </Layout>
  );
};

export default Products;
