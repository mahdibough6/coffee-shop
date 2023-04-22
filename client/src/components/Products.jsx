import {useState, useEffect} from 'react';
import axiosInstance from '../utils/axioInstance';
import { useLocation } from 'react-router-dom';

const Product = ({product}) => {
  const [count, setCount] = useState(0);

  return (
    <div onClick={() => setCount(count + 1)}>
      {product.name} counts: {count}
    </div>
  );
};

const Products = ()=>{

    const location = useLocation();
    const catId = location.state.catId;
    const [products, setProducts] = useState([]);
 useEffect(() => {
        const fetchProducts = async () => {
          const jwtToken = localStorage.getItem('jwtToken')
          const response = await axiosInstance.get(`/api/products/category/${catId}`, {
            headers:{
              Authorization: `Bearer ${jwtToken}`
            }
          });
          setProducts(response.data);
        };
    
        fetchProducts();
      }, []);
      console.log("products")
    return(
        <div>
        {products.map((product)=>(
            <Product key={product.id} product={product} />
        ))}
       </div>
    );

}

export default Products;