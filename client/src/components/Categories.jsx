



  const Categories = ({ n }) => {
    const divs = [];
  
    for (let i = 0; i <= n; i++) {
      divs.push(
        <div className="test2 rounded-md  w-[150px]" key={i}>
          Category {i}
        </div>
      );
    }
  
    return <div className="grid grid-rows-2 h-full grid-flow-col gap-2">{divs}</div>;
  };

  export default Categories;