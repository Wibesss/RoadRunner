import React from 'react'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import {Navigate} from 'react-router-dom'

const Login = () => {
  const [email,setEmail] = useState('');
  const[pass,setPass]= useState('');
  const[redirect,setRedirect] = useState(false)
  async function loginUser(e){
    e.preventDefault();
    try {
      const userInfo = await axios.post('http://localhost:5026/Login',{
        email:email,
        password: pass

      });
      alert('Login successful');

      setRedirect(true);
    }
    catch(e)
    {
      alert('Login failed')
    }
  }

  if(redirect)
  {
    return <Navigate to={'/'} />
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
        <div className="my-20">
            <h1 className="text-2xl text-center bold mb-4">Login:</h1>
            <form className="max-w-lg mx-auto" onSubmit={loginUser}>
                <input type="email" placeholder={'unesiEmail@gmail.com'}
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input type="password" placeholder="password"
                value={pass}
                onChange={(e)=>setPass(e.target.value)}
                />
                <button className={"bg-blue-300 text-white rounded-xl p-2 w-full"}>Login</button>
                <div className="text-center py-2">
                    <h5>Nemate nalog? <Link to={'/registration'}>Kreirajte nalog</Link></h5>
                </div>
            </form>
        </div> 
    </div>
  )
}

export default Login