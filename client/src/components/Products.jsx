import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/coffeeShopAPI';
import coffeeMug from '../assets/coffee-mug.png'
const Products = ({ coffeeShopId, productCategoryId, addProduct }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchProducts(coffeeShopId, productCategoryId);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, [coffeeShopId, productCategoryId]); // Added productCategoryId as a dependency

  console.log('Products:', products);

  return (
    <div className="h-screen grid mt-2 grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {products.map((p) => {
        if (p.state === 'active') {
          return (
            <div
onClick={() => addProduct(p)}
              className=" border-4 border-gray-200 bg-green-100 flex justify-between w-100 rounded-md h-[100px]"
              
              key={p.id}
            ><div className='p-2 flex flex-col justify-between'>
             <div className='font-bold text-gray-900'>{p.name}</div> 
            <div>{p.price}</div></div>
              <div className=' p-2 '>
              <img src={coffeeMug} className='w-[50px] h-[75px]'  alt=""  />
</div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Products;
