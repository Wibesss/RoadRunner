import {Route,Routes} from 'react-router-dom';
import Login from './Pages/Login.js';
import Layout from './Layout.js';
import Index from './Pages/Index.js';
import Register from './Pages/Register.js'
import RegisterKompanija from './Pages/RegisterKompanija.js'
import RegisterVozac from './Pages/RegisterVozac.js'
import axios from 'axios';
axios.defaults.baseURL='http://localhost:5026';
axios.defaults.withCredentials= true;
function App() {
  return (
    <div>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Index />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/registration' element={<Register/>}>
        <Route path='/registration/regKompanija' element={<RegisterKompanija/>}/>
        <Route path='/registration/regVozac' element={<RegisterVozac/>}/>
        </Route>
      </Route>
    </Routes>
    </div>
    
  );
}

export default App;
