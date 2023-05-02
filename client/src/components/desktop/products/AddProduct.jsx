import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchCategories } from '../../../api/coffeeShopAPI';
import { fetchKitchens } from '../../../api/coffeeShopAPI';
import useClientStore from '../../../store/clientStore';
const { Item } = Form;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [kitchens, setKitchens] = useState([]);


  const {coffeeShopId} = useClientStore();

  useEffect(() => {
    const fetchedKitchens = async () => {
      const response = await fetchKitchens(coffeeShopId);
      const c =response.data;
      setKitchens(c);
              console.log(c)
    };

    fetchedKitchens();
  }, []);
  useEffect(() => {
    const fetchedCategories = async () => {
      const response = await fetchCategories(coffeeShopId);
      const c =response.data;
      setCategories(c);
              console.log(c)
    };

    fetchedCategories();
  }, []);
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    if (values.image) {
      formData.append('image', values.image[0].originFileObj);
    }

    // Add the rest of the form data and submit your product
    formData.append('name', values.name);
    formData.append('kitchen', values.kitchen);
    formData.append('category', values.category);
    formData.append('price', values.price);
    formData.append('coffeeShopId', cof);

    try {
      // Retrieve the JWT token from your authentication state
      const jwtToken = 'your_jwt_token_here';

      // Send the product data to your API for processing
      const response = await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${jwtToken}`,
        },
      });

      // Check if the product was added successfully
      if (response.status === 200) {
        console.log('Product added successfully:', response.data);
        // Optionally, you can clear the form here
        form.resetFields();
      } else {
        console.error('Error adding product:', response);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Item>
        <Item label="Kitchen" name="kitchenId" rules={[{ required: true }]}>
          <Select>
            {kitchens.map((k) => (
              <Select.Option key={k.id} value={k.id}>
                {k.id}
              </Select.Option>
            ))}
          </Select>
        </Item>
        <Item label="Category" name="category" rules={[{ required: true }]}>
          <Select>
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Item>
        <Item label="Price" name="price" rules={[{ required: true }]}>
          <InputNumber />
        </Item>
        <Item
          label="Upload Image"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true }]}
        >
          <Upload action="/upload.do" listType="picture-card" maxCount={1}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Item>
        <Item>
          <Button htmlType="submit">Submit</Button>
        </Item>
      </Form>
    </>
  );
};

export default AddProduct;
