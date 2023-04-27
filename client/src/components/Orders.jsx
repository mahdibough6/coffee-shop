
const Orders = ({ n }) => {
  const divs = [];

  for (let i = 1; i <= n; i++) {
    divs.push(
      <div className="test2 rounded-md h-[45px]" key={i}>
        Product {i}
      </div>
    );
  }

  return (<div className="flex flex-col gap-2 ">

      <div className="test2 rounded-md h-[45px]" key={0}> header</div>
    {divs}
    </div>);
};

export default Orders;