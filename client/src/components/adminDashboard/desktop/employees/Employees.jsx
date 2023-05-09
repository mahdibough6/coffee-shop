import React, { useState, useEffect } from 'react';
import { Card, Avatar, Row, Col, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import useClientStore from '@store/clientStore';
import { getEmployees } from '@api/dashboard/employees';
import axios from 'axios';

export const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).substr(-2);
  }

  return color;
};

const Employees = () => {
  const { coffeeShopId } = useClientStore();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const employeesData = await getEmployees(coffeeShopId);
      if (employeesData) {
        setEmployees(employeesData);
      }
    };

    fetchEmployees();
  }, [coffeeShopId]);

  return (
    <Row gutter={[16, 16]}>
      {employees.map((employee) => (
        <Col xs={24} sm={12} md={8} lg={6} key={employee.id}>
          <Card>
            <Card.Meta
              avatar={
                <Avatar
                  style={{ backgroundColor: stringToColor(employee.username) }}
                  icon={<UserOutlined />}
                />
              }
              title={employee.username}
              description={employee.role}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Employees;
