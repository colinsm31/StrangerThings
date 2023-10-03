import { useState, useEffect } from 'react'
import './App.css'
import { getPosts, getToken, isLoggedIn } from './api'
import { Routes, Route } from 'react-router-dom'
import Posts from './components/Posts';
import Navbar from './components/Navbar';
import LogInPage from './components/LogInPage';
import Home from './components/Home';
import NewListing from './components/NewListing';
import Profile from './components/Profile';

function App() {
  const [login, setLogin] = useState(isLoggedIn());

  function isAuth(){
    return isLoggedIn();
  }
  
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home isLoggedIn={login}/>}/>
        <Route path='/login' element={<LogInPage setLogin={setLogin}/>}/>
        <Route path='/create' element={<NewListing />}/>
        <Route path='/posts' element={<Posts isAuth={isAuth}/>}/>
        <Route path='/profile' element={<Profile />}/>
      </Routes>
    </>
  )
}

export default App
