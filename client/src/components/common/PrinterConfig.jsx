import React, { useState, useEffect } from 'react';
import {Button, Modal, message} from 'antd';
import qz from 'qz-tray';
import usePosStore from '../../store/posStore';

const PrinterConfig = () => {
    const [visible, setVisible] = useState(false);
    const [printers, setPrinters] = useState([]);
    const {defaultPrinter, setDefaultPrinter} = usePosStore();
    const [cert, setCert] = useState(null)

    
    useEffect(() => {
        const listPrinters = () => {
            qz.printers.find()
                .then((printers) => {
                    setPrinters(printers);
                })
                .catch((error) => {
                    message.error('connot get the list of printers !')
                    console.log("Error getting printer list:", error);
                });
        };
       listPrinters() 

// Fetch the certificate and private key files using Axios

  // Set the certificate in QZ Tray

    }, []);
   const handleSelect = (printer) =>{
    setDefaultPrinter(printer)
    message.success(`the printer ${printer} is set to default !`)
   }

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };
  return (
    <div className='flex-1'>
    <div   className='flex-1 p-3 text-white bg-blue-400 rounded' onClick={showModal}>
       default printer 
    </div>
    <Modal
        title="Select the default printer"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
        okButtonProps={{className:`bg-green-500 `}}
        
    >
        <div className='h-[100px] overflow-auto bg-gray-200  h-[300px] '>
           {printers.map((p, i)=>(
            <div key={i} onClick={()=>handleSelect(p)} className='p-2 bg-white my-1  cursor-pointer hover:bg-blue-100'>{p}</div>
           ))} 
        </div>
    </Modal>
</div>
  );
};

export default PrinterConfig;