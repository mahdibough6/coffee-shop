import { Form, Input, Button, message, Spin } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import keyIcon from '../../assets/key.png';
import usePosAuthStore from '../../store/posAuthStore';
import { Outlet } from 'react-router-dom';

const LicenseProtection = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const coffeeShopKey = localStorage.getItem('coffeeShopKey');
  
  const [isLicensed, setIsLicensed] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isValidKey, setIsValidKey] = useState(true);
  const { setCoffeeShopId } = usePosAuthStore();

  useEffect(() => {
    if (coffeeShopKey) {
      verfiyLicenseKey(coffeeShopKey);
    }
  }, [coffeeShopKey]);
  
  const verfiyLicenseKey = async (coffeeShopKey) => {
    try {
      setIsPending(true);
      const response = await axios.post(`${apiUrl}license-key-verfication`, {
        coffeeShopKey,
      });
      console.log('coffeeShopId', response.data.coffeeShopId)
      setCoffeeShopId(response.data.coffeeShopId);
      localStorage.setItem('coffeeShopKey', coffeeShopKey);
      setIsPending(false)
      setIsLicensed(true);
      setIsValidKey(true);
    } catch (error) {
      console.error('error verifying the license key : ', error);
      setIsPending(false)
      setIsValidKey(false);
    }
  };

  const onFinish = (values) => {
    const coffeeShopKey = values.coffeeShopKey;
    setIsPending(true)
    verfiyLicenseKey(coffeeShopKey);
  }

  const errorMessage = () => {
    message.error('Invalid license key');
    setIsPending(false)
  }

  return (
    <div className="h-screen flex-1 justify-center items-center">
      {isLicensed ? (
        <Outlet />
      ) : (
        <Form
          onFinish={onFinish}
          className="w-80 mx-auto flex justify-center flex-col mt-7"
        >
          <div className="font-bold text-center">Type the license Key </div>
          <br />
          <Form.Item
            name="coffeeShopKey"
            rules={[
              { required: true, message: `Please enter the license key ${keyIcon} ` },
            ]}
            validateStatus={!isValidKey ? "error" : ""}
            help={!isValidKey && "Invalid key"}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className="flex justify-center">
            <Button
              htmlType="submit"
              className={isPending ? 'bg-gray-400 text-white' : 'bg-green-400 text-white'}
              onClick={!isValidKey ? errorMessage : () => {}}
              disabled={isPending}
            >
              {isPending ? <Spin /> : ' Submit '}
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default LicenseProtection;



