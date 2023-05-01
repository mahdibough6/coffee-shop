import { Form, Input, Button } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import usePOSStore from '../store/POSStore';
import { Outlet } from 'react-router-dom';

const LicenseProtection = () => {
  const [isLicensed, setIsLicensed] = useState(false);
  const {
    coffeeShopKey,
    setCoffeeShopKey,
    employees,
    setEmployees,
    fetchEmployees,
  } = usePOSStore();

  const onFinish = useCallback(async () => {
    try {
      const fetchedEmployees = await fetchEmployees();
      console.log(fetchedEmployees)
      if (fetchedEmployees) {
        setEmployees(fetchedEmployees);
        setIsLicensed(true);
      } else {
        setIsLicensed(false);
        console.log(employees+' Incorrect license. Please try again.');
      }
    } catch (error) {
      console.error(error);
    }
  }, [fetchEmployees, setEmployees, employees]);

  useEffect(() => {
    const verifyCoffeeShopKey = async () => {
      try {
        if (!isLicensed && coffeeShopKey) {
          const fetchedEmployees = await fetchEmployees();
          if (employees) {
            setIsLicensed(true);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    verifyCoffeeShopKey();
  }, [coffeeShopKey, setCoffeeShopKey, fetchEmployees, setEmployees, isLicensed]);

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
          <Button  className="bg-green-100 border-2 border-green-400 text-green-700 hover:bg-red-200" htmlType="submit" >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LicenseProtection;
