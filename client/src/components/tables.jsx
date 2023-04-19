import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/chair.png'
import axios from 'axios'


const tales = [
    {
        id:1,
        numOrders: 1,
        name: "salle 01"
    },
    {
        id:2,
        numOrders: 2,
        name: "salle 01"
    },
    {
        id:3,
        numOrders: 3,
        name: "salle 01"
    },
    {
        id:4,
        numOrders: 5,
        name: "salle 01"
    },
    {
        id:5,
        numOrders: 0,
        name: "salle 01"
    },
]

const TableItem = ({table}) =>{

    const [isActive, setIsActive] = useState(table.state);


    return (
      <Link href={''} key={table.id}>
    <div className={(isActive == 'empty' ? 'bg-gray-200' : 'bg-yellow-100')+' aspect-w-1 aspect-h-1 rounded-md p-2 border-2 border-gray-400'}>
        <div className='flex justify-center'> {table.numOrders} </div>
        <div><img src={img} alt=""  /></div>
        <div className='flex justify-center'>{table.name}</div>
    </div>
    </Link>
    )
}

const Tables = ()=>{

    const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      const response = await axios.get('http://localhost:3000/api/tables');
      setTables(response.data);
    };

    fetchTables();
  }, []);
    const handleActiveTable = ()=>{
        console.log("this item is selected !");
    }



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