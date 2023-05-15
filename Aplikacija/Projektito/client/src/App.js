import {Route,Routes} from 'react-router-dom';
import Login from './Pages/Login.js';
import Layout from './Layout.js';
import Index from './Pages/Index.js';
import Register from './Pages/Register.js'
import RegisterKompanija from './Pages/RegisterKompanija.js'
import RegisterVozac from './Pages/RegisterVozac.js'
import axios from 'axios';
import { UserContextProvider } from './UserContext.js';
import {useState} from 'react'
axios.defaults.baseURL='http://localhost:5026';
axios.defaults.withCredentials= true;
function App() {
  const[userName,setUserName] = useState('');
  return (
    <div>
      <UserContextProvider
       userName={userName}
       setUserName={setUserName}
      >
      <Routes>
        <Route path='/' element={<Layout 
        userName={userName}
        />}>
          <Route index element={<Index />} />
          <Route path='/login' element={<Login
          userName = {userName}
          setUserName={setUserName}
          />}/>
          <Route path='/registration' element={<Register/>}>
          <Route path='/registration/regKompanija' element={<RegisterKompanija/>}/>
          <Route path='/registration/regVozac' element={<RegisterVozac/>}/>
          </Route>
        </Route>
      </Routes>
    </UserContextProvider>
    </div>
    
  );
}

export default App;
