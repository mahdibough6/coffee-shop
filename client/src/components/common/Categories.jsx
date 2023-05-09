import { useState, useEffect } from 'react';
import { fetchCategories } from '../../api/pos';
import coffeeMug from '../../assets/coffee-mug.png'
const API_URL = import.meta.env.VITE_API_URL;
const Categories = ({ coffeeShopId , setCurrentCategory}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchCategories(coffeeShopId);
        setCategories(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, []);


  return (
<div className='flex flex-cols'>
<div className={'grid grid-rows-2 grid-flow-col gap-2 '} >
  {categories.map((category) => {
    if (category.isActive === true) {
      return (
        <div
          className="border-4 bg-green-200 border-brown-300  rounded-md mt-2 w-[190px]"
          onClick={() => setCurrentCategory(category)}
          key={category.id}
        >
          <div className="flex justify-between">
            <div className="relative p-2 font-bold">{category.name}</div>
            <div>
              <img
                     src={
                       import.meta.env.VITE_API_URL + 'uploads/' + category.image
                  }
                className="w-[75px] h-[75px] p-1"
                alt={category.image}
              />
            </div>
          </div>
        </div>
      );
    }
    return null;
  })}
</div>

    <div className='flex-1 '></div>
   </div>
  );
};

export default Categories;

