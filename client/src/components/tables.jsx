import {useState, useEffect, useContext} from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import img from '../assets/chair.png'
import api from '../utils/api';
import { EmployeeContext } from '../contexts/EmployeeContext';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../utils/helpers';


const TableItem = ({table}) =>{

    const [isActive, setIsActive] = useState(table.state);
    


    return (
      <Link to={{pathname:"tables/productcategories/", table }} key={table.id}>
    <div className={(isActive == 'empty' ? 'bg-gray-200' : 'bg-yellow-100')+' aspect-w-1 aspect-h-1 rounded-md p-2 border-2 border-gray-400'}>
        <div className='flex justify-center'> {table.numOrders} </div>
        <div><img src={img} alt=""  /></div>
        <div className='flex justify-center'>{table.name}</div>
    </div>
    </Link>
    )
}

const Tables = ()=>{

  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  

  useEffect(() => {
    const fetchTables = async () => {
      const jwtToken = localStorage.getItem('jwtToken')
      const response = await api.get('/api/tables', {
        onForbiden: ()=>{
          signOut();
          navigate('/login')
        }
      });
      setTables(response.data);
    };

    fetchTables();
  }, []);
    const handleActiveTable = ()=>{
        console.log("this item is selected !");
    }


    const employee = useContext(EmployeeContext)
    console.log(employee)

    return(
<div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 p-2 ">
{
    tables.map(table => ( 
        <TableItem key={table.id} table={table} onSelect={handleActiveTable} />
    ))
}
</div>


    );
}

export default Tables;