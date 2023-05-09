import React, { useState , useRef, useEffect} from 'react';
import { Button, Modal, message } from 'antd';
import 'react-simple-keyboard/build/css/index.css';
import Keyboard from 'react-simple-keyboard';
import { changeKeyValue } from '../../api/pos/configs';
import usePosAuthStore from '../../store/posAuthStore';

function Wifi() {
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState('');
  const [shiftToggle, setShiftToggle] = useState(false);
  const [capsToggle, setCapsToggle] = useState(false);
  const keyboardRef = useRef(); // Add this ref
  const {coffeeShopId} = usePosAuthStore()

  const handleClickOutside = (event) => {
    if (keyboardRef.current && !keyboardRef.current.contains(event.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    if (visible) {
      window.addEventListener('mousedown', handleClickOutside);
    } else {
      window.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible]);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onChange = (value) => {
    setInput(value);
  };

  const onKeyPress = (button) => {
    if (button === '{shift}') {
      setShiftToggle(!shiftToggle);
    }
    if(button !== '{shift}' && shiftToggle === true) 
      setShiftToggle(!shiftToggle);
    if(button === '{lock}')
    setCapsToggle(!capsToggle)

    if(button === '{enter}'){
      const changeWifiPassword = async()=>{
        try {
          
        const response = await changeKeyValue(coffeeShopId, 'wifi', input)
        console.log(response)
        } catch (error) {
          console.log(error)
        }
        
      }
      changeWifiPassword();
    setVisible(!visible)
    }
    if(button === '{bksp}')
    setInput(input.slice(0, -1))
    console.log('Button pressed:', button);

    console.log(input);
  };

  const getKeyboardLayout = () => {
    if (shiftToggle || capsToggle) {
      return {
        default: [
          '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
          '{tab} Q W E R T Y U I O P { } |',
          '{lock} A S D F G H J K L : " {enter}',
          '{shift} Z X C V B N M < > ? {shift}',
          '{space}',
        ],
      };
    } else {
      return {
        default: [
          '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
          '{tab} q w e r t y u i o p [ ] \\',
          '{lock} a s d f g h j k l ; \' {enter}',
          '{shift} z x c v b n m , . / {shift}',
          '{space}',
        ],
      };
    }
  };
  const handlePasswordChange = (event) => {
    const inputValue = event.target.value;
    setInput(inputValue);
  };
  return (
    <div ref={keyboardRef}>
      <div onClick={showModal}>Wifi </div>

        {visible && (
            <>
      <div 
      className="absolute bottom-[400px] right-[40%] border border-green-400 border-4 w-[300px] z-20 h-[50px] flex item-center rounded">
        <input 
        onChange={handlePasswordChange}
        value={input} 
        className='p-2 w-100  text-black' type="text" placeholder={input ? input :  'enter wifi password'} />
      </div>
      <div className="fixed bottom-0 right-0 left-0 z-20 text-black ">
          <Keyboard
            layout={getKeyboardLayout()}
            onChange={onChange}
            onKeyPress={onKeyPress}
          />

      </div>
</>
        )}

      </div>
  );
}

export default Wifi;
