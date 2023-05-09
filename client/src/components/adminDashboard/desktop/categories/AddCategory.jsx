import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { createCategory } from '@api/dashboard/categories';
import useClientStore from '@store/clientStore';
import { message } from 'antd';

const { Item } = Form;

const AddCategory = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);


  const {coffeeShopId} = useClientStore();

 
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  
  const onFinish = async (values) => {
    const formData = new FormData();
    if (values.image) {
      formData.append('image', values.image[0].originFileObj);
    }

    // Add the rest of the form data and submit your product
    formData.append('name', values.name);
    formData.append('coffeeShopId', coffeeShopId);

    try {

      // Send the product data to your API for processing
      const response =  await createCategory(formData);

      // Check if the product was added successfully
      console.log("response for creating a product :", response)
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

export default AddCategory;

