import React, { useState } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import axios from 'axios';
import  EmployeeRole  from '../../../../constants/EmployeeRole';
import {createAccount} from '@api/dashboard/accounts'
import useClientStore from '@store/clientStore'

const { Option } = Select;

const CreateEmployee = () => {
    const { coffeeShopId} = useClientStore();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try{
        const response = await createAccount(coffeeShopId, values);
        console.log(response)

      if (response.status === 201) {
        form.resetFields();
      } else {
        console.log("nothing")
      }
    }catch(err){
        console.log(err)
    }

  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Form.Item
        label="First Name"
        name="first"
        rules={[{ required: true, message: 'Please input the first name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="last"
        rules={[{ required: true, message: 'Please input the last name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Telephone"
        name="tel"
        rules={[{ required: true, message: 'Please input the telephone number' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { type: 'email', message: 'The input is not a valid email' },
          { required: true, message: 'Please input the email' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input the username' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="pwd"
        rules={[{ required: true, message: 'Please input the password' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Role"
        name="role"
        rules={[{ required: true, message: 'Please select a role' }]}
      >
        <Select>
          <Option value={EmployeeRole.MANAGER}>Manager</Option>
          <Option value={EmployeeRole.STAFF}>Staff</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Printer" name="printer">
        <Input />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit">
          Create Employee
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateEmployee;
