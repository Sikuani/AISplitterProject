import { useState } from 'react';
import axios from 'axios';
import TextSplitter from '../TextSplitter/textSplitter';


const Signin = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      login();
  }

  const login = async () => {
    try {
      const response = await axios("/api/signin", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          username,
          password
        },
      });

      console.log(response.data);

      //! checking  token is not empty
        if (!response.data.token) {
          throw new Error("No token returned");
        }
        
        localStorage.setItem("token", response.data.token)
        setToken(response.data.token);
        setUsername("");
        setPassword("");

      
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response?.status === 401) { // error is optional
        setErrorMessage("Invalid username or password");
      }
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    setToken("")
  }

  return (
    <div>
      {token ? (
        <TextSplitter token={token} logout={logout}/>
      ) : (
      <form method="POST" className='flex flex-col m-4 p-4 text-center' onSubmit={handleSumbit}>
        <label htmlFor='username'>Username</label>
        <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
        
        <label htmlFor='password'>Username</label>
        <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>

        {errorMessage && (
          <div className='bg-red-200 my-4 py-4 rounded-md'>
          <p className='text-red-600'>{errorMessage}</p>
        </div>
        )}
        

        <button type='submit' className='bg-blue-500  mx-auto py-2 px-6 mt-4 text-white rounded font-bold'>Login</button>
      </form>)}

    </div>
  )

}

export default Signin;