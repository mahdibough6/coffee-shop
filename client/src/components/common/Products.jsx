import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../../api/pos';
import { useInView } from 'react-intersection-observer';

const Products = ({ coffeeShopId, productCategoryId, addProduct }) => {
  const [products, setProducts] = useState([]);
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

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
  }, [coffeeShopId, productCategoryId]);

  return (
    <div className="h-full grid mt-2 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 bg-gray-100 ">
      {products.map((p) => {
        if (p.isActive === true) {
          return (
            <div
              onClick={() => addProduct(p)}
              className="border-4 border-green-400 bg-green-100 flex justify-between w-100 rounded-md h-[100px]"
              key={p.id}
            >
              <div className="p-2 flex flex-col justify-between">
                <div className="font-bold text-gray-900">{p.name}</div>
                <div className="text-4xl font-bold text-gray-900">
                  {p.price.toFixed(2)}
                </div>
              </div>
              <div className="p-2">
                <img
                  ref={ref}
                  src={
                    inView
                      ? import.meta.env.VITE_API_URL + 'uploads/' + p.image
                      : ''
                  }
                  className="w-[75px] h-[75px]"
                  alt={p.image}
                />
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
