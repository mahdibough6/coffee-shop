import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import { useEffect, useState } from 'react';
import {  fetchCategories } from '@api/dashboard/categories';
import { createProduct  } from '@api/dashboard/products';
import { fetchKitchens } from '@api/dashboard/kitchens';
import useClientStore from '@store/clientStore';
import { message } from 'antd';

const { Item } = Form;

const Categories = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [kitchens, setKitchens] = useState([]);


  const {coffeeShopId} = useClientStore();

  useEffect(() => {
    const fetchedKitchens = async () => {
      try {
        const response = await fetchKitchens(coffeeShopId);
        const c = response.data;
        setKitchens(c);
        console.log(c);
      } catch (error) {
        console.error('Error fetching kitchens:', error);
        message.error('Failed to fetch kitchens. Please try again later.');
      }
    };

    fetchedKitchens();
  }, []);
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  
  useEffect(() => {
    const fetchedCategories = async () => {
      try {
        const response = await fetchCategories(coffeeShopId);
        const c = response.data;
        setCategories(c);
        console.log(c);
      } catch (error) {
        console.error('Error fetching categories:', error);
        message.error('Failed to fetch categories. Please try again later.');
      }
    };

    fetchedCategories();
  }, []);

  const onFinish = async (values) => {
    const formData = new FormData();
    if (values.image) {
      formData.append('image', values.image[0].originFileObj);
    }

    // Add the rest of the form data and submit your product
    formData.append('name', values.name);
    formData.append('kitchenId', values.kitchenId);
    formData.append('productCategoryId', values.categoryId);
    formData.append('price', values.price);
    formData.append('coffeeShopId', coffeeShopId);

    try {

      // Send the product data to your API for processing
      const response =  await createProduct(formData);

      // Check if the product was added successfully
      console.log("respons for creating a product :", response)
        message.success('added to add product. Please try again later.');
      if (response.status !== 201) {
        console.error('Error adding product:', response.data.success);
        message.error('Failed to add product. Please try again later.');
      } else {
        console.log('Product added successfully:', response.data);
        // Optionally, you can clear the form here
        form.resetFields();
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
        <Item label="Category" name="categoryId" rules={[{ required: true }]}>
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
          <Upload listType="picture-card" maxCount={1}>
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

export default Categories;
