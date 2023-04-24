import react, { useeffect, usestate } from 'react';
import { navigate } from 'react-router-dom';
import axios from 'axios';

const singleemployee = ({ employee }) => {
  return (
    <div
      onclick={() => handleselect(employee.username)}
      classname=" bg-gray-400 rounded-md m-2 inline-block  p-3 cursor-pointer hover:bg-gray-300"
    >
      <span>{employee.username}</span>
    </div>
  );
};

const login = () => {
  const apiurl = import.meta.env.vite_api_url;
  const [username, setusername] = usestate('');
  const [usernames, setusernames] = usestate([]);
  const [password, setpassword] = usestate('');

  const [jwttoken, setjwttoken] = usestate(localstorage.getitem('jwttoken'));

  const [employee, setemployee] = usestate({
    id: null,
    first: null,
    tel: null,
    username: null,
    pwd: null,
    role: null,
  });

  const [listofemployees, setlistofemployees] = usestate([]);
  const [key, setkey] = usestate(localstorage.getitem('key')||null);

  useeffect(() => {
    const storedkey = localstorage.getitem('key');
    if (!storedkey) {
      const enteredkey = window.prompt('enter a key:');
      if (enteredkey) {
        localstorage.setitem('key', enteredkey);
        setkey(enteredkey);
      }
    } else {
      setkey(storedkey);
    }
  }, []);
  //const [coffeeshoptoken, setcoffeeshoptoken] = usestate('cabmed43b7nnyzdoryoq3r7ectmgfl315q14rrmdms0b6xhbo6dmxzmhwcxrjdeg')

  function updatetoken(newtoken) {
    // save the new jwt token to local storage
    localstorage.setitem('jwttoken', newtoken);
    // update the state with the new token
    setjwttoken(newtoken);
  }
  function savecoffeeshop(coffeeshopid) {
    // save the new jwt token to local storage
    localstorage.setitem('coffeeshopid', coffeeshopid);
    // update the state with the new token
  }
  const checkcredentials = async () => {
    try {
      const res = await axios.get(`${apiurl}login/`, {
        username,
        password,
       key 
      });
      const { token, employee: empdata , coffeeshopid: id} = res.data;

      if(token && empdata){
        updatetoken(token);
        setemployee(empdata);
        savecoffeeshop(id);
      }
        console.log('response :', res.data);
    } catch (err) {
      console.error('error getting the token!', err);
    }
  };
  const fetchusernames = async () => {
    try {
      const res = await axios.get(`${apiurl}usernames/`, {
       key
      });
      const { usernames: n} = res.data;

      if(n){
        setusernames(n);
        console.log(n)
      }
        console.log('response :', res.data);
    } catch (err) {
      console.error('error getting the usernames!', err);
    }
  };
    useeffect(() => {
    fetchusernames();
  }, []); 
  useeffect(() => {
    checkcredentials();
  }, [password]); 
/*
  useeffect(() => {
    async function fetchdata() {
      try {
        const apiurl = import.meta.env.vite_api_url;
        const res = await axios.get(`${apiurl}api/employees`, {
          token: 
        });
        console.log('response :', res.data);
        //setlistofemployees(res.data.employees);
      } catch (err) {
        console.error(err);
      }
    }
    fetchdata();
  }, []);*/
  const handleclear = () => {
    setpassword('');
  };

  const handleremove = () => {
    setpassword(password.slice(0, -1));
  };

  const handlenumberclick = (number) => {
    setpassword(password + number);
  };
  const handleselect = (username) => {
    setusername(username);
    console.log(username);
  };

  return (
    <div classname="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
      {jwttoken && <navigate to="../resto" state={{ employee }} replace />}
      <div classname="">
        {/* todo username need to be displayed here */}
        <div>
          {employees.map((employee, index) => (
            <singleemployee
              employee={employee}
              handleselect={handleselect}
              key={employee.id}
            />
          ))}
        </div>
        <div classname="w-full px-6 py-8 ">
          <input
            classname="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:shadow-outline"
            type="password"
            id="password"
            name="password"
            placeholder="enter your password"
            value={password}
            onchange={(e) => setpassword(e.target.value)}
          />
        </div>
      </div>

    </div>
  );
};

export default login;
