import { useState } from 'react';

const Keyboard = () => {
  const [input, setInput] = useState('');

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleRemove = () => {
    setInput(input.slice(0, -1));
  };

  const handleNumberClick = (number) => {
    setInput(input + number);
  };

  return (
    <div>
      <input type="text" value={input} onChange={handleInput} />
      <br />
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleRemove}>Remove</button>
      <br />
      <div>
        <button onClick={() => handleNumberClick(1)}>1</button>
        <button onClick={() => handleNumberClick(2)}>2</button>
        <button onClick={() => handleNumberClick(3)}>3</button>
      </div>
      <div>
        <button onClick={() => handleNumberClick(4)}>4</button>
        <button onClick={() => handleNumberClick(5)}>5</button>
        <button onClick={() => handleNumberClick(6)}>6</button>
      </div>
      <div>
        <button onClick={() => handleNumberClick(7)}>7</button>
        <button onClick={() => handleNumberClick(8)}>8</button>
        <button onClick={() => handleNumberClick(9)}>9</button>
      </div>
      <div>
        <button onClick={() => handleNumberClick(0)}>0</button>
      </div>
    </div>
  );
};
