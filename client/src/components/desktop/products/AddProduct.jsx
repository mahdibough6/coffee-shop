import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import { useState } from 'react';

const { Item } = Form;

const AddProduct = () => {
  const [form] = Form.useForm();
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onFinish = (values) => {
    console.log('Form values:', values);
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
        <Item label="Kitchen" name="kitchen" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Item>
        <Item label="Category" name="category" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
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
