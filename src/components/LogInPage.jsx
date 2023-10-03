import { useState,useEffect } from "react"
import { register } from "../api";
import { userLogin } from "../api";
import { useNavigate } from "react-router-dom";

const COHORT_NAME = '2209-FTB-ET-WEB-FT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function LogInPage({setLogin}){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  async function handleLogin(e){
    e.preventDefault();

    try{
      const result = await register(username, password);

      if(result.success && result.data.token){
        userLogin(result.data.token);
        setLogin(true);
        nav('/profile');
      }else{
        console.error();(result.error.message);
      }
    }catch(error){
      console.error(error);
    }
  }

  return(
    <>
      <h1 className="header">Login Page</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username: 
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password: 
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  )
}