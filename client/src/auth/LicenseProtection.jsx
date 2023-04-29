import { Outlet, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import usePOSStore from '../store/POSStore';

const LicenseProtection = () => {
  const [isLicensed, setIsLicensed] = useState(false);
  const {
    coffeeShopKey,
    setCoffeeShopKey,
    employees,
    setEmployees,
    fetchEmployees,
  } = usePOSStore();


  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

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
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
      <label htmlFor="coffeeShopKey" className="font-bold mb-2">
        Enter the coffee shop key:
      </label>
      <input
        id="coffeeShopKey"
        type="text"
        value={coffeeShopKey}
        onChange={(e) => setCoffeeShopKey(e.target.value)}
        className={`border p-2 rounded-lg mb-4 ${
          coffeeShopKey && !isLicensed ? 'border-red-500' : 'border-gray-400'
        }`}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default LicenseProtection;
