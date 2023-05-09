
const NumPad = ({ value, onChange }) => {
  const handleNumberClick = (number) => {
    onChange(value + number);
  };

  const handleClear = () => {
    onChange('');
  };

  const handleRemove = () => {
    onChange(value.slice(0, -1));
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="grid grid-cols-3 gap-1 font-extrabold ">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <button key={number} onClick={() => handleNumberClick(number)} className="bg-green-400 p-4 text-white  align-middle">
            {number}
          </button>
        ))}
        <div onClick={handleClear} className="bg-red-400 p-4 text-white text-center align-middle">clear</div>
        <button onClick={() => handleNumberClick(0)} className="bg-green-400 p-4 text-white  align-middle">
          0
        </button>
        <button onClick={handleRemove} className="bg-red-400 p-4 text-white align-middle">remove</button>
      </div>
    </div>
  );
};

export default NumPad;
