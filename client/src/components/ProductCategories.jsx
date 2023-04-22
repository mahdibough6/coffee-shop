import {useState, useEffect} from 'react';
import axiosInstance from '../utils/axioInstance';
import { Link } from 'react-router-dom';

const ProductCategory = ({category}) =>{
    return (
          <Link to={'../../products'} state={{catId:category.id}} >
        <div className={'bg-gray-200  aspect-w-1 aspect-h-1 rounded-md p-2 border-2 border-gray-400 flex-1 '}>
            <div><img src="" alt="" /></div>
            <div className='flex justify-center'><span>{category.name}</span></div>
        </div>
          </Link>
    );
}

const ProductCategories = ()=>{
    const [productCategories, setProductCategories] = useState([])
    useEffect(() => {
        const fetchCategories = async () => {
          const jwtToken = localStorage.getItem('jwtToken')
          const response = await axiosInstance.get('/api/productCategories', {
            headers:{
              Authorization: `Bearer ${jwtToken}`
            }
          });
          setProductCategories(response.data);
        };
    
        fetchCategories();
      }, []);

      console.log(productCategories)
    return(
        <div className='grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 p-2'>
        {
            productCategories.map((category)=>(
            <ProductCategory key={category.id} category={category}/>
            ))
        }
        </div>
    );

}

export default ProductCategories;