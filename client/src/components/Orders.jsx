import { summarizeProducts } from "../utils/helpers";

const Orders = ({ orderedProducts }) => {
  const summarizedProducts = summarizeProducts(orderedProducts);

  return (
    <div className="flex flex-col">
      <div className="bg-gray-200 py-2 px-4 flex border-b-4 border-green-400">
        <div className="font-bold text-gray-800 w-[40px] mr-2">Qte</div>
        <div className="font-bold text-gray-800">Produit</div>
          <div className="flex-1"></div>
        <div className="font-bold text-gray-800">Prix</div>
      </div>
      {summarizedProducts.map((product) => (
        <div className="bg-white py-2 px-4 flex border-b-4 " key={product.id}>
          <div className="text-gray-800 w-[40px] mr-2 ">x{product.quantity}</div>
          <div className="text-gray-800 ">{product.name}</div>
          <div className="flex-1"></div>
          <div className="text-gray-800 ">{product.price.toFixed(0)}</div>
        </div>
      ))}
    </div>
  );
};

export default Orders;


