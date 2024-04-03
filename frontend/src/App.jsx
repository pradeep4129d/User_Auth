import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Route,Routes } from 'react-router-dom'
import SignUp from '../components/SignUp'
import "./App.css"
import Home from '../components/Home'
import {useLogin} from '../components/context'
import Profile from '../components/Profile'
import About from '../components/about'
import Contact from '../components/Contact'

const App = () => {
  const {login}=useLogin()
  return (
    <div>
        <Header/>
        <Routes>
          {!login && <Route path='/SignUp' element={<SignUp className='inapp' styles='' heading='Sign Up' description="Already have an account?Login" path='/SignIn'/> }/>}
          <Route path='/' element={<Home className='home'/>}/>
          {!login && <Route path='/SignIn' element={<SignUp className='inapplogin' styles='styles' heading='Login' description="Don't have any account?Signup" path='/SignUp'/>}/>}
          {login && <Route path='/profile' element={<Profile className='home'/>}/>}
          <Route path='/about' element={<About className='home'/>}/>
          <Route path='/contact' element={<Contact className='home'/>}/>
        </Routes>
    </div>
  )
}
export default App