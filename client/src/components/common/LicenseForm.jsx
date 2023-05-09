import { Form, Input, Button, message } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import usePosStore from '../../store/posStore';
import axios from 'axios';

const LicenseForm = () => {
  const [isLicensed, setIsLicensed] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);

  const {
    coffeeShopKey,
    setCoffeeShopKey,
    employees,
    setEmployees,
    fetchEmployees,
  } = usePosStore();

  const onFinish = useCallback(async () => {
    try {
      setIsVerifying(true);
      const response = await axios.post(`/license-key-verfication`, { coffeeShopKey });
      const { success, coffeeShopId } = response.data;
      if (success) {
        setCoffeeShopKey(coffeeShopKey);
        setEmployees(await fetchEmployees());
        setIsLicensed(true);
      } else {
        setIsLicensed(false);
        message.error('Invalid license key. Please try again.');
      }
    } catch (error) {
      console.error(error);
      message.error('Error verifying license key. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  }, [coffeeShopKey, setCoffeeShopKey, setEmployees, fetchEmployees]);

  useEffect(() => {
    const verifyCoffeeShopKey = async () => {
      try {
        if (coffeeShopKey) {
          setIsVerifying(true);
          const response = await axios.post(`/license-key-verfication`, { coffeeShopKey });
          const { success } = response.data;
          if (success) {
            setEmployees(await fetchEmployees());
            setIsLicensed(true);
          } else {
            setIsLicensed(false);
          }
        }
        setIsPending(false);
      } catch (error) {
        console.error(error);
        message.error('Error verifying license key. Please try again.');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyCoffeeShopKey();
  }, [coffeeShopKey, setEmployees, fetchEmployees]);

  if (isPending || isVerifying) {
    return <div>Loading...</div>;
  }

  if (isLicensed) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Form onFinish={onFinish} className="w-80">
        <Form.Item
          label="Enter the coffee shop key:"
          name="coffeeShopKey"
          rules={[{ required: true, message: 'Please enter the coffee shop key' }]}
        >
          <Input
            value={coffeeShopKey}
            onChange={(e) => setCoffeeShopKey(e.target.value)}
            className="rounded-full bg-gray-200 focus:bg-white border-0 focus:border-blue-500 focus:ring-0"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isVerifying}>
            Verify
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LicenseForm;
