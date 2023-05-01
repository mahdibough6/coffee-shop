import React, {useState} from 'react'
import AddCategory from './AddCategory'
import { Button } from 'antd';
function Categories() {
        const [visible, setVisible] = useState(false);
      
        const handleCancel = () => {
          setVisible(false);
        };
      
        const handleCreate = (category) => {
          console.log('Created category:', category);
          setVisible(false);
        };
  return (
    <div>
    <Button type="primary" onClick={() => setVisible(true)}>Create Category</Button>
    <AddCategory visible={visible} onCancel={handleCancel} onCreate={handleCreate} />
  </div>
  )
}

export default Categories 