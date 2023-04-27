  


  const Products = ({ n }) => {
    const divs = [];
  
    for (let i = 1; i <= n; i++) {
      divs.push(
        <div className="test2 rounded-md h-[100px]" key={i}>
          Product {i}
        </div>
      );
    }
  
    return <div className="grid grid-cols-3 gap-2 ">{divs}</div>;
  };
  

export default Products;