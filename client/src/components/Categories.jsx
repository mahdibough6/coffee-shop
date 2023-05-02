import { useState, useEffect } from 'react';
import { fetchCategories } from '../api/coffeeShopAPI';
import coffeeMug from '../assets/coffee-mug.png'

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
  }, [coffeeShopId]);

  return (
    <div className='grid grid-rows-2 h-full grid-flow-col gap-2 '>
      {categories.map((category) => {
        if (category.state === 'active') {
    
          return (
          <div 
          className="border-4 bg-green-200 border-brown-300 bg-white rounded-md  mt-2 w-[150px]" 
          onClick={()=>setCurrentCategory(category)} 
          key={category.id}
          >
            <div className='flex justify-between'>
            <div className='relative p-2 font-bold'>
            {category.name} 


</div>
            <div>
              <img src={''} className='w-[45px] h-[65px] p-1'  alt={category.image}  />
</div>
</div>
            </div>);


   
        }
        return null;
      })}
    </div>
  );
};

export default Categories;

