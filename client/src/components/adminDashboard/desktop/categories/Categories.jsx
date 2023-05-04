import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import { fetchCategories } from '@api/dashboard/categories';
import useClientStore from '@store/clientStore';

const { Meta } = Card;

const Categories = () => {
  const { coffeeShopId } = useClientStore();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCategories(coffeeShopId);
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [coffeeShopId]);

  return (
    <div className="site-card-wrapper">
      <Row gutter={[16, 16]}>
        {categories.map((category) => (
          <Col key={category.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={category.name} src={category.image} />}
            >
              <Meta title={category.name} description={category.description} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Categories;
