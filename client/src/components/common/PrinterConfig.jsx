import React, { useState, useEffect } from 'react';
import qz from 'qz-tray';
import {Button, Modal} from 'antd';
import usePosStore from '../../store/posStore';

const PrinterConfig = () => {
    const [visible, setVisible] = useState(false);
    const [printers, setPrinters] = useState([]);
    const {currentPrinter, setCurrentPrinter} = usePosStore();
    const [cert, setCert] = useState(null)

    
    useEffect(() => {
        const listPrinters = () => {
            qz.printers.find()
                .then((printers) => {
                    setPrinters(printers);
                    console.log("Available printers:", printers);
                })
                .catch((error) => {
                    console.log("Error getting printer list:", error);
                });
        };
    
        qz.websocket.connect()
            .then(() => {
                listPrinters();
            });
    
        return () => qz.websocket.disconnect();
    }, []);
    

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
    <>
    <Button type="primary" onClick={showModal}>
        Open Modal
    </Button>
    <Modal
        title="Basic Modal"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
    >
        <p>select default printer</p>
        <div className='h-[100px] overflow-auto '>
           {printers.map((p, i)=>(
            <div key={i} onClick={()=>setCurrentPrinter(p)}>{p}</div>
           ))} 
        </div>
    </Modal>
</>
  );
};

export default PrinterConfig;