import {MinusOutlined} from '@ant-design/icons'
import { summarizeProducts } from '../../utils/helpers';

const Orders = ({ orderedProducts, removeProduct}) => {
  const summarizedProducts = summarizeProducts(orderedProducts);

  return (
    <div className="flex flex-col ">
      <div className="bg-gray-200 py-2 px-4 flex border-b-4 border-green-400">
        <div className="font-bold text-gray-800 w-[40px] mr-2">Qte</div>
        <div className="font-bold text-gray-800">Produit</div>
          <div className="flex-1"></div>
        <div className="font-bold text-gray-800">Prix</div>
        <div className="font-bold w-[40px] text-gray-800"></div>
      </div>
      {summarizedProducts.map((product) => (
        <div className="bg-white py-2 px-4 flex border-b-4 items-center " key={product.id}>
          <div className="text-gray-800 w-[40px] mr-2 ">x{product.qte}</div>
          <div className="text-gray-800 ">{product.name}</div>
          <div className="flex-1"></div>
          <div className="text-gray-800 ">{product.price.toFixed(2)}</div>
          <div
          onClick={() => removeProduct(product.id)} 
          className="text-gray-800 ml-2 px-1 bg-red-100 text-red-900 font-bold   rounded"><MinusOutlined /> </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;


