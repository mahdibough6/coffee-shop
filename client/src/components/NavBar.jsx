
import { Avatar } from "antd";
import { useState, useEffect } from "react";
import usePOSStore from '../store/POSStore'
import { Modal, Button } from 'antd';
import { useNavigate } from "react-router-dom";
const NavBar = () =>{
  const {clearSession, orderedProducts} = usePOSStore();
  const navigation = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleLogout = async () => {
    if (orderedProducts && Object.keys(orderedProducts).length > 0) {
      setShowModal(true);
    } else {
      clearSession();
      // Replace this with your actual navigation function.
      navigation('../employee-login')
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    clearSession();
    // Replace this with your actual navigation function.
    navigation('../employee-login')
  };
    const [date, setDate] = useState(new Date());

    useEffect(() => {
      const timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    }, []);
  
    const tick = () => setDate(new Date());
  
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Africa/Casablanca',
    };
  
    const dateFormatted = date.toLocaleDateString('en-US', options);
    const timeFormatted = date.toLocaleTimeString('en-US', {
      timeZone: 'Africa/Casablanca',
    });
    return( 
        <div className="flex items-center justify-between h-16 bg-white shadow border-b-4 border-green-800">
            <div className="flex items-center">
                <img src="/pub-maroc.ico" width="40px" alt="logo" className="ml-4" />
                <div className="border-l border-3 border-gray-400 ml-3 w-3 h-9"></div>
                <span className="text-gray-800 mr-4 text-sm font-bold">{dateFormatted} {timeFormatted}</span>
            </div>
            <div className="flex items-center">
            <Avatar

        size="large"
        gap={'0'}
      >
        {'user'}
      </Avatar>
                <div className="border-l border-3 border-gray-400 ml-3 w-3 h-9"></div>
                <div className="text-red-800 mr-3 bg-red-200 border-2 border-red-400 px-4 py-2 rounded text-sm font-bold " onClick={()=>handleLogout()}>Deconexion</div>
            </div>
            <Modal
        title="Confirm Logout"
        visible={showModal}
        onCancel={handleModalClose}
        footer={[
          <Button key="no" onClick={handleModalClose}>
            No
          </Button>,
          <Button key="yes" type="primary" onClick={handleModalConfirm}>
            Yes
          </Button>,
        ]}
      >
        <p>There are ordered products. Are you sure you want to validate the payment and logout?</p>
      </Modal>
        </div>
    );
}

export default NavBar;
