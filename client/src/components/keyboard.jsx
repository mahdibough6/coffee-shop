
const Keyboard = ({ value, onChange }) => {
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
      <br />
      <div className="grid grid-cols-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <button key={number} onClick={() => handleNumberClick(number)} className="mb-number-btn">
            {number}
          </button>
        ))}
        <button onClick={handleClear}>clear</button>
        <button onClick={() => handleNumberClick(0)} className="mb-number-btn">
          0
        </button>
        <button onClick={handleRemove}>remove</button>
      </div>
      <div>{value}</div>
    </div>
  );
};

export default Keyboard;
